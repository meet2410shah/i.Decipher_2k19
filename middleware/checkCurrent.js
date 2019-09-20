// Configuration file
const config = require('config');
const SECRET_KEY = config.get('IDECIPHER.SECRET_KEY');

// Databse Connection
const Teams = require('../database/models/teams');

// Special Functions and Modules
const jwt = require('jsonwebtoken');

// Middleware Definition
const checkCurrent = (req, res, next) => {
    const { iDecipherToken } = req.cookies;
    if(iDecipherToken) {
        jwt.verify(iDecipherToken, SECRET_KEY, (err, authData) => {    
            if(err) {
                return res.status(403).redirect(`/unautherized`);
            } else {
                const { team } = authData;
                Teams.findById(team._id, (err, team) => {
                    if(team.current > 20) {
                        return res.redirect(`/thankyou`);
                    }
                    return next();
                });
            }
        });
    } else {
        return res.redirect(`/login`);
    }
}

module.exports = checkCurrent;