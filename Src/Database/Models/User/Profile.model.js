import {Schema , model} from 'mongoose';

const ProfileSchema = new Schema({
    User_FK:{
        type:Schema.Types.ObjectId,
        ref:'Users'
    },
    avatar:{
        type:String,
        required:false
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


const Profile = model('Profiles',ProfileSchema);
export default Profile;