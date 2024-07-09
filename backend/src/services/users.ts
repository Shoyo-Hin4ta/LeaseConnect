import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../models/user.model';
import uploadOnCDN from '../utils/cloudinary';

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

        console.log(`File saved as ${pathName}`);

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

}

export default UserService;
