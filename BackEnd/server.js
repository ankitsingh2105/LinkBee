const express = require("express");
const cors = require("cors");
const path = require("path");
const loginRouter = require("./Routes/loginRoute");
const signupRouter = require("./Routes/signupRoute");
const userRoute = require("./Routes/userRoutes");
const connectToMongoDB = require("./connect");
const userModel = require("./models/userModel");

const cookieParser = require('cookie-parser');

// Image uploading setup
const Multer = require("multer");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: 'dhs2koq4i', 
    api_key: '352246637179152',
    api_secret: "qV_JdoxbrjMtQYeTEZWVYPdFqXU",
});

console.log("opo :: ", process.env.cloudinary_apiKey);

async function handleUpload(file) {
    const res = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
    });
    return res;
}

const PORT = process.env.PORT || 3000;

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

connectToMongoDB(process.env.MONGO_URL);
console.log(process.env.MONGO_URL, process.env.PORT);
// origin: "http://localhost:5173",

// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true 
// }));

app.use(cors({
    origin: ["https://linkbeemern.vercel.app", "https://linkbee.tech"],
    credentials: true
}));

const storage = Multer.memoryStorage();
const upload = Multer({ storage });

app.post("/upload", upload.single("avatar"), async (req, res) => {
    console.log(req.body);
    const {userID} = req.body;
    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await handleUpload(dataURI);
        await userModel.findOneAndUpdate({ userID }, {
            "imageUrl": cldRes.secure_url,
        });
        res.status(200).send("Image uploaded successfully");
    } catch (error) {
        console.log("opo :: ", process.env.cloudinary_apiKey);
        console.log(error);
        res.send({
            message: error.message,
        });
    }
}); 

app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/user", userRoute);

// Static file serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/", (req, response) => {
    response.send("Your backend is not live");
});

app.listen(PORT, () => {
    console.log("listening to the serve", PORT);
});
