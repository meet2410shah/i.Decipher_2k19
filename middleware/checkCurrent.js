const Teams = require('../database/models/teams');

const checkCurrent = (req, res, next) => {
    const { iDecipherToken } = req.cookies;
    Teams.findById(iDecipherToken, (err, team) => {
        if(team) {
            if(team.current > 20) {
                return res.redirect('/thankyou');
            }
            return next();
        } else {
            return res.send('Team not Exists');
        }
    });
}

module.exports = checkCurrent;