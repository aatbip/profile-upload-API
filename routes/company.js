import { Router } from "express";
import { validated } from "../middleware/validate.js";
import { uploader } from "../middleware/uploader.js";
import {
  createCompany,
  updateCompany,
  deleteCompany,
  getOneCompany,
  getAllCompany,
} from "../controllers/company.js";
const router = Router();

router.get("/:id", validated, getOneCompany);
router.get("/", validated, getAllCompany);
router.post("/", validated, uploader, createCompany);
router.put("/:id", validated, uploader, updateCompany);
router.delete("/:id", validated, deleteCompany);

export default router;
