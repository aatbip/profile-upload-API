import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const companySchema = new Schema ({ 
    category_id: {
        type: String, 
        ref: "company_category"
    }, 
    title: {
        type: String, 
        required: true
    },
    image: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: Boolean,
        required: true, 
      },
},{timestamps:true}); 

const company = model("company_schema", companySchema);

export default company
