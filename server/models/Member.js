import mongoose from "mongoose";


const memberSchema = new mongoose.Schema({
    name : {type : String},
    email : {type : String},
    phone : {type : Number},
    gender : {type : String}
})

export const Member = mongoose.model("Member" , memberSchema);