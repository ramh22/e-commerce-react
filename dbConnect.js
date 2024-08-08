
import mongoose from 'mongoose';//{ MongoClient } from "mongodb";

const uri ="mongodb+srv://react:AnN1u03OMoSESF2V@cluster0.dolsxar.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

export const dbConnect =()=>{
    mongoose.connect(
    uri//  { useNewUrlParser: true }//options
  )
  .then(()=>console.log('connected'))
  .catch(e=>console.log(e));}