import { withOutFalsy } from "../utils/helper.js";
import loadash from "lodash";
const { pickBy } = loadash;
import company_categorySchema from "../models/company_category.js";

export const createCategory = async (req, res) => {
  const { title } = req.body;

  let newCategory = new company_categorySchema({ title });
  await newCategory.save();

  res.json(newCategory);
};

export const updateCategory = async (req, res) => {
  const { title } = req.body;
  const { id } = req.params;
  let updateCategory = pickBy({ title}, withOutFalsy);
  updateCategory = await company_categorySchema.findByIdAndUpdate(
    id,
    { $set: updateCategory },
    { new: true }
  );

  res.json(updateCategory);
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  await company_categorySchema.findByIdAndRemove(id);

  res.status(200).json("Category removed successfully.");
};

export const getOneCategory = async (req, res) => {
  const { id } = req.params;
  let category = await company_categorySchema.findOne({ _id: id });
  res.json(category);
};

export const getAllCategory = async (req, res) => {
  let { page } = req.query;
  let perPage = 10;
  let query = {};
  let allCategory = await company_categorySchema
    .find({})
    .skip(perPage * page - perPage)
    .limit(perPage);
  const totalCount = await company_categorySchema.countDocuments(query);

  return res.json({ allCategory, totalCount });
};
