'use strict';
const twilio = require('twilio');
const yogaManager = require('./manager.js');

// Make Twilio creds avail on process.env.
require('dotenv').config();
const accountSid = process.env.TWILIO_ID;
const authToken = process.env.TWILIO_TOKEN;

const classes = yogaManager.getClassesByTime();
Object.keys(classes).forEach(time => {
    if (classes.hasOwnProperty(time)) {
        sendMsg(`${time}: ${classes[time]}`);
    }
});

function sendMsg(msg) {
    const client = twilio(accountSid, authToken);
    client.messages.create({
        to: process.env.PHONE_NUMBER,
        from: '+12262714596',
        body: msg,
    }, function (err, message) {
        console.log(message.sid);
    });
}
