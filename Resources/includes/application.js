var application = {}
application.win = utils.createWindow(true);

application.webview = Ti.UI.createWebView({
  title: 'Torne-se um programador',
  url: (Ti.Platform.osname === "iphone" ? 'HTML/index.html' : '../HTML/index.html' ),
  willHandleTouches:false,
  enableZoomControls:false,
  backgroundColor: '#fff'
});

application.win.add(application.webview);
application.win.add(admob.adMobView);
application.win.open();