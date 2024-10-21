const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const regularCollectionSchema = new Schema({

    TypeofUser: {
        type: String,
        enum: ['HouseHoldUser', 'BusinessUser'],
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    PhoneNumber: {
        type: Number,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    ColletionOption: {
        type: String,
        enum: ['Daily', 'Weekly Once', 'Two Week Once', 'Monthly'],
   
        required: true
    },
    Amount: {
        type: Number,
        required: true
    }

});

module.exports = mongoose.model("regularCollection", regularCollectionSchema);

// {
//     "TypeofUser": "HouseHoldUser",
//     "Name":"Habeeb",
//     "PhoneNumber":"0771234567",
//     "Address":"warakapola",
//     "ColletionOption":"Daily",
//     "Amount":"1000"
//   }