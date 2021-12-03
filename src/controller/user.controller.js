const express=require("express");

const User=require("../model/user.model");

const router = express.Router();

const upload = require("../middleware/allData");

const fs=require("fs");

//CREATE USER
router.post("/", upload.single("profile_pic"),async(req,res)=>{
    try{
        const user=await User.create({
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            profile_pic:req.file.path,
        });
        return res.status(201).json({user});
    }
    catch(e){
        return res.status(500).json({status:"failed",message:e.message});
    }   
})


//GET ALL USERS
router.get("/",async(req,res)=>{
    try{
        const users=await User.find().lean().exec();
        return res.status(201).json({users});
    }
    catch(e){
        return res.status(500).json({status:"failed",message:e.message});
    }   
})



//UPDATING A USER with PROFILE PIC UPDATION & OLD one DELETION TOO
router.patch("/:id", upload.single("profile_pic"),async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      await fs.unlink(`${user.profile_pic}`,(err)=>{
           if(err) throw err;
           console.log("Profile Pic deleted");
      });
  
      const newuser= await User.findByIdAndUpdate(req.params.id,{
          profile_pic:req.file.path
      })
      return res.send({newuser});
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });


//DELETING A USER
router.delete("/:id",async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      await fs.unlink(`${user.profile_pic}`,(err)=>{
           if(err) throw err;
           console.log("User deleted");
      });
  
      const newuser= await User.findByIdAndDelete(req.params.id)
      return res.send({newuser});
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });



module.exports=router;