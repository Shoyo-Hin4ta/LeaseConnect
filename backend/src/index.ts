import express from "express";
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import dotenv from "dotenv";
import connectDB from "./db";
import createGraphQLServer from "./graphql";
import cookieParser from 'cookie-parser';
import UserService from "./services/users";

dotenv.config({path : './.env'});

const PORT = process.env.PORT!;
const MONGO_URI = process.env.MONGO_URI!


async function  init() {
    try {
        await connectDB(MONGO_URI);

        const app = express();

        app.use(cors({
            origin: 'http://localhost:5173',
            credentials : true
        }));

        app.use(cookieParser());
        app.use(express.json({ limit: '20mb' }));
        app.use(express.urlencoded({ limit: '10mb', extended: true }));
        app.use(express.static("public"));


        app.get('/', (req,res) => {
            res.json({message : "Server is up and running"});
        })


        app.use(
            '/graphql',
            expressMiddleware(await createGraphQLServer(), {
                context: async({req, res}) => {

                    const currentUser = await UserService.getCurrentUser(req);

                    return {
                        req,
                        res,
                        currentUser
                    }
                }
            }),
        );


        app.listen(PORT, () => {
            console.log(`Server started at PORT ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start the server:", error);
        process.exit(1);
    }
}

init();