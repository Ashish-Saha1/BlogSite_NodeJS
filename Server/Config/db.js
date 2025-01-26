const mongoose = require('mongoose');

// below is for MongoDb atlas online
// const connectDB = async ()=>{
//     try {
        
//         mongoose.set('strictQuery', false);
//         const conn = await mongoose.connect(process.env.MONGODB_URI)
//         console.log(`Database connected: ${conn.connection.host}`);
        
//     } catch (error) {
        
//         console.log(error);
        
//     }
// }

const connectDB = async ()=>{
    await mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{console.log(`Database connected`)})
    .catch((err)=>console.log(`Database connection problem, ERROR ${err}`)
    )
}


module.exports = connectDB;