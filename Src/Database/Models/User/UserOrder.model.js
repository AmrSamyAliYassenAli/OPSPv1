import { Schema,model } from "mongoose";

const UserOrderSchema = new Schema({
    UserID_FK:{
        ref:'Users',
        type:Schema.Types.ObjectId
    },
    PharmacyID_FK:{
        ref:'Pharmacy',
        type:Schema.Types.ObjectId
    },
    order_date:{
        type:Date,
        require:true
    },
    order_status:{
        type:String,
        require:true
    },
    order_total:{
        type:Number,
        require:true
    },
    shipping_date:{
        type:Date,
        require:true
    },
    prescription_code:{ // وصفة طبية: كام مرة في اليوم
        type:String,
        require:false
    }, 
    prescription_status:{
        type:String,
        require:false
    },
    submitted:{ // true when user order is approved from pharmciest
        type:Boolean,
        require:false,
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

const UserOrder = model('UserOrder',UserOrderSchema);
export default UserOrder;