import { Router } from "express";
import { products } from "../localDB/product.js";

export const router = Router();

// Read products
router.get("/", (req, res) => {
    try {
        res.json(products);
    } catch (err) {
        next(err);
    }
});

// Create product
router.post("/products", (req, res) => {
    try {
        
    } catch (err) {
        next(err);
    }
});

// Update product
router.put("/products/:id", (req, res) => {
    try {
        
    } catch (err) {
        next(err);
    }
});

// Delete products
router.delete("/products/:id", (req, res) => {
    try {
        
    } catch (err) {
        next(err);
    }
});

