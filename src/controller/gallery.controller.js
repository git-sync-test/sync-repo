const express=require("express");

const Gallery=require("../model/gallery.model");

const router = express.Router();

const uploadAgn = require("../middleware/allData");

const fs=require("fs");

//uploadAgn.array("pictures", 5), :- Not Working, so have to give only 5 files as input 

//CREATING PROFILE & ADDING 5 FILES TO PROFILE
router.post("/multiple", uploadAgn.any("pictures"),async(req,res)=>{
    const filePaths=req.files.map((file)=> file.path);
    try{
        const gallery=await Gallery.create({
            pictures:filePaths,
            user_id:req.body.user_id,
        });
        return res.status(201).json({gallery});
    }
    catch(e){
        return res.status(500).json({status:"failed",message:e.message});
    }   
})


//GET ALL PROFILE
router.get("/",async(req,res)=>{
    try{
        const galleries=await Gallery.find().populate("user_id").lean().exec();
        return res.status(201).json({galleries});
    }
    catch(e){
        return res.status(500).json({status:"failed",message:e.message});
    }   
})



//DELETING A PROFILE
router.delete("/:id",async (req, res) => {
    try {
      const gallery = await Gallery.findById(req.params.id);
      for(var i=0;i<gallery.pictures.length;i++){
      await fs.unlink(`${gallery.pictures[i]}`,(err)=>{
           if(err) {
               console.log(err);
            }
           else{
           console.log("Profile deleted");
           }    
      });
    }
      const deletedgallery= await Gallery.findByIdAndDelete(req.params.id)
      return res.send({deletedgallery});
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });


module.exports=router;