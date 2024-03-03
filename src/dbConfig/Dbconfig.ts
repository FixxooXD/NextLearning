import mongoose from "mongoose";

export async function connect () {
   try {
    mongoose.connect(process.env.DATABASE_URL!);
    const connection = mongoose.connection;
    
    connection.on("connected", ()=>{
        console.log("Db Connected");
    })

    connection.on("error", (err)=>{
        console.log("Something went wrong" + err);
        process.exit();
    })

   } catch (error) {
      console.log("something went wrong")
      console.log(error);
      
   }
}