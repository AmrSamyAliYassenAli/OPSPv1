import { Schema,model } from "mongoose";

const OrderItemSchema = new Schema({
    UserOrderID_FK:{
        ref:'UserOrder',
        type:Schema.Types.ObjectId
    },
    price:{
        type:Number,
        require:true
    },
    amount:{    // One box
        type:Number,
        require:true
    },
    eachboxhas:{  // number of strip 0r anbol per box
        type:Number,
        require:false
    },
    medicine_code:{
        type:String,
        require:true
    },
    medicine_name:{
        type:String,
        require:true
    },
    include:{
        type:Boolean,
        require:false,
        default:false
    },
    submitted:{
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

const OrderItem = model('OrderItem',OrderItemSchema);
export default OrderItem;