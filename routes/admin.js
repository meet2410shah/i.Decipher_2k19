// Configuration File
const config = require('config');
const USERNAME = config.get('ADMIN.USERNAME');
const PASSWORD = config.get('ADMIN.PASSWORD');
const ADMIN_SECRET_KEY = config.get('ADMIN.ADMIN_SECRET_KEY');
const DURATION = config.get('IDECIPHER.EVENT_DURATION');

// Express Router Setup 
const express = require("express");
const router = express.Router();

// Helper Functions and Modules
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const checkUser = (req, res, next) => {
    const { iDecipherToken, admin } = req.cookies;
    if(iDecipherToken) {
        return res.redirect('/questions');
    }
    if(admin) {
        return res.redirect('/admin/autherized');
    }
    next();
}

const checkAdminRights = (req, res, next) => {
    const { iDecipherToken } = req.cookies;
    if(iDecipherToken) {
        return res.redirect('/questions');
    }
    const { username, password } = req.body;
    if(username === USERNAME && password === PASSWORD) {
        next();
    } else {
        return res.redirect('/admin');
    }
}

//Set Storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

//Init Upload
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000
    },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('myImage');

//Check File Type
function checkFileType(file, cb) {
    //Allowed extension
    const filetypes = /jpg|jpeg|png|gif/;
    //Check extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //Check mime
    const mimetypes = filetypes.test(file.mimetype);
    if(mimetypes && extname) {
        return cb(null, true);
    } else {
        cb('Error : Images Only!');
    }
}

var data = [];

const isThisValidUser = (req, res, next) => {
    const { admin } = req.cookies;
    jwt.verify(admin, ADMIN_SECRET_KEY, (err, authData) => {
        if(err) {
          return res.status(401).redirect('/admin');
        } else {
          next();
        }
    });
}

router.get('/autherized', isThisValidUser, (req, res) => res.render('autherizedAdmin'));

router.post('/autherized', (req, res) => {
    upload(req, res, (err) => {
        if(err) {
            res.render('autherizedAdmin',{
                msg : err
            });
        } else {
            if(req.file == undefined) {
                res.render('autherizedAdmin', {
                    msg : 'Error : No file Selected'
                });
            } else {
                res.render('autherizedAdmin', {
                    msg : 'File Uploaded!',
                    file : `uploads/${req.file.filename}`
                });
                
            }
            // res.send('test');
        }
    })
});

router.get('/', checkUser, (req, res) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.render('admin');
});

router.post('/', checkAdminRights, (req, res) => {
    const user = {
        USERNAME,
        PASSWORD
    }
    jwt.sign({ user }, ADMIN_SECRET_KEY, { expiresIn: DURATION }, (err, token) => {
        res.cookie('admin', token, { maxAge : DURATION });
        return res.redirect('/admin');
    });
});

module.exports = router;