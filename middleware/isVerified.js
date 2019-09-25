// Configuration File
const config = require(`config`);
const SECRET_KEY = config.get(`IDECIPHER.SECRET_KEY`);

// Database connection
const Teams = require(`../database/models/teams`);

// Special Functions and Modules
const jwt = require(`jsonwebtoken`);

const isVerified = (req, res, next) => {
    const { iDecipherToken } = req.cookies;
    if(iDecipherToken) {
        jwt.verify(iDecipherToken, SECRET_KEY, (err, authData) => {
            if(err) {
                return res.status(401).redirect(`/unautherized`);
            } else {
                const { _id } = authData.team;
                Teams.findById({ _id }, (err, team) => {
                    if(team.isVerified === true) {
                        return next();
                    } else {
                        return res.status(403).redirect(`/rules`);
                    }
                });
            }
        });
    } else {
        return res.redirect(`/login`);
    }
}

module.exports = isVerified;