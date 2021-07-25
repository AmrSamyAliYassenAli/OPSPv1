class PharmacyProductQueryParams{
    static GetInfoQueryParams= ()=>{
        let params =["price","quantity","prouduct_image","eachboxhas","unitperbox","expiration_date"];
        return params;
    };
}
module.exports=PharmacyProductQueryParams;