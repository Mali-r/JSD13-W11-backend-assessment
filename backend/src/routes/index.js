import { Router } from "express"; 
import { router as productRoutes } from "./products.routes.js";

export const router = Router();

router.use("/products", productRoutes);