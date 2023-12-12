import express, { Request, Response } from "express";
var geoip = require("geoip-lite");
const router = express.Router();
import dotenv from "dotenv";
dotenv.config();

router.get("/", async (req: Request, res: Response) => {
	try {
		const ip = process.env.IP_ADDRESS || req.ip;
		var geo = geoip.lookup(ip);

		if (!geo) {
			return res.status(404).json({
				code: "400",
				message: "Location not found",
			});
		}

		const location = {
			name: geo.city,
			lat: geo.ll[0],
			long: geo.ll[1],
		};

		res.status(200).json({
			code: "200",
			message: "Location data retrieved successfully",
			result: {
				location: location,
			},
		});
	} catch (error) {
		console.error("Error getting location:", error);
		res.status(500).json({
			code: "500",
			message: "Internal server error",
		});
	}
});

module.exports = router;
