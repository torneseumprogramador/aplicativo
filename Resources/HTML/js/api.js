var app = window.app || {};

app.appVersion       = 9.4;
app.urlServico       = "http://www.torneseumprogramador.com.br";

app.showLoading = function(){
  $(".carregando").show();
};

app.hideLoading = function(moveTop){
  setTimeout(function(){
    moveTop = moveTop == undefined ? true : false;
    $(".carregando").hide();
    if(moveTop) app.scrollTop(0);
  }, 500);
};

app.showLoading();

$(document).ready(function(){
  $(".version").html("Versão: " + app.appVersion)
  if(document.location.href.indexOf("video.html") == -1){
    app.hideLoading();
  }
});