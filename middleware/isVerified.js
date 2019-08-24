const Teams = require('../database/models/teams');

const isVerified = (req, res, next) => {
    const { iDecipherToken } = req.cookies;
    if(iDecipherToken) {
        Teams.findById(iDecipherToken, (err, team) => {
            if(team) {
                if(team.isVerified) {
                    return next();
                } else {
                    return res.redirect('/rules');
                }
            } else {
                return res.send('Unauthorised team error');
            }
        });
    } else {
        return res.redirect('/login');
    }
}

module.exports = isVerified;