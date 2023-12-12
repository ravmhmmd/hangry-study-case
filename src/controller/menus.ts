import express, { Request, Response } from "express";
const pool = require("../db");
const router = express.Router();

// Get All Menu
router.get("/", async (req: Request, res: Response) => {
	try {
		const menus = await pool.query("SELECT * FROM menus");

		if (menus.rows.length === 0) {
			return res.status(404).json({
				code: "404",
				message: "Menu list not found",
			});
		}

		res.status(200).json({
			code: "200",
			message: "Menu list retrieved successfully",
			result: {
				menus: menus.rows,
			},
		});
	} catch (error) {
		console.error("Error getting menu:", error);
		res.status(500).json({
			code: "500",
			message: "Internal server error",
		});
	}
});

// Create New Menu
router.post("/add-menu", async (req: Request, res: Response) => {
	try {
		const { name, image, description, availability } = req.body;

		if (name.length === 0) {
			return res.status(200).json({
				code: "400",
				message: "Menu name can't be empty",
			});
		}

		if (image.length === 0) {
			return res.status(200).json({
				code: "400",
				message: "Menu image can't be empty",
			});
		}

		if (description.length === 0) {
			return res.status(200).json({
				code: "400",
				message: "Menu description can't be empty",
			});
		}

		const newMenu = await pool.query(
			"INSERT INTO menus (name, image, description, availability) VALUES ($1, $2, $3, $4) RETURNING *",
			[name, image, description, availability]
		);

		res.status(201).json({
			code: "201",
			message: "New menu added successfully",
			result: {
				newMenu: newMenu.rows[0],
			},
		});
	} catch (error) {
		console.error("Error getting menu:", error);
		res.status(500).json({
			code: "500",
			message: "Internal server error",
		});
	}
});

// Get Menu Detail
router.get("/:id", async (req: Request, res: Response) => {
	try {
		const menuId = req.params.id;
		const menu = await pool.query("SELECT * FROM menus WHERE id = $1", [
			menuId,
		]);

		if (menu.rows.length === 0) {
			return res.status(404).json({
				code: "404",
				message: "Menu not found",
			});
		}

		res.status(200).json({
			code: "200",
			message: "Menu detail retrieved successfully",
			result: {
				menu: menu.rows[0],
			},
		});
	} catch (error) {
		console.error("Error getting menu:", error);
		res.status(500).json({
			code: "500",
			message: "Internal server error",
		});
	}
});

// Edit Menu Detail
router.post("/:id/edit", async (req: Request, res: Response) => {
	try {
		const { name, image, description, availability } = req.body;
		const menuId = req.params.id;

		if (name.length === 0) {
			return res.status(200).json({
				code: "400",
				message: "Menu name can't be empty",
			});
		}

		if (image.length === 0) {
			return res.status(200).json({
				code: "400",
				message: "Menu image can't be empty",
			});
		}

		if (description.length === 0) {
			return res.status(200).json({
				code: "400",
				message: "Menu description can't be empty",
			});
		}

		const updatedMenu = await pool.query(
			"UPDATE menus SET name = $1, image = $2, description = $3, availability = $4 WHERE id = $5 RETURNING *",
			[name, image, description, availability, menuId]
		);

		if (updatedMenu.rows.length === 0) {
			return res.status(404).json({
				code: "404",
				message: "Menu not found",
			});
		}

		res.status(200).json({
			code: "200",
			message: "Menu detail updated successfully",
			result: {
				menu: updatedMenu.rows[0],
			},
		});
	} catch (error) {
		console.error("Error getting menu:", error);
		res.status(500).json({
			code: "500",
			message: "Internal server error",
		});
	}
});

// Edit Menu Detail
router.post("/:id/delete", async (req: Request, res: Response) => {
	try {
		const menuId = req.params.id;

		const deletedPond = await pool.query(
			"DELETE FROM menus WHERE id = $1 RETURNING *",
			[menuId]
		);

		if (deletedPond.rows.length === 0) {
			return res.status(404).json({
				code: "404",
				message: "Menu not found",
			});
		}

		res.status(200).json({
			code: "200",
			message: "Menu deleted successfully",
		});
	} catch (error) {
		console.error("Error getting menu:", error);
		res.status(500).json({
			code: "500",
			message: "Internal server error",
		});
	}
});

module.exports = router;
