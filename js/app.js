// replace these values with those generated in your TokBox Account
var apiKey = "47461801";
var sessionId = "2_MX40NzQ2MTgwMX5-MTY0Njc3MjMwNDY3MX5jdjV3TGI2ZXpXWnlRcnNKUFp6elRaLyt-fg";
var token = "T1==cGFydG5lcl9pZD00NzQ2MTgwMSZzaWc9ZWFiZWJmMDQwNjdkMjU4YTcwZTZiZGJiMjc5MzBjZjAwMzBhMjM5MzpzZXNzaW9uX2lkPTJfTVg0ME56UTJNVGd3TVg1LU1UWTBOamMzTWpNd05EWTNNWDVqZGpWM1RHSTJaWHBYV25sUmNuTktVRnA2ZWxSYUx5dC1mZyZjcmVhdGVfdGltZT0xNjQ2NzcyMzM5Jm5vbmNlPTAuMjk2Mjg0NjI2MTk4NDA1MSZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNjQ3Mzc3MTM4JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";

// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

// (optional) add server code here
initializeSession();

function turnOffVideo(){
  publisher.publishVideo(false);
};

function turnOffAudio(){
  publisher.publishAudio(false);
};

function initializeSession() {
  var session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream
  session.on('streamCreated', function(event) {
  session.subscribe(event.stream, 'subscriber', {
    insertMode: 'append',
    width: '100%',
    height: '100%'
  }, handleError);
});

  // Create a publisher
  //adding pre-setting
  var pubOptions = {publishAudio:true, publishVideo:true};
  publisher = OT.initPublisher('publisher', pubOptions, {
    insertMode: 'append',
    width: '100%',
    height: '100%'
  }, handleError);
  //test
  //publisher.publishVideo(false);


  // Connect to the session
  session.connect(token, function(error) {
    // If the connection is successful, publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });
}
