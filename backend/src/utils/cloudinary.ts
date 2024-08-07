import {v2 as cloudinary} from 'cloudinary';
import fs from "fs" ;


cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRET
});

const uploadOnCDN = async (localFile:string) => {
    try {
        if(!localFile) return null

       const response = await cloudinary.uploader.upload(localFile, {
            resource_type: "auto"
        })

        return response
    } catch (error) {
        //removing the locally saved temp file as operation got failed.
        fs.unlinkSync(localFile)
        return null
    }
}

export default uploadOnCDN;