
// import dotenv from 'dotenv'
// import app from './app'
// import connectDB from './Config/db';

// dotenv.config()
  
// connectDB() 


// app.listen(3000,()=>{
//     console.log('server started') 
// }) 


import dotenv from 'dotenv';
import { server } from './app'; // Import the server
import connectDB from './Config/db';

dotenv.config();

connectDB();

server.listen(3000, () => {
    console.log('Server started on port 3000');
});
