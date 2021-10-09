import { Router } from "express";
import companyCategoryRoute from "./company_category.js";
import companyRoute from "./company.js"
const router = Router();

router.use("/category", companyCategoryRoute);
router.use("/company", companyRoute);



export default router;
