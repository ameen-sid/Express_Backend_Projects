const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const fileSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true,
	},
	imageUrl: {
		type: String,
	},
	tags: {
		type: String,
	},
	email: {
		type: String,
	},
});

// Post Middleware
fileSchema.post("save", async (doc) => {
	try {
		// console.log(doc);

		// transporter
		// TODO: shift this to config folder
		let transporter = nodemailer.createTransport({
			host: process.env.MAIL_HOST,
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASS,
			},
		});

		// send mail
		let info = await transporter.sendMail({
			from: `Code Hell - by Ameen Sid`,
			to: doc.email,
			subject: "New File Uploaded in Cloudinary",
			html: `<h1> Hello ${doc.name} </h1> <p> File Uploaded Successfully </p> <p> View here : <a href="${doc.imageUrl}"> ${doc.imageUrl} </a> </p>`,
		});
		// console.log(info);
	} catch (error) {
		console.error(error);
	}
});

module.exports = mongoose.model("File", fileSchema);
