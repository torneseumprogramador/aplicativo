application.win.addEventListener('android:back',function(e){
  application.win.close();
  Titanium.Android.currentActivity.finish();
});

application.webview.addEventListener('load', function() {
  var url = application.webview.getUrl();
  if(url.indexOf("http://") != -1){
    application.webview.goBack();
    Ti.Platform.openURL(url);
  }
});

Ti.App.addEventListener('openUrl', function(e) {
  var url = e.url;
  var message = e.message;
  utils.openURL(url, message);
});

Ti.App.addEventListener('openWindow', function(e) {
  try{
    utils.openWindow(e.url);
  }
  catch(e){
    alert(e.message);
  }
});

Ti.App.addEventListener('closeWindow', function(e) {
  try{
    utils.closeWindow();
  }
  catch(e){
    alert(e.message);
  }
});

Ti.App.addEventListener('backToHome', function(e) {
  try{
    utils.backToHome();
  }
  catch(e){
    alert(e.message);
  }
});

Ti.App.addEventListener('openVideo', function(e) {
  try{
    playVideo(e.url);
  }
  catch(e){
    alert(e.message);
  }
});

Ti.App.addEventListener('networkOffAlert', function(e) {
  try{
    utils.networkOffAlert();
  }
  catch(e){
    alert(e.message);
  }
});


Ti.App.addEventListener('messageForUser', function(e) {
  try{
    utils.messageForUser(e.message, e.confirm, e.url, e.openURL);
  }
  catch(e){
    alert(e.message);
  }
});