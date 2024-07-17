 // You'll need to install this package

import { Types } from "mongoose";
import UserService from "../../services/users";
import 'dotenv/config';

const queries = {

    getCurrentUser : async(parent:any, parameters : any, context:any) => {
        const user = await UserService.getCurrentUser(context.req);
        return user;
    },

    
} 

const mutations = {
    signUp: async (_: any, { input, profileImage }: any) => {
        try {
            const newUser = await UserService.createUser(input, profileImage);
            return newUser;
        } catch (error) {
            throw new Error(
                error instanceof Error ? error.message : 'An unknown error occurred'
            );
        }
        
    },

    login : async(parent:any, {loginDetails} : any, context : any) => {
        try{
            const MS_PER_DAY = 24 * 60 * 60 * 1000;
            // const isProduction = process.env.NODE_ENV === 'production';

            const loggedInUser = await UserService.loginService(loginDetails)

            if(context.res){
                context.res.cookie('accessToken', loggedInUser.accessToken, {
                    httpOnly: true,
                    maxAge: parseInt(process.env.ACCESS_TOKEN_EXPIRY || '1') * MS_PER_DAY
                });

                context.res.cookie('refreshToken', loggedInUser.refreshToken, {
                    httpOnly: true,
                    maxAge: parseInt(process.env.REFRESH_TOKEN_EXPIRY || '5') * MS_PER_DAY
                });
            }

            return loggedInUser
        } catch (error) {
            throw new Error(
                error instanceof Error ? error.message : 'An unknown error occurred'
            );
        }
    },


    logout : async(_ : any, parameters : any, {currentUser, res} : any) => {
        const LogoutResponse = await UserService.logoutService(currentUser?._id, res);
        return LogoutResponse;
    },

    addToFavourite : async(_ : any, {listingID} : {listingID : string | Types.ObjectId}, {currentUser} : any) => {
        if(currentUser){
            const updatedResponse = await UserService.addToFavouriteService(listingID, currentUser?._id);
            return updatedResponse
        }else{
            throw new Error('Not authorized');
        }
    },

    removeFavourite :  async(_ : any, {listingID} : {listingID : string | Types.ObjectId}, {currentUser} : any) => {
        if(currentUser){
            const updatedResponse = await UserService.removeFavouriteService(listingID, currentUser?._id);
            return updatedResponse
        }else{
            throw new Error('Not authorized');
        }
    },

    editProfile: async (_: any, { editUserProfileData }: any, { currentUser }: any) => {
        try {
            if (currentUser.id === editUserProfileData.id) {
                const updatedProfileData = await UserService.editUserDataService(editUserProfileData);
                return updatedProfileData;
            } else {
                throw new Error('You are not allowed to edit this profile');
            }
        } catch (error) {
            console.error('Error in editProfile resolver:', error);
            throw new Error('An error occurred while updating the profile');
        }
    }

}


export const resolvers = { queries, mutations };