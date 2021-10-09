import { withOutFalsy } from "../utils/helper.js";
import loadash from "lodash";
import fs from "fs";
import path from "path";
const { pickBy } = loadash;
import companySchema from "../models/company.js";

export const createCompany = async (req, res) => {
  try {
    const { category_id, title, description, status } = req.body;
    if (!title || !status) {
      res.json("Title and Status required");
    }

    //** upload image in public folder **//
    let image = req.files;
    if (image[0]) {
      image = image
        .map((f) => `${process.env.SITE}/${f.filename}`)[0]
        .split(" ")
        .join("_");
      let newCategory = new companySchema({
        category_id,
        title,
        image,
        description,
        status,
      });
      await newCategory.save();
      res.status(200).json(newCategory);
    }
    //** If image is not selected **//
    else {
      let newCategory = new companySchema({
        category_id,
        title,
        description,
        status,
      });
      await newCategory.save();
      res.status(200).json(newCategory);
    }
  } catch (e) {
    res.json("Something went wrong");
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { categoryId, title, description, status } = req.body;
    const { id } = req.params;

    //** delete previous image if any **//
    let company = await companySchema.findOne({ _id: id }, "image");
    let images = company.image;

    if (images !== undefined) {
      const fileName = path.join(
        "public/uploads" + images.replace(process.env.SITE, "")
      );
      fs.unlinkSync(fileName);
    }

    //** update image in public folder **//
    let image = req.files;
    if (image[0]) {
      image = image
        .map((f) => `${process.env.SITE}/${f.filename}`)[0]
        .split(" ")
        .join("_");

      let updateCompany = pickBy(
        { categoryId, title, image, description, status },
        withOutFalsy
      );
      updateCompany = await companySchema.findByIdAndUpdate(
        id,
        { $set: updateCompany },
        { new: true }
      );

      res.status(200).json(updateCompany);
    }
    //** if image is not selected **//
    else {
      let updateCompany = pickBy(
        { categoryId, title, description, status },
        withOutFalsy
      );
      updateCompany = await companySchema.findByIdAndUpdate(
        id,
        { $set: updateCompany },
        { new: true }
      );

      res.status(200).json(updateCompany);
    }
  } catch (e) {
    console.log(e);
    res.json("Something went wrong");
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;

    //** delete image in the public folder **//
    let company = await companySchema.findOne({ _id: id }, "image");

    let images = company.image;
    if (images !== undefined) {
      const fileName = path.join(
        "public/uploads" + images.replace(process.env.SITE, "")
      );
      fs.unlinkSync(fileName);
    }

    //** delete document in the database **//
    await companySchema.findByIdAndRemove(id);

    res.json("Company removed successfully.");
  } catch (e) {
    res.json("Something went wrong");
  }
};

export const getOneCompany = async (req, res) => {
  const { id } = req.params;
  let company = await companySchema
    .findOne({ _id: id })
    .populate("category_id");
  res.json(company);
};

export const getAllCompany = async (req, res) => {
  let { page } = req.query;
  let perPage = 10;
  let query = {};
  let allCompany = await companySchema
    .find({})
    .populate("category_id")
    .skip(perPage * page - perPage)
    .limit(perPage);
  const totalCount = await companySchema.countDocuments(query);

  return res.json({ allCompany, totalCount });
};
