import {Router} from 'express'
import {validated} from '../middleware/validate.js'

import { createCategory, updateCategory, deleteCategory, getOneCategory, getAllCategory } from "../controllers/category.js";
const router = Router()

router.get("/:id", validated, getOneCategory)
router.get("/", validated, getAllCategory)
router.post("/", validated, createCategory)
router.put("/:id", validated, updateCategory)
router.delete("/:id", validated, deleteCategory)  

export default router
