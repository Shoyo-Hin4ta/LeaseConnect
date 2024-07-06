import express from "express";
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import dotenv from "dotenv";
import connectDB from "./db";
import createGraphQLServer from "./graphql";


dotenv.config({path : './.env'});

const PORT = process.env.PORT!;
const MONGO_URI = process.env.MONGO_URI!


async function  init() {
    connectDB(MONGO_URI);

    const app = express();

    app.use(cors({
        origin: process.env.CORS_ORIGIN,
        credentials : true
    }));

    app.use(express.json());


    app.get('/', (req,res) => {
        res.json({message : "Server is up and running"});
    })



    app.use(
        '/graphql',
        expressMiddleware(await createGraphQLServer()),
    );


    app.listen(PORT, () => {
        console.log(`Server started at PORT ${PORT}`);
    });
}

init();