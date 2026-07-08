import multer from "multer";
import fs from "fs/promises";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads");
    },

    filename: function (req, file, cb) {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png"
    ) {
        cb(null, true);
    } else {
        cb(new Error("Only JPG and PNG images are allowed"));
    }
};

const upload = multer({ 
    storage,
    fileFilter,
      limits: {
        fileSize: 5 * 1024 * 1024
    }
});

export default upload;