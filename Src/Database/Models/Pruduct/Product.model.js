import { Schema,model } from "mongoose";

const ProductSchema = new Schema({
    category:{
        type:String,
        require:false,
       // enum:['',''] // will be implemented later
    },
    product_name:{
        type:String,
        require:false
    },
    dosage_form:{
        type:String,
        enum:[
            "tablets", // أقراص
            "capsules",
            "iv/im/subcotanus", // حقن
            "syrup",    // شراب
            "suppostiries", // لبوس
            "effervescent",  // فوار
            "lozenges", // استحلاب
            "potches", // لرقات
            "ointments/gel/cream"   // جيل كريم مرهم
        ]
    },
    product_code:{
        type:String,
        require:false
    },
    code:{
        type:String,
        require:false
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

const Product = model('Product',ProductSchema);
export default Product;