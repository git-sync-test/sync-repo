const {Schema,model}=require("mongoose");

//const nameUser=require("./user.model");

const gallerySchema=new Schema({

    user_id: {
        type: Schema.Types.ObjectId,
        ref: "user", // users
        required:true
      },    

    pictures:[
        {type:String, required:true}
    ],

},
{
    versionKey:false,
    timestamps:true,
}
);

module.exports=model("gallery",gallerySchema);

