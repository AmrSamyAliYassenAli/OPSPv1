import {Schema , model} from 'mongoose';
const {getNames, getCodes} = require('country-list');

const AddressSchema = new Schema({
    country:{
        country_name:{
            type:String,
            require:true,
            //enum:getNames()
        },
        country_code:{
            type:String,
            require:true,
            //enum:getCodes()
        }
    },
    city:{
        city_name:{
            type:String,
            require:true,
            enum:[
                "Abu Hammad",
                "Al Mahallah al Kubra",
                "Al Mansurah",
                "Al Marj",
                "Alexandria",
                "Almazah",
                "Ar Rawdah",
                "Assiut",
                "Az Zamalik",
                "Badr",
                "Banha",
                "Bani Suwayf",
                "cairo",
                "Damietta",
                "Faraskur",
                "Flaminj",
                "Giza",
                "Heliopolis",
                "Helwan",
                "Hurghada",
                "Ismailia",
                "Kafr ash Shaykh",
                "Luxor",
                "Madinat an Nasr",
                "Madinat as Sadis min Uktubar",
                "Minya",
                "Nasr",
                "New Cairo",
                "Port Said",
                "Rafah",
                "Ramsis",
                "Sadat",
                "Shirbin",
                "Shubra",
                "Sohag",
                "Suez",
                "Tanta",
                "Toukh",
                "Zagazig"
            ]
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