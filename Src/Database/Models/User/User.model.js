import { Schema,model } from "mongoose";
import { compare, hash } from 'bcryptjs';
import { SALT , APP_SECRET } from '../../../Infrastructure/Constants';
import { sign } from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import { pick } from 'lodash';

const UserSchema = new Schema({
    PharmacyID_FK:{
        ref:'Pharmacy',
        type:Schema.Types.ObjectId,
        require:false
    },
    AddressID_FK:{
        ref:'Address',
        type:Schema.Types.ObjectId,
        require:true
    },
    name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    mobile_number:{ 
        type:String,
        required:true,
        length:11
    },
    telephone_number:{
        type:String,
        required:true,
        length:10
    },
    address:{
        type:String,
        required:true,
        min:5,
        max:150
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    verified:{
        type:Boolean,
        default:false
    },
    verificationCode:{
        type:String,
        required:false
    },
    token:{
        type:String,
        required:false
    },
    tokenExpiresIn:{
        type:Date,
        required:false
    },
    resetPasswordToken:{
        type:String,
        required:false
    },
    resetPasswordExpiresIn:{
        type:Date,
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

UserSchema.pre('save',async function(next){
    let user = this;
    if(!user.isModified("password")) return next();
    user.password = await hash(user.password,parseInt(SALT));
    next();
});

UserSchema.methods.comparePassword = async function(password){
    return await compare(password,this.password);
};

UserSchema.methods.generateJWT = async function(){
    let payload = {
        username:this.username,
        name:this.name,
        email:this.email,
        id:this._id
    };
    return await sign(payload,APP_SECRET,{expiresIn:'1 day'});
};

UserSchema.methods.generatePasswordReset = function(){
    this.resetPasswordExpiresIn = Date.now()+36000000;
    this.resetPasswordToken = randomBytes(20).toString("hex");
};

UserSchema.methods.getUserInfo = function(){
    return pick(this,["_id","username","email","name","last_name","mobile_number", "telephone_number", "address","verified"]);
};

const User = model('Users',UserSchema);

export default User;