const twilio = require('twilio');
const config = require('config');
const yoga_manager = require('manager.js');


// Twilio Credentials
var accountSid = config.twilio_accountSid;
var authToken = config.twilio_authToken;

//require the Twilio module and create a REST client
var client = twilio(accountSid, authToken);

client.messages.create({
    to: config.phone_number,
    from: '+12262714596',
    body: 'Morn: hot, cold, potato, so many yogas.',
}, function (err, message) {
    console.log(message.sid);
});
