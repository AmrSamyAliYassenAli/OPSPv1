
class ProductEnums{

    static GetDosageForm = () => {
        let dosage_form = [
            "tablets", // أقراص
            "capsules",
            "iv/im/subcotanus", // حقن
            "syrup",    // شراب
            "suppostiries", // لبوس
            "effervescent",  // فوار
            "lozenges", // استحلاب
            "potches", // لرقات
            "ointments/gel/cream"   // جيل كريم مرهم
        ];
        return dosage_form;
    };
}

module.exports=ProductEnums;