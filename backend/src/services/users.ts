import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../models/user.model';
import uploadOnCDN from '../utils/cloudinary';
import { isValidObjectId, Types } from 'mongoose';
import 'dotenv/config';
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";

interface LoginDetailType{
    email : string,
    password : string
}

interface DecodedToken{
    _id : Types.ObjectId,
    email : string
}

interface Address {
    city: string;
    state: string;
    country: string;
    zipcode: string;
}

interface UserProfile {
    id: Types.ObjectId | string;
    name: string;
    email: string;
    password: string;
    gender: 'male' | 'female' | 'others';
    phone: string;
    address: Address;
}

class UserService{

    public static async createUser(payload : any, profileImage: any) {
        try {

            const existingUser = await User.findOne({ email: payload.email });
            if (existingUser) {
                throw new Error('User with this email already exists');
            }


            // Handle profile image upload
            const imageUrl = await this.handleProfileImageUpload(profileImage);
            
            // Create new user object
            const newUser = new User({
                name: payload.name,
                email: payload.email,
                password: payload.password,
                age: payload.age,
                gender: payload.gender,
                phone: payload.phone,
                profileImage: imageUrl,
                address: payload.address
            });

            // User saved
            await newUser.save();

            const createdUser = await User.findById(newUser._id)
                .select("-password -accessToken");

            if (!createdUser) {
                throw new Error('Failed to retrieve created user');
            }

            return createdUser;

        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('User creation failed: ' + error);
        }
    }

    private static async createAccessAndRefreshToken(payload : string | Types.ObjectId){
        const user = await this.findUser(payload);

        if(!user){
            throw "No user found";
        }
        
        const accessToken = jwt.sign(
            {
                _id : user?._id,
                email : user?.email
            },
            process.env.ACCESS_TOKEN_SECRET!,
            {
                expiresIn : process.env.ACCESS_TOKEN_EXPIRY,
            }
        )

        const refreshToken = jwt.sign(
            {
                _id : user?._id,
            },
            process.env.REFRESH_TOKEN_SECRET!,
            {
                expiresIn : process.env.REFRESH_TOKEN_SECRET_EXPIRY,
            }
        )
        
        user.accessToken = accessToken;
        user.refreshToken = refreshToken;

        await user.save({validateBeforeSave : false})

        return {accessToken, refreshToken, user}
    }

    public static async loginService(payload : LoginDetailType){
        try {

            const {email, password} = payload;
            // Find user by email
            const user = await this.findUser(email);

            // If user doesn't exist, throw an error
            if (!user) {
                throw new Error('User not found');
            }
            const isPasswordValid =  await this.isPasswordCorrect(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid credentials');
            }
            
            const { user: updatedUser } = await this.createAccessAndRefreshToken(user._id);

            return updatedUser;

        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    public static async findUser(payload : string | Types.ObjectId){
        try {
            let user;
    
            if(isValidObjectId(payload)){
                user = await User.findById(payload);
            }else if(typeof payload === 'string' && payload.includes('@')){
                user = await User.findOne({email : payload});
            }else{
                throw new Error('Invalid payload: must be a valid ObjectId or email address');
            }

            if(user){
                return user
            }else {
                console.log('User not found');
                return null;
            }
        } catch (error) {
            console.error('Error finding user:', error);
            throw error;
        }
    }

    private static async handleProfileImageUpload(profileImage: any): Promise<string> {
        const { name, type, data } = profileImage;
        
        if (!type.startsWith('image/')) {
            throw new Error('Only image files are allowed');
        }

        const uniqueFilename = `${uuidv4()}${path.extname(name)}`;
        
        const publicDir = path.join(process.cwd(), 'public', 'images');
        
        if (!fs.existsSync(publicDir)){
            fs.mkdirSync(publicDir, { recursive: true });
        }
        
        const pathName = path.join(publicDir, uniqueFilename);
        
        const base64Data = data.split(',')[1];
        
        fs.writeFileSync(pathName, base64Data, 'base64');

        const cdnResponse = await this.uploadOnCDN(pathName);
        
        fs.unlinkSync(pathName);

        if (!cdnResponse || !cdnResponse.url) {
            throw new Error('Failed to upload image to CDN');
        }

        return cdnResponse.url;
    }

    private static async uploadOnCDN(localFile: string) {
        return await uploadOnCDN(localFile);
    }

    private static async isPasswordCorrect(enteredPassword : string, passwordInDB : string){
        return await bcrypt.compare(enteredPassword, passwordInDB);
    };

    public static decodeJWTToken(token: string): DecodedToken  {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
        return decodedToken as DecodedToken;
    }
    
    public static async getCurrentUser(req: any) {
        const accessToken = req.cookies?.accessToken;
        console.log('Received accessToken:', accessToken);
    
        if (!accessToken) {
            console.log('No access token found in cookies');
            return null;
        }
    
        try {
            const decodedToken = this.decodeJWTToken(accessToken);
            const user = await this.findUser(decodedToken._id);
            
            if (!user) {
                console.log("User not found. Login Again");
                return null;
            }
            
            console.log('User found:', user.id);
            return user;
        } catch (error) {
            console.error("Error getting current user:", error);
            return null;
        }
    }

    public static async logoutService(userID : Types.ObjectId, res : any){
        try {

            const user = await User.findByIdAndUpdate(
              userID,
              {
                $unset: { refreshToken: 1 } // This removes the refreshToken field
              },
              {
                new: true
              }
            );
      
            if (!user) {
              throw new Error('User not found');
            }
      
            const options = {
                httpOnly: false,
                secure: false,
                sameSite: 'none', 
                path: '/',
            };
      
            res.clearCookie('accessToken', options);
            res.clearCookie('refreshToken', options);
      
            return { message: 'User logged out successfully', success: true };
          } catch (error) {
            console.error('Logout error:', error);
            throw error;
          }
    }

    public static async addToFavouriteService(listingID: string | Types.ObjectId, currentUserID : string | Types.ObjectId){
        try {
            const updatedResponse = await User.findByIdAndUpdate(
                currentUserID,
                { $push: { favoriteListings: listingID } },
                { new: true }
            );
            return "Added To Favourites";
        } catch (error : any) {
            throw new Error(`Failed to add to favourites: ${error.message}`);
        }
    }

    public static async removeFavouriteService(listingID: string | Types.ObjectId, currentUserID : string | Types.ObjectId){
        try {
            const updatedResponse = await User.findByIdAndUpdate(
                currentUserID,
                { $pull: { favoriteListings: listingID } },
                { new: true }
            );
    
            return "Removed the listing from favourites";
        } catch (error : any) {
            throw new Error(`Failed to remove favourites: ${error.message}`);
        }
    }

    public static async editUserDataService(userData: UserProfile){
        const { id, address, password, ...updateData } = userData;

        if (!id) {
            throw new Error('User ID is required');
        }
    
        const user = await User.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
    
        Object.assign(user, updateData);
    
        user.address = {
            city: address.city ?? user?.address?.city,
            state: address.state ?? user?.address?.state,
            country: address.country ?? user?.address?.country,
            zipcode: address.zipcode ?? user?.address?.zipcode
        };
    
        if (password && password.trim() !== '') {
            user.password = password;
        }
    
        try {
            await user.save();
            return user;
        } catch (error) {
            console.error('Error in editUserDataService:', error);
            throw new Error('An error occurred while updating the user profile');
        }
    }


}

export default UserService;
