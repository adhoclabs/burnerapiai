// Module must be started with environment variables
//
// incomingwebhookurl="incoming webhook url for Burner"
//

'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require("request");
var apiai = require('apiai');

var incomingWebhookURL = process.env.incomingwebhookurl;
var apiAiAccessToken = process.env.accesstoken;
var apiAiService = apiai(apiAiAccessToken);

// Express setup

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());

app.get('/test', function (req, res) {
	console.log("received");
	res.sendStatus(200);
});

app.post('/listen', function (req, res) {
	
	console.log("received payload from burner: ", req.body);

	// get type from body

	var type = req.body['type'];

	// ignore calls if not the 'inboundText' type

	if (type != "inboundText") {
		res.sendStatus(200);
		return;
	}

	// get message and sender from body

	var message = req.body['payload'];
	var sender = req.body['fromNumber'];

    var agentRequest = apiAiService.textRequest(message);

    agentRequest.on('response', function (response) {

		if (response.result.fulfillment.speech === '' || response.result.action === 'smalltalk.unknown') {
			res.sendStatus(200);
			return;
		} else {
		    var responseText = response.result.fulfillment.speech;
		}

		// send message via hook

		request({
    		url: incomingWebhookURL,
    		method: 'POST',
    		json: {
    			"intent": "message",
    			"data": {"toNumber": sender, "text": responseText}
    		}
    	}, function(error, response, body) {
    		if (error) {
    			console.log('Error sending message: ', error);
    		} else if (response.body.error) {
    			console.log('Error: ', response.body.error);
    		}

    		res.sendStatus(200);
    	});

    });

    agentRequest.on('error', function (error) {
    	res.sendStatus(400);
        console.error(error);
    });

    agentRequest.end();

});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});