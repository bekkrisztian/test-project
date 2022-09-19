const multer = require("multer");
const fs = require("fs");
const path = require("path");

const getFileType = (file) => {
    const mimeType = file.mimetype.split("/");
    return mimeType[mimeType.length - 1];
}

const generateFileName = (req, file, cb) => {
    const extension = getFileType(file);
    const fileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}.${extension}`;
    cb(null, `${file.fieldname}-${fileName}`);
}

const fileFilter = (req, file, cb) => {
    const extension = getFileType(file);
    const allowedTypes = /png|jpeg|jpg/;
    const passed = allowedTypes.test(extension);
    if (passed) return cb(null, true);
    return cb(null, false);
}

exports.userFile = ((req, res, next) => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            const { id } = req.user;
            const destination = `uploads/user/${id}`;

            fs.access(destination, (error) => {
                if (error) return fs.mkdir(destination, (error) => {cb(error, destination)});
                else {
                    fs.readdir(destination, (error, files) => {
                        if (error) throw error;
                        for (const file of files) {
                            fs.unlink(path.join(destination, file), (error) => {
                                if (error) throw error;
                            })
                        }
                    });

                    return cb(null, destination);
                }
            });
        },
        filename: generateFileName
    });

    return multer({storage, fileFilter}).single("avatar");
})();

exports.chatFile = ((req, res, next) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            const { id } = req.body;
            const dest = `uploads/chat/${id}`;

            fs.access(dest, (error) => {
                if (error) {
                    return fs.mkdir(dest, (error) => {
                        cb(error, dest);
                    })
                } else {
                    return cb(null, dest);
                }
            })
        },
        filename: generateFileName
    })

    return multer({ storage, fileFilter }).single("image");
})()