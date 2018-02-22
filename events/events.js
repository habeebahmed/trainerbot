const request = require('request');
require('dotenv').config({
  path: 'variables.env'
});
const word = require('../word');
var rounds = 0;
var correct = undefined;
var a = [];
var b = [0, 1, 2, 3];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


function receivedMessage(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;

  console.log("Received message for user %d and page %d at %d with message:",
    senderID, recipientID, timeOfMessage);
  console.log(JSON.stringify(message));

  var isEcho = message.is_echo;
  var messageId = message.mid;
  var appId = message.app_id;
  var metadata = message.metadata;

  // You may get a text or attachment but not both
  var messageText = message.text;
  var messageAttachments = message.attachments;
  var quickReply = message.quick_reply;

  if (isEcho) {
    // Just logging message echoes to console
    console.log("Received echo for message %s and app %d with metadata %s",
      messageId, appId, metadata);
    return;
  } else if (quickReply) {
    var quickReplyPayload = quickReply.payload;
    console.log("Quick reply for message %s with payload %s",
      messageId, quickReplyPayload);
    console.log("rounds:" + rounds);
    if (quickReplyPayload === 'PAYLOAD:true') {
      sendTextMessage(senderID, "correct")
    } else {
      //sendTextMessage(senderID,"wrong")
      console.log(a);
      console.log(correct);
      console.log(a[correct].word);

      //let msg = "correct answer is "+a[correct].word
      sendTextMessage(senderID, "correct answer is " + a[correct].word)
    }
    if(rounds != 0)
    sendToQuickReply(event)
    else if(rounds == 0){
      sendTextMessage(senderID,"completed")

    }

    --rounds;
    //sendTextMessage(senderID, "Quick reply tapped");
    return;
  }


  if (messageText) {

    // If we receive a text message, check to see if it matches any special
    // keywords and send back the corresponding example. Otherwise, just echo
    // the text we received.
    switch (messageText.replace(/[^\w\s]/gi, '').trim().toLowerCase()) {
      case 'hello':
      case 'hi':
        sendHiMessage(senderID);
        break;
      case 'start':
        sendButtonMessage(senderID)

        break;

      default:
        sendTextMessage(senderID, messageText);
    }
  } else if (messageAttachments) {
    sendTextMessage(senderID, "Message with attachment received");
  }
}

function receivedDeliveryConfirmation(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var delivery = event.delivery;
  var messageIDs = delivery.mids;
  var watermark = delivery.watermark;
  var sequenceNumber = delivery.seq;

  if (messageIDs) {
    messageIDs.forEach(function(messageID) {
      console.log("Received delivery confirmation for message ID: %s",
        messageID);
    });
  }

  console.log("All message before %d were delivered.", watermark);
}

function receivedPostback(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfPostback = event.timestamp;

  // The 'payload' param is a developer-defined field which is set in a postback
  // button for Structured Messages.
  //  var payload = event.postback.payload;

  if (event.postback.payload === 'PAYLOAD:10') {
    rounds = 9
    console.log("rounds in postback"+rounds);

    sendTextMessage(senderID, 'challenge of 10 questions selected')
        sendToQuickReply(event)



    }

  if (event.postback.payload === 'PAYLOAD:20') {
    rounds = 19
    sendTextMessage(senderID, 'challenge of 20 questions selected')
    sendQuickReply(senderID)


  }
}


function sendToQuickReply(event){

senderID = event.sender.id;


  word.words().then(value => {
    //console.log(value.data)
    a[0] = value.data;
    a[0].flag = false;
    //sendQuickReply(senderID,value.data.word,value.data.results[0].definition)
    word.words().then(value => {
      //console.log(value.data)
      a[1] = value.data;
      a[1].flag = false;
      //sendQuickReply(senderID,value.data.word,value.data.results[0].definition)
      word.words().then(value => {
        //console.log(value.data)
        a[2] = value.data;
        a[2].flag = false;
        //sendQuickReply(senderID,value.data.word,value.data.results[0].definition)
        word.words().then(value => {
          //console.log(value.data)
          a[3] = value.data;
          a[3].flag = false;
          //sendQuickReply(senderID,value.data.word,value.data.results[0].definition)
          correct = getRandomInt(4);
          console.log(correct);
          a[correct].flag = true;
          console.log(a);
          console.log(b);
          sendQuickReply(senderID, a, correct)
        })
      })

    })
})
}


function receivedMessageRead(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;

  var watermark = event.read.watermark;
  var sequenceNumber = event.read.seq;

  console.log("Received message read event for watermark %d and sequence " +
    "number %d", watermark, sequenceNumber);
}

function receivedAccountLink(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;

  var status = event.account_linking.status;
  var authCode = event.account_linking.authorization_code;

  console.log("Received account link event with for user %d with status %s " +
    "and auth code %s ", senderID, status, authCode);
}

function sendHiMessage(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      "attachment": {
        "type": "image",
        "payload": {
          "url": "https://media2.giphy.com/media/l3q2GDh3wQqVWSiGY/giphy.gif",
          "is_reusable": true
        }
      }
    }
  }
  callSendAPI(messageData);
}

function sendQuickReply(recipientId, value, c) {
  console.log(value);
//  console.log(arr);
  console.log(c);
  console.log(value[c].word);
  console.log(value[c].results[0].definition);
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      "text": value[c].results[0].definition,
      "quick_replies": [{
        "content_type": "text",
        "title": value[0].word,
        "payload": "PAYLOAD:" + value[0].flag,
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Red.svg/2000px-Red.svg.png"
      }, {
        "content_type": "text",
        "title": value[1].word,
        "payload": "PAYLOAD:" + value[1].flag,
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Red.svg/2000px-Red.svg.png"
      }, {
        "content_type": "text",
        "title": value[2].word,
        "payload": "PAYLOAD:" + value[2].flag,
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Red.svg/2000px-Red.svg.png"
      }, {
        "content_type": "text",
        "title": value[3].word,
        "payload": "PAYLOAD:" + value[3].flag,
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Red.svg/2000px-Red.svg.png"
      }]
    }
  }
  callSendAPI(messageData);
}


function sendTextMessage(recipientId, messageText) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText,
      metadata: "DEVELOPER_DEFINED_METADATA"
    }
  };

  callSendAPI(messageData);
}

function sendButtonMessage(recipientId) {

  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {

      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "button",
          "text": "Choose from below challenges",
          "buttons": [{
            "type": "postback",
            "title": "Beginner(10)😎",
            "payload": "PAYLOAD:10"
          }, {
            "type": "postback",
            "title": "Professional(20)😈",
            "payload": "PAYLOAD:20"
          }]
        }
      }
    }
  };

  callSendAPI(messageData);
}


function callSendAPI(messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {
      access_token: process.env.token
    },
    method: 'POST',
    json: messageData

  }, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      if (messageId) {
        console.log("Successfully sent message with id %s to recipient %s",
          messageId, recipientId);
      } else {
        console.log("Successfully called Send API for recipient %s",
          recipientId);
      }
    } else {
      console.error("Failed calling Send API", response.statusCode, response.statusMessage, body.error);
    }
  });
}



module.exports.receivedMessage = receivedMessage
module.exports.receivedPostback = receivedPostback
module.exports.receivedDeliveryConfirmation = receivedDeliveryConfirmation
module.exports.receivedAccountLink = receivedAccountLink
module.exports.receivedMessageRead = receivedMessageRead
