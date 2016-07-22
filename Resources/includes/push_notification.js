try{
  if (Ti.Platform.osname == 'android'){
    var CloudPush = require('ti.cloudpush');
    CloudPush.debug = true;
    CloudPush.enabled = true;
    CloudPush.showTrayNotificationsWhenFocused = true;
    CloudPush.focusAppOnPush = false;

    var deviceToken;
    var username = 'aluno-' + Titanium.Platform.id;
    var password = 'torne-se';
    
    var Cloud = require('ti.cloud');
    Cloud.debug = true;

    CloudPush.retrieveDeviceToken({
      success: function deviceTokenSuccess(e) {
        //alert('Device Token: ' + e.deviceToken);
        deviceToken = e.deviceToken
        createUser();
      },
      error: function deviceTokenError(e) {
        //alert('Failed to register for push! ' + e.error);
      }
    });

    function createUser(){
      Cloud.Users.create({
        username: username,
        password: password,
        password_confirmation: password
       }, 
       function (e) {
        if (e.success) {
          loginDefault();
          // alert('You are now logged in as ' + e.users[0].username);
        } else {
          loginDefault();
          //alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
        }
      });
    }

    function loginDefault(e){
      //Create a Default User in Cloud Console, and login
      Cloud.Users.login({
          login: username,
          password: password
      }, function (e) {
          if (e.success) {
            //alert("login success");
            defaultSubscribe();
          } else {
            //alert('Error: ' +((e.error && e.message) || JSON.stringify(e)));
          }
      });
    }

    function defaultSubscribe(){
      Cloud.PushNotifications.subscribe({
        channel: 'Projeto torne-se um programador',
        device_token: deviceToken,
        type: 'android'
      }, function (e){
        if (e.success) {
          //alert('Subscribed for Push Notification!');
        }else{
          //alert('Error:' +((e.error && e.message) || JSON.stringify(e)));
        }
      });
    }
  }
}
catch(e){
  alert('Error ao criar notification: ' + e.message);
}