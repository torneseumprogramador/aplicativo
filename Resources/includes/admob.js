var admob = { adMobView:null }

try{
  if (Ti.Platform.osname == 'android'){
    var Admob = require('ti.admob');

    var code = Admob.isGooglePlayServicesAvailable();
    if (code != Admob.SUCCESS) {
        Ti.API.info("Google Play Services is not installed/updated/available");
    }

    admob.adMobView = Admob.createView({
      publisherId:"ca-app-pub-2755599186248333/1338195206",
      bottom: 0
    });

    // admob.adMobView.addEventListener(Admob.AD_RECEIVED,function(){
    //    //alert("ad received");
    //    Ti.API.info("ad received");
    // });

    // admob.adMobView.addEventListener(Admob.AD_NOT_RECEIVED,function(){
    //     //alert("ad not received");
    //     Ti.API.info("ad not received");
    // });
  }
}
catch(e){
  alert('Error ao criar publicidade: ' + e.message);
}