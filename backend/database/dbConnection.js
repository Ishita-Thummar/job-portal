import mongoose from "mongoose";

export const dbConnection = ()=>{
    mongoose
     .connect(process.env.MONGO_URI,{
        dbName:"NAKA_the_center_of_workers",
    })
    .then(()=>{
        console.log('Connected to Database!');
    })
    .catch((err)=>{
        console.log(`error occured while connecting to Database: ${err}`);
    });
};