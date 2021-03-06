import {Schema , model} from 'mongoose';
const AddressEnums = require('../../../Infrastructure/Enums/Common/Address.Enum');

const AddressSchema = new Schema({
    country:{
        country_name:{
            type:String,
            require:true,
            enum:AddressEnums.CountryNames()
        },
        country_code:{
            type:String,
            require:true,
            enum:AddressEnums.CountryCodes()
        }
    },
    city:{
        city_name:{
            type:String,
            require:true,
            enum:AddressEnums.CityNames()
        },
        postal_code:{
            type:String,
            require:false
        }
    },
    district_name:{
        type:String,
        require:false,
        max:20,
        min:3
    },
    building_number:{
        type:String,
        require:false,
    },
    floor_number:{
        type:String,
        require:false,
    },
    apartment_number:{
        type:String,
        require:false,
    },
    address_details:{
        type:String,
        require:false,
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

const Address = model('Address',AddressSchema);
export default Address;