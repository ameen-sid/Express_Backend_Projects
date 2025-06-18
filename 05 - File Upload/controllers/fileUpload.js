const File = require("../models/file");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req, res) => {
	try {
		// fetch file
		const file = req.files.file;
		// console.log("File aagayi");

		let path =
			__dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;

		file.mv(path, (error) => {
			console.log(error);
		});

		res.status(200).json({
			success: true,
			message: "Local File Uploaded Successfully",
		});
	} catch (error) {
		console.log(error);
	}
};

function isFileTypeSupported(type, supportedTypes) {
	return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
	const options = { folder };

	if (quality) {
		options[quality] = quality;
	}

	options.resource_type = "auto";
	return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req, res) => {
	try {
		// fetch data from req
		const { name, tag, email } = req.body;
		// console.log(name, tag, email);

		// receive file
		const file = req.files.imageFile;
		console.log(file);

		// validation
		const supportedTypes = ["jpg", "jpeg", "png"];
		const fileType = file.name.split(".")[1].toLowerCase();

		if (!isFileTypeSupported(fileType, supportedTypes)) {
			return res.status(400).json({
				success: false,
				message: "File format not supported",
			});
		}

		// file format supported
		const response = await uploadFileToCloudinary(file, "myLibrary");
		// console.log(response);

		// save entry into db
		const fileData = await File.create({
			name,
			tag,
			email,
			imageUrl: response.secure_url,
		});

		res.status(200).json({
			success: true,
			imageUrl: response.secure_url,
			data: fileData,
			message: "File Uploaded Successfully",
		});
	} catch (error) {
		console.error(error);
		return res.status(400).json({
			success: false,
			message: "Something went wrong",
		});
	}
};

exports.videoUpload = async (req, res) => {
	try {
		// fetch data from req
		const { name, tag, email } = req.body;

		// receive file
		const file = req.files.videoFile;

		// validation
		// TODO: add a upper limit for 5MB video
		const supportedTypes = ["mp4", "mov"];
		const fileType = file.name.split(".")[1].toLowerCase();

		if (!isFileTypeSupported(fileType, supportedTypes)) {
			return res.status(400).json({
				success: false,
				message: "File format not supported",
			});
		}

		// file format supported
		const response = await uploadFileToCloudinary(file, "myLibrary");

		// save entry into db
		const fileData = await File.create({
			name,
			tag,
			email,
			imageUrl: response.secure_url,
		});

		res.status(200).json({
			success: true,
			imageUrl: response.secure_url,
			data: fileData,
			message: "File Uploaded Successfully",
		});
	} catch (error) {
		console.error(error);
		return res.status(400).json({
			success: false,
			message: "Something went wrong",
		});
	}
};

exports.imageSizeReducer = async (req, res) => {
	try {
		// fetch data from req
		const { name, tag, email } = req.body;

		// receive file
		const file = req.files.imageFile;
		// console.log(file);

		// validation
		const supportedTypes = ["jpg", "jpeg", "png"];
		const fileType = file.name.split(".")[1].toLowerCase();

		if (!isFileTypeSupported(fileType, supportedTypes)) {
			return res.status(400).json({
				success: false,
				message: "File format not supported",
			});
		}

		// file format supported
		const response = await uploadFileToCloudinary(file, "myLibrary", 40);

		// save entry into db
		const fileData = await File.create({
			name,
			tag,
			email,
			imageUrl: response.secure_url,
		});

		res.status(200).json({
			success: true,
			imageUrl: response.secure_url,
			data: fileData,
			message: "File Uploaded Successfully",
		});
	} catch (error) {
		console.error(error);
		return res.status(400).json({
			success: false,
			message: "Something went wrong",
		});
	}
};
