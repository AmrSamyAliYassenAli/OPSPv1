import { Schema,model } from "mongoose";

const PharmacyProductSchema = new Schema({
    PharmacyID_FK:{
        ref:'Pharmacy',
        type:Schema.Types.ObjectId
    },
    ProductID_FK:{
        ref:'Product',
        type:Schema.Types.ObjectId
    },
    price:{
        type:Number,
        require:true
    },
    quantity:{  // number of boxs
        type:Number,
        require:true
    },
    prouduct_image:{
        type:String,
        require:false
    },
    eachboxhas:{  // number of strip 0r anbol per box
        type:Number,
        require:false
    },
    unitperbox:{ // number of tablets 0r anbols per box
        type:Number,
        require:false
    },
    expiration_date:{
        type:Date,
        require:true
    },
    isActive:{
        type:Boolean,
        require:false,
        default:false
    },
    isCreated:{
        type:Boolean,
        require:false,
        default:false
    },
    isUpdated:{
        type:Boolean,
        require:false,
        default:false
    },
    createdId:{
        type:String,
        require:false
    },
    updatedId:{
        type:String,
        require:false
    }
},{timestamps:true});

const PharmacyProduct = model('PharmacyProduct',PharmacyProductSchema);
export default PharmacyProduct;