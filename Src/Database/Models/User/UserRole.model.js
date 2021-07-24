import { Schema,model } from "mongoose";

const UserRoleSchema = new Schema({
    UserID_FK:{
        ref:'Users',
        type:Schema.Types.ObjectId
    },
    RoleID_FK:{
        ref:'Role',
        type:Schema.Types.ObjectId
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

const UserRole = model('UserRole',UserRoleSchema);
export default UserRole;