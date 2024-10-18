const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const specialorderSchema=new Schema({
    contactname:{
        type:String,
        required:true
    },
    typeofuser:{
        type:String,
        required:true
    },
    contactemail:{
        type: String,
        required: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address']
    },
    address:{
        type:String,
        required:true
    },
    listofitems:{
        type:String,
        required:true
    },
    prefereddate: {
        type: Date,
        required: true,
        default: Date.now
    },
    preferedtime: {
        type: String,
        required: true
    },
    totalweight:{
        type:Number,
        required:true
    },
    totalamount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model(
    "SpecialOrder",//file name
    specialorderSchema //function name
)
