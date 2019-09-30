// Configuration File
const config = require('config');
const EVENT_END_TIME = config.get("IDECIPHER.EVENT_END_TIME");
const SECRET_KEY = config.get('IDECIPHER.SECRET_KEY');

// Express Router Setup
const express = require('express');
const router = express.Router();

// Database connection
const Teams = require('../database/models/teams');

// Middleware Functions
const checkEventEndTime = require('../middleware/checkEventEndTime');

// Helper Functions and Modules
const calculateTime = require('../helper/calculateTime');
const jwt = require('jsonwebtoken');

// Router Definition
router.get("/", checkEventEndTime, (req, res) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    const { iDecipherToken } = req.cookies;
    if(iDecipherToken) {
        jwt.verify(iDecipherToken, SECRET_KEY, (err, authData) => {
            if(err) {
                return res.status(401).redirect(`/unautherized`);
            } else {
                const { _id } = authData.team;
                Teams.findById({ _id }, (err, team) => {
                    if(err) {
                        return res.redirect('/unautherized');
                    }
                    if(team) {
                        if(team.isVerified === true) {
                            return res.render("rules", {
                                time: calculateTime(new Date(EVENT_END_TIME)),
                                isVerified: true
                            });
                        } else {
                            res.render("rules", {
                                time: calculateTime(new Date(EVENT_END_TIME)),
                                isVerified: false
                            });
                        }
                    } else {
                        return res.redirect('/unautherized');
                    }
                });
            }
        });
    } else {
        res.render("rules", {
            time: calculateTime(new Date(EVENT_END_TIME)),
            isVerified: false
        });
    }
});

router.post("/", (req, res) => {
    const { iDecipherToken } = req.cookies;
    jwt.verify(iDecipherToken, SECRET_KEY, (err, authData) => {
        if(err) {
          return res.status(401).redirect('/unautherized');
        } else {
            const { _id } = authData.team;
            Teams.findByIdAndUpdate({ _id }, {isVerified: true}, { new : true }, (err, team) => {
                if(team) {
                    res.redirect('/questions');
                } else {
                    res.redirect('/rules');
                }
            });
        }
    });
})

module.exports = router;