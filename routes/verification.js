const express = require('express');
const router = express.Router();
const Teams = require('../database/models/teams');

const checkEventEndTime = require('../middleware/checkEventEndTime');
const jwt = require('jsonwebtoken');

router.post('/', checkEventEndTime, (req, res) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    const { iDecipherToken } = req.cookies;
    jwt.verify(iDecipherToken, 'iDecipherToken', (err, authData) => {
        if(err) {
            return res.status(403).redirect('/unautherized');
        } else {
            const team = authData;
            if(!team) {
                return res.redirect('/unautherized');
            }
            const { _id } = team;
            Teams
                .findOneAndUpdate({ _id : _id }, { isVerified: true }, { new : true })
                .then(team => {
                    if(team) {
                        return res.redirect('/question');
                    }
                })
                .catch(e => {
                    return res.redirect('/unautherized');
                });
        }
    });
})

module.exports = router;