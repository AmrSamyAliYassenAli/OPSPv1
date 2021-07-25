class UserOrderQueryParams{
    static GetInfoQueryParams= ()=>{
        let params =["UserID_FK","PharmacyID_FK","order_date","order_status",
        "order_total","shipping_date","prescription_code","prescription_status","submitted"];
        return params;
    };
}
module.exports=UserOrderQueryParams;