import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const company_categorySchema = new Schema ({ 
    title: {
        type: String, 
        required: true,
    }, 
},{timestamps:true}); 

const company_category = model("company_category", company_categorySchema);

export default company_category
