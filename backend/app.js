import express from "express";
import dotenv from 'dotenv';

dotenv.config({path:"./config/config.env"});
import cors from "cors"; //to connect frontend with backend //middleware
import cookieParser from "cookie-parser";
import userRouter from './routes/userRouter.js';
import  applicationRouter  from './routes/applicationRouter.js';
import jobRouter from './routes/jobRouter.js';
import {dbConnection} from './database/dbConnection.js';
import { errorMiddleware } from "./middlewares/error.js";

const app = express();



app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","DELETE","PUT"],
    credentials:true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/application", applicationRouter);
app.use("/api/v1/job", jobRouter);

dbConnection();

//always use middleware at the end of file
app.use(errorMiddleware);
export default app;