const express=require("express");

const Gallery=require("../model/gallery.model");

const router = express.Router();

const uploadAgn = require("../middleware/allData");

const fs=require("fs");

//uploadAgn.array("pictures", 5), :- Working, but have to provide only pictures as input:-> 

/* CORRECT INPUT
pictures : screenshot1
pictures : screenshot2
pictures : screenshot3
pictures : screenshot4
*/

/* WRONG INPUT
pictures[0] : screenshot1
pictures[1] : screenshot2
pictures[2] : screenshot3
pictures[3] : screenshot4
*/ // If inputted like this, the limiting files to 5 wont work

//CREATING PROFILE & ADDING 5 FILES TO PROFILE
router.post("/multiple", uploadAgn.array("pictures",5),async(req,res)=>{
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