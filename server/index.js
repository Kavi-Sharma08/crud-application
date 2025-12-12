import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./Db.js"
import { Member } from "./models/Member.js"
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
    origin : "http://localhost:5173"
}))

app.post("/addTeamMember" , async (req, res)=>{
    const {name , email , phone , gender} = req.body;
    const newMember = await Member({
        name,
        email,
        phone,
        gender
    })
    const savedMember = await newMember.save();
    console.log(savedMember);
    return res.json({
        data : savedMember
    })
})
app.post("/getMember" , async (req, res)=>{
    const { id } = req.body;
    const data = await Member.find({_id : id});
    return res.json({
        data
    })
})
app.get("/getMembers" , async (req, res)=>{
    const data = await Member.find({});
    return res.send({
        data
    })
})
app.delete("/deleteMember", async(req , res)=>{
    const { email } = req.body;
    console.log(email)
    const data = await Member.findOneAndDelete({email});
    return res.json({
        message : "Deleted",
        data 
    })
})
app.patch("/editMember", async (req, res) => {
    try {
        const { email, name, phone, gender } = req.body;
        console.log(email)
        if (!email) {
            return res.status(400).json({ 
                success: false, 
                message: "Email is required to identify the member" 
            });
        }
        const updatedMember = await Member.findOneAndUpdate(
            { email: email },
            { 
                name: name,
                phone: phone,
                gender: gender 
            },
            { 
                new: true,
            }
        );
        if (!updatedMember) {
            return res.status(404).json({ 
                success: false, 
                message: "Member not found" 
            });
        }

        res.status(200).json({ 
            success: true,
            data: updatedMember,
            message: "Member updated successfully" 
        });

    } catch (error) {
        console.error("Error updating member:", error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to update member",
            error: error.message 
        });
    }
});
app.get("/employeeCounts" , async (req , res)=>{
    const data = await Member.find({});
    const maleCount = data.filter((employee)=>employee.gender==="Male");
    const femaleCount = data.filter((employee)=>employee.gender==="Female");
    return res.json({
            maleCount,
            femaleCount
        }
    )
})
connectDB().then(()=>{
    app.listen(process.env.PORT , ()=>{
        console.log("Server is Listening")
    })
})

