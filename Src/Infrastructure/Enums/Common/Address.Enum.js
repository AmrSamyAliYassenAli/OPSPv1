const {getNames, getCodes} = require('country-list');

class AddressEnums{

    static CountryNames = ()=>{
        return getNames();
    };

    static CountryCodes = ()=>{
        return getCodes();
    };

    static CityNames = ()=>{
        let names=[
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
        ];
        return names;
    };
}

module.exports=AddressEnums;