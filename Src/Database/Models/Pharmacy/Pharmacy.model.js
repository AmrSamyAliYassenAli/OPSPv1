import { Schema,model } from "mongoose";

const PharmacySchema = new Schema({
    AddressID_FK:{
        ref:'Address',
        type:Schema.Types.ObjectId,
        require:true
    },
    pharmacy_name:{
        type:String,
        require:false
    },
    active:{
        type:Boolean,
        default:false
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

const Pharmacy = model('Pharmacy',PharmacySchema);
export default Pharmacy;