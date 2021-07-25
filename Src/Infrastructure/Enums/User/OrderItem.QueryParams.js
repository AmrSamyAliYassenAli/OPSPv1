class OrderItemQueryParams{
    static GetInfoQueryParams= ()=>{
        let params =["UserOrderID_FK","price","amount","eachboxhas",
        "medicine_code","medicine_name","include","submitted"];
        return params;
    };
}
module.exports=OrderItemQueryParams;