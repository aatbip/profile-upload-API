import mongoose from 'mongoose';
    
export default async function dbConnection(){
    try {      
        await mongoose.connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
    console.log("Connected to the database.")
    } catch (error) {
        console.log(`***DB ERROR***`)
        console.log({error})
    }
}