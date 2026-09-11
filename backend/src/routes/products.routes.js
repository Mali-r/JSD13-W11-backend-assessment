import { Router } from "express";
import { products } from "../localDB/product.js";

export const router = Router();

// Read products
router.get("/", (req, res, next) => {
  try {
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// Create product
router.post("/", (req, res, next) => {
  try {
    const { name, price, quantity } = req.body;
    if (!name || !price || !quantity) {
      return res
        .status(400)
        .json({ error: "Product name, price and quantity are required!" });
    }

    const highestId = products.reduce(
      (max, product) => Math.max(max, Number(product.id)),
      0, // นับ total id
    );

    const nextId = String(highestId + 1); // เอา id ทั้งหมด + id ใหม่

    const newProduct = {
      id: nextId,
      name: name,
      price: price,
      quantity: quantity,
    };

    products.push(newProduct);
    return res.status(201).json(newProduct);

  } catch (err) {
    next(err);
  }
});

// Update product
router.put("/:id", (req, res, next) => {
  try {
    const product = products.find((p) => p.id === req.params.id);
    if (!product) {
        return res.status(404).json({ error: "Product not found!" });
    }

    const { name, price, quantity } = req.body;
    if (!name || !price || !quantity) {
      return res
        .status(400)
        .json({ error: "Product name, price and quantity are required!" });
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    return res.status(200).json(product);

  } catch (err) {
    next(err);
  }
});

// Delete products
router.delete("/:id", (req, res, next) => {
  try {
    const index = products.findIndex((p) => p.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: "Product not found!"});
    }

    const deletedProduct = products.splice(index, 1);
    return res.status(200).json({
        message: "Product deleted successfully!",
        product:  deletedProduct[0]
    });

  } catch (err) {
    next(err);
  }
});
