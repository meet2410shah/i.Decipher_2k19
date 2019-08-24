const express = require('express');
const router = express.Router();
const Teams = require('../database/models/teams');

const checkLoggedIn = require('../middleware/checkLoggedIn');
const redirectQuestion = require('../middleware/redirectQuestion');
const checkTime = require("../middleware/checkTime");

router.post('/', checkTime, (req, res) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    const { accept } = req.body;
    if(accept == "on") {
        const { iDecipherToken } = req.cookies;
        if(iDecipherToken) {
            Teams.findOneAndUpdate({_id:iDecipherToken}, {isVerified: true}, {new:true})
            .then((team) => {
                if(team) {
                    res.redirect('/question');
                } else {
                    res.send('Unauthorised team error');
                }
            }); 
        } else {
            res.redirect('/login');
        }
    } else {
        return res.redirect('rules');
    }
})

module.exports = router;