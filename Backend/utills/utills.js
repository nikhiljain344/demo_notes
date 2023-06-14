const multer = require("multer");
const path = require("path");
const fs = require('fs');

function createResult(error, data, message, code) {
    var result = {};
    if (!error) {
        result['status'] = true;
        result['message'] = message;
        result['data'] = data;
        result['code'] = code;
    } else {
        result['status'] = false;
        result['message'] = message;
        result['errors'] = error;
        result['code'] = code;
    }
    return result;
}
function generateOTP() {
    return (Math.random() + '123456789').substr(2, 4)
}
function imageDelele(imgPath) {
    try {
        imgPath = path.join(__dirname + '/../' + imgPath);
        fs.unlinkSync(imgPath);
    } catch (error) {
        createResult(error, null, null);
    }
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        try {
            cb(null, path.join(__dirname, '../public'));
        } catch (error) {
            cb(error);
        }
    },
    filename: function (req, file, cb) {
        try {
            let a = file.originalname.split('.')
            req.image = `public/${file.fieldname}-${new Date().getTime()}.${a[a.length - 1]}`;
            cb(null, `${file.fieldname}-${new Date().getTime()}.${a[a.length - 1]}`)
        } catch (e) {
            cb(e)
        }
    }
})

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname).toLowerCase();
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.pdf' && ext !== '.mp4' && ext !== '.mp3') {
            return ("Only images with PNG, JPG, GIF, and JPEG extentions and PDF files are allowed!");
        }
        callback(null, true)
    },
    limits: {
        fileSize: 1024 * 1024 * 10
    }
})
module.exports = {
    createResult: createResult,
    generateOTP: generateOTP,
    imageDelele: imageDelele,
    upload: upload
}