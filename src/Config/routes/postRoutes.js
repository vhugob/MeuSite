import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost , uploadImagem, atulizarNovoPost } from "../controllers/postsControllers.js";
import cors from "cors";

const corsOptions = {
    oringin:"http://localhost:8000",
    optionsSuccessStatus: 200
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})

const routes = (app) => {

    app.use(express.json());

    app.use(cors(corsOptions));

    app.get("/posts", listarPosts);

    app.post("/posts", postarNovoPost);

    app.post("/upload", upload.single("imagem"), uploadImagem);

    app.put("/upload:id", atulizarNovoPost);
}

export default routes;