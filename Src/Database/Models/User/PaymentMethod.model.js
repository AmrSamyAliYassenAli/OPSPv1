import { Schema,model } from "mongoose";

const PaymentMethodSchema = new Schema({
    UserID_FK:{
        ref:'Users',
        type:Schema.Types.ObjectId
    },
    card_owner:{
        type:String,
        require:true
    },
    card_security_code:{
        type:Number,
        require:true
    },
    expiration_date:{
        expiration_month:{
            type:Date,
            require:true
        },
        expiration_year:{
            type:Date,
            require:true
        }
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

const PaymentMethod = model('PaymentMethod',PaymentMethodSchema);
export default PaymentMethod;