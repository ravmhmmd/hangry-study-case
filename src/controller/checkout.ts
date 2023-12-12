import express, { Request, Response } from "express";
const pool = require("../db");
const router = express.Router();

// Checkout item in cart
router.get("/", async (req: Request, res: Response) => {
	try {
		const cart = await pool.query("SELECT * FROM cart");

		if (cart.rows.length === 0) {
			return res.status(404).json({
				code: "404",
				message: "Cart has no items",
			});
		}

		for (let i in cart.rows) {
			const item = await pool.query("SELECT * FROM menus WHERE id = $1", [
				cart.rows[i].menu_id,
			]);

			if (item.rows.length === 0) {
				return res.status(404).json({
					code: "404",
					message: `Item with id ${cart.rows[i].menu_id} not found`,
				});
			}

			if (item.rows[0].availability < cart.rows[i].qty) {
				return res.status(400).json({
					code: "400",
					message: `Item with id ${cart.rows[i].menu_id} exceeds available menu stock`,
				});
			}
		}

		for (let i in cart.rows) {
			await pool.query(
				"UPDATE menus SET availability = availability - $1 WHERE id = $2 RETURNING *",
				[cart.rows[i].qty, cart.rows[i].menu_id]
			);
		}

		await pool.query("DELETE FROM cart RETURNING *");

		res.status(200).json({
			code: "200",
			message: "Cart checkout successful",
		});
	} catch (error) {
		console.error("Error checkout cart:", error);
		return res.status(500).json({
			code: "500",
			message: "Internal server error",
		});
	}
});

module.exports = router;
