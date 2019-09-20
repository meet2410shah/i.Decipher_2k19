// Configuration File
const config = require('config');
const SECRET_KEY = config.get('IDECIPHER.SECRET_KEY');

// Special Functions and Modules
const jwt = require('jsonwebtoken');

const isVerified = (req, res, next) => {
    const { iDecipherToken } = req.cookies;
    if(iDecipherToken) {
        jwt.verify(iDecipherToken, SECRET_KEY, (err, authData) => {
            if(err) {
                return res.status(403).redirect('/unautherized');
            } else {
                if(!authData.team.isVerified) {
                    return res.redirect('/rules');
                } else {
                    return next();
                }
            }
        });
    } else {
        return res.redirect('/login');
    }
}

module.exports = isVerified;