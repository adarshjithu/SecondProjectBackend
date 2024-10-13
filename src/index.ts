


import dotenv from 'dotenv';
import { server } from './app'; // Import the server
import connectDB from './Config/db';

dotenv.config({ path: '../.env' });

connectDB();


server.listen(3000, () => {
    console.log('Server started on port 3000');
});
