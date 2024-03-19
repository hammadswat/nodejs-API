import mongoose from "mongoose";

const {Schema} = mongoose;

const adsSchema = new Schema({
    title:{
        type : String,
        require:true,
    },

    description:{
        type : String,
        require:true,
    },
    
    amount:{
        type : Number,
        require:true,
    },

    imageUrl:{
        type : String,
        require: true
    }


});

const Ads = mongoose.model('ads' , adsSchema)

export default Ads