var express = require('express');
var mq_client = require("../rpc/client.js");
var ejs = require("ejs");

exports.userProfile = function (req, res) {
    var user_data = {
        "email": req.session.email,
        "isLoggedIn": req.session.isLoggedIn,
        "firstname": req.session.firstName
    };
    ejs.renderFile('../views/user_profile.ejs', user_data, function (err, result) {
        res.end(result);
    });
};

exports.getUserProfile = function (request, response) {
    var userId = request.params.userId;
    console.log(userId);
    var msg_payload =
    {
        userId: userId
    };
    mq_client.make_request('getUserProfile_queue', msg_payload, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            response.send({user: result});
        }
    });
};