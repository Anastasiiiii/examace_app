const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/examace")
.then(() => {
    console.log("mongodb connected");
})
.catch(() => {
    console.log("failed");
})


const newSchema =new mongoose.Schema({
    username: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    mark: [{
        mark: Number,
    }
    ]
})

const collection = mongoose.model("collection", newSchema)

module.exports=collection