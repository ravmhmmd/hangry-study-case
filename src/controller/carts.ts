import express, { Request, Response } from "express";
const pool = require("../db");
const router = express.Router();

// Get All Menu
router.get("/", async (req: Request, res: Response) => {
	try {
		const cart = await pool.query("SELECT * FROM cart");

		if (cart.rows.length === 0) {
			return res.status(404).json({
				code: "404",
				message: "Cart has no items",
			});
		}

		return res.status(200).json({
			code: "200",
			message: "Menu list retrieved successfully",
			result: {
				cart: cart.rows,
			},
		});
	} catch (error) {
		console.error("Error getting cart:", error);
		return res.status(500).json({
			code: "500",
			message: "Internal server error",
		});
	}
});

// Add item to cart
router.post("/add", async (req: Request, res: Response) => {
	try {
		const { menuId, qty } = req.body;

		// Check if menu_id is available
		const itemInMenu = await pool.query("SELECT * FROM menus WHERE id = $1", [
			menuId,
		]);

		if (itemInMenu.rows.length === 0) {
			return res.status(404).json({
				code: "404",
				message: "Menu not available",
			});
		}

		if (qty === 0) {
			return res.status(400).json({
				code: "400",
				message: "Minimum quantity is 1",
			});
		}

		if (itemInMenu.rows[0].availability < qty) {
			return res.status(400).json({
				code: "400",
				message: "Exceeds available menu stock",
			});
		}

		// Add item to cart
		const cartItem = await pool.query("SELECT * FROM cart WHERE menu_id = $1", [
			menuId,
		]);

		if (cartItem.rows.length === 0) {
			const newItem = await pool.query(
				"INSERT INTO cart (menu_id, qty) VALUES ($1, $2) RETURNING *",
				[menuId, qty]
			);

			return res.status(201).json({
				code: "201",
				message: "Item added to cart successfully",
				result: {
					newItem: newItem.rows[0],
				},
			});
		}

		if (cartItem.rows[0].qty + qty > itemInMenu.rows[0].availability) {
			return res.status(400).json({
				code: "400",
				message: "Exceeds available menu stock",
			});
		}

		const newQty = await pool.query(
			"UPDATE cart SET qty = qty + $1 where menu_id = $2 RETURNING *",
			[qty, menuId]
		);

		res.status(200).json({
			code: "200",
			message: "Card updated successfully",
			result: {
				newQty: newQty.rows,
			},
		});
	} catch (error) {
		console.error("Error adding item to cart:", error);
		res.status(500).json({
			code: "500",
			message: "Internal server error",
		});
	}
});

// Edit item in cart
router.post("/edit", async (req: Request, res: Response) => {
	try {
		const { menuId, qty } = req.body;

		const itemInCart = await pool.query(
			"SELECT * FROM cart WHERE menu_id = $1",
			[menuId]
		);

		if (itemInCart.rows.length === 0) {
			return res.status(404).json({
				code: "404",
				message: `Cart has no menu with id ${menuId}`,
			});
		}

		// Check if menu_id is available
		const itemInMenu = await pool.query("SELECT * FROM menus WHERE id = $1", [
			menuId,
		]);

		if (qty === 0) {
			return res.status(400).json({
				code: "400",
				message: "Minimum quantity is 1",
			});
		}

		if (itemInMenu.rows[0].availability < qty) {
			return res.status(400).json({
				code: "400",
				message: "Exceeds available menu stock",
			});
		}

		const newQty = await pool.query(
			"UPDATE cart SET qty = $1 where menu_id = $2 RETURNING *",
			[qty, menuId]
		);

		res.status(200).json({
			code: "200",
			message: "Cart updated successfully",
			result: {
				newQty: newQty.rows,
			},
		});
	} catch (error) {
		console.error("Error updating item to cart:", error);
		res.status(500).json({
			code: "500",
			message: "Internal server error",
		});
	}
});

// Remove item in cart
router.post("/remove", async (req: Request, res: Response) => {
	try {
		const { menuId } = req.body;

		const itemInCart = await pool.query(
			"SELECT * FROM cart WHERE menu_id = $1",
			[menuId]
		);

		if (itemInCart.rows.length === 0) {
			return res.status(404).json({
				code: "404",
				message: `Cart has no menu with id ${menuId}`,
			});
		}

		const deletedItem = await pool.query(
			"DELETE FROM cart WHERE menu_id = $1 RETURNING *",
			[menuId]
		);

		if (deletedItem.rows.length === 0) {
			return res.status(404).json({
				code: "404",
				message: `Cart has no menu with id ${menuId}`,
			});
		}

		res.status(200).json({
			code: "200",
			message: "Item removed from cart successfully",
		});
	} catch (error) {
		console.error("Error removing item from cart:", error);
		res.status(500).json({
			code: "500",
			message: "Internal server error",
		});
	}
});

// Remove all item in cart
router.post("/remove-all", async (req: Request, res: Response) => {
	try {
		const deletedItem = await pool.query("DELETE FROM cart RETURNING *");

		if (deletedItem.rows.length === 0) {
			return res.status(404).json({
				code: "404",
				message: "Cart already empty",
			});
		}

		res.status(200).json({
			code: "200",
			message: "All item removed from cart successfully",
		});
	} catch (error) {
		console.error("Error removing item from cart:", error);
		res.status(500).json({
			code: "500",
			message: "Internal server error",
		});
	}
});

module.exports = router;
