"use strict";
// import dotenv from 'dotenv'
// import app from './app'
// import connectDB from './Config/db';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// dotenv.config()
// connectDB() 
// app.listen(3000,()=>{
//     console.log('server started') 
// }) 
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = require("./app"); // Import the server
const db_1 = __importDefault(require("./Config/db"));
dotenv_1.default.config();
(0, db_1.default)();
app_1.server.listen(3000, () => {
    console.log('Server started on port 3000');
});
