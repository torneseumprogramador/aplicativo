$(document).ready(function(){
  app.loadVideos();
  app.loadButtonsActions();
  app.actionFind();
});

var app = window.app || {};

app.isAndroid = function() {
  return navigator.userAgent.match(/Android/i);
};

app.isIphone = function() {
  return navigator.userAgent.match(/iPhone/i);
};

app.isMobile = function(){
  if(
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  ){ return true; }
  else { return false; }
};

app.moreVideos = function(){
  var i = 0;
  $("#videos .video.hidden").each(function(){
    if(i < 10){
      $(this).removeClass("hidden");
      var imagem = $(this).find("img").data("imagem");
      $(this).find("img").attr("src", imagem);
    }
    else{
      return;
    }
    i++;
  });

  if($("#videos .video.hidden").size() == 0){
    $("#loadMoreVideo").remove();
  }
}

app.loadVideos = function(){
  if($("#videos").size() > 0){
    $.ajax({
      url: app.urlServico + "/aulas.json"
    }).done(function(aulas) {
      var html = "";
  
      for(i=0;i<aulas.length; i++){
        html += "<li>";
        html += "  <div class='video " + (i < 10 ? "" : "hidden") + "'>";
        html += "    <a href=\"javascript:app.openInternalLink('video.html?id=" + aulas[i].videoYoutube + "');\">";
        html += "      <img " + (i < 10 ? "src='http://img.youtube.com/vi/"+ aulas[i].videoYoutube + "/hqdefault.jpg'" : "data-imagem='http://img.youtube.com/vi/"+ aulas[i].videoYoutube + "/hqdefault.jpg'") + " style='width: 200px;height: 150px;'>";
        html += "      <p>" + aulas[i].titulo + "</p>";
        html += "    </a>";
        html += "  </div>";
        html += "</li>"
      }

      $("#videos").html(html);

      if(aulas.length > 10){
        $("#loadMoreVideo").show();
      }
    });
  }
}

app.loadVideo = function(){
  if($("#video_container").size() > 0){
    $.ajax({
      url: app.urlServico + "/aulas.json"
    }).done(function(aulas) {
      var html = "";
  
      for(i=0;i<aulas.length; i++){
        html += "<li>";
        html += "  <div class='video " + (i < 10 ? "" : "hidden") + "'>";
        html += "    <a href=\"javascript:app.openInternalLink('video.html?id=" + aulas[i].videoYoutube + "');\">";
        html += "      <img " + (i < 10 ? "src='http://img.youtube.com/vi/"+ aulas[i].videoYoutube + "/hqdefault.jpg'" : "data-imagem='http://img.youtube.com/vi/"+ aulas[i].videoYoutube + "/hqdefault.jpg'") + " style='width: 200px;height: 150px;'>";
        html += "      <p>" + aulas[i].titulo + "</p>";
        html += "    </a>";
        html += "  </div>";
        html += "</li>"
      }

      $("#videos").html(html);

      if(aulas.length > 10){
        $("#loadMoreVideo").show();
      }
    });
  }
}

app.getHtmlVideo = function(youtube_url) {
  app.showLoading()
  var video = app.getIdYoutubeImagem(youtube_url);
  return "<iframe width='98%' onload='app.hideLoading()' height='300px' src='https://www.youtube.com/embed/"+video+"' frameborder='0' allowfullscreen></iframe>";
};

app.getIdYoutubeImagem = function(youtube_url){
  var id_video = youtube_url.split('v=');
  id_video = id_video[1];
  return id_video;
};

app.fixAndroidCaractere = function(){
  if(app.isAndroid()){
    if(window.location.hash.indexOf(":") !== -1){
      window.location.hash = window.location.hash.replace(/:/g, '%3A');
    }
  }
};

app.actionFind = function(){
  if(window.location.href.indexOf("videos") != -1){
    var textFind = app.getParameterByName("q");
    if(app.notEmpty(textFind)){
      textFind = unescape(textFind.replace("#", ""));
      $("#lupa a").trigger("click");
      $("#aula").val(textFind);
      var esperaData = setInterval(function(){
        if(data.length > 0){
          $("#findAula .button").trigger("click");
          clearInterval(esperaData);
        }
      }, 500);
    }
  }
}

app.loadButtonsActions = function(){
  $("#lupa a").click(function(){
    $("#nome_site").hide();
    $("#lupa").hide();
    $("#findAula").show();
    $("#aula").focus();
  });

  $(".cancel-busca").click(function(){
    $("#nome_site").show();
    $("#lupa").show();
    $("#findAula").hide();
  });

  $("#findAula .button").click(function(){
    if(window.location.href.indexOf("videos") == -1){
      app.openInternalLink('videos.html?q=' + $("#findAula input").val());
      return;
    }

    app.findAulaHeader();
  });
}

app.itemFound = false;
app.findAulaHeader = function(stop){
  app.itemFound = false

  $("#videos li div").each(function(){
    var text = $(this).find("p").text();
    var fullText = $(this).find("span").text();
    var findText = $('#aula').val();

    if(app.notEmpty(findText) && app.notEmpty(fullText) && app.notEmpty(text)){
      text = app.accentsTidy(text.toLowerCase());
      fullText = app.accentsTidy(fullText.toLowerCase());
      findText = app.accentsTidy(findText.toLowerCase());
      if(text.indexOf(findText) != -1 || fullText.indexOf(findText) != -1){
        if(!app.itemFound){
          app.itemFound = true;
          $(this).css("background-color", "#FFFFE0");
          var top = $(this).offset().top - 200;
          app.scroll(top, 200);
        }
      }
      else{
        $(this).css("background-color", "#fff");
      }
    }
  });

  if(!app.itemFound){
    if(stop == undefined){
      app.loadForFindHeader(1)
    }else{    
      $('#aula').val("Não encontrado");
      setTimeout(function(){
        $('#aula').val("");
      }, 1200);
    }
  }
}

app.jsLoad=[];
app.loadForFindHeader = function(index){
  var js = 'videos' + index + '.js';
  if(app.jsLoad.indexOf(js) != -1){
    app.findAulaHeader(true);
    return; 
  }
  app.jsLoad.push(js);
  app.loadMore(js,function(){
    app.findAulaHeader(true);
    if(!app.itemFound){
      app.loadForFindHeader(index + 1)
    }
  });
}

app.loadMore = function(file, callback){
  $("#loadMore").html("<p class=\"carregando\">Carregando</p>");
  var s = document.createElement('script');
  s.onload = callback;
  s.setAttribute('src','http://www.torneseumprogramador.com.br/javascripts/data/' + file);
  document.head.appendChild(s);
}

app.accentsTidy = function(s){
  var r=s.toLowerCase();
  r = r.replace(new RegExp(/[àáâãäå]/g),"a");
  r = r.replace(new RegExp(/æ/g),"ae");
  r = r.replace(new RegExp(/ç/g),"c");
  r = r.replace(new RegExp(/[èéêë]/g),"e");
  r = r.replace(new RegExp(/[ìíîï]/g),"i");
  r = r.replace(new RegExp(/ñ/g),"n");                
  r = r.replace(new RegExp(/[òóôõö]/g),"o");
  r = r.replace(new RegExp(/œ/g),"oe");
  r = r.replace(new RegExp(/[ùúûü]/g),"u");
  r = r.replace(new RegExp(/[ýÿ]/g),"y");
  return r;
};

app.scroll = function(scrollTo, time) {
  var scrollFrom = parseInt(document.body.scrollTop), i = 0, runEvery = 5;
  scrollTo = parseInt(scrollTo);
  time /= runEvery;
  var interval = setInterval(function () {
    i++;
    document.body.scrollTop = (scrollTo - scrollFrom) / time * i + scrollFrom;
    if (i >= time) {
      clearInterval(interval);
    }
  }, runEvery);
}

app.unfixAndroidCaractere = function(){
  if(app.isAndroid()){
    app.replaceDoisPontos();
  }
};

app.replaceDoisPontos = function(){
  window.location.hash = window.location.hash.replace(/%3A/g, ':');
};

app.openInternalLink = function(url) {
  //window.location = url;
  app.showLoading();
  url = url.replace(/:/g,'%3A');
  app.openWindow(url);
  app.hideLoading();
};

app.backWindow = function() {
  app.showLoading();
  app.closeWindow();
};

app.notEmpty = function(str) {
  return str !== undefined && str !== "undefined" && str !== "" && str !== null && str !== 'null';
};

app.empty = function(str) {
  return !app.notEmpty(str);
};

app.openUrl = function(url) {
  try{
    var Ti = window.parent.Ti;
    Ti.App.fireEvent('openUrl',{url: url});
  }catch(e){
    alert(e.message);
  }
};

app.openUrlMensagem = function(url, mensagem) {
  try{
    var Ti = window.parent.Ti;
    Ti.App.fireEvent('openUrl',{url: url, message: mensagem});
  }catch(e){
    alert(e.message);
  }
};

app.openWindow = function(url) {
  try{
    var Ti = window.parent.Ti;
    Ti.App.fireEvent('openWindow',{url: url});
  }
    catch(e){
      alert(e.message);
    }
};

app.backToHome = function(url) {
  app.showLoading();
  try{
    var Ti = window.parent.Ti;
    Ti.App.fireEvent('backToHome');
  }
    catch(e){
      alert(e.message);
    }
};

app.closeWindow = function(url) {
  try{
    var Ti = window.parent.Ti;
    Ti.App.fireEvent('closeWindow');
  }
    catch(e){
      alert(e.message);
    }
};

app.openVideo = function(url) {
  try{
    var Ti = window.parent.Ti;
    Ti.App.fireEvent('openVideo',{url: url});
  }
    catch(e){
      alert(e.message);
    }
};


app.VideoHtml = null;


app.getParameterByName = function(name) {
  var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.href);

  return match ? match[1] : null;
};

app.getParams = function(){
  var p = window.location.href.match(/[?&#]([^?&#]+)/g);
  return p ? p.map(function(v){return v.replace(/[?&#]/, '');}) : null;
};

app.scrollTop = function(index){
  window.scrollTo(index,0);
};

app.networkOffAlert = function(){
  if(Ti !== undefined){
    Ti.App.fireEvent('networkOffAlert');
  }
};

app.messageForUser = function(){
  try{
    if(aviso){
      if(app.notEmpty(aviso.message)){
        if(Ti !== undefined){
          Ti.App.fireEvent('messageForUser',{
            message: aviso.message,
            confirm: aviso.confirm,
            url: aviso.url,
            openUrl: aviso.openUrl
          });
        }
      }
    }
  }
  catch(e){}
};

try{
  var Ti = {
    _event_listeners: [],
    createEventListener: function(listener) {
      var newListener = { listener: listener, systemId: -1, index: this._event_listeners.length };
      this._event_listeners.push(newListener);
      return newListener;
    },
    getEventListenerByKey: function(key, arg) {
      for (var i = 0;i < this._event_listeners.length; i++) {
        if (this._event_listeners[i][key] == arg) {
          return this._event_listeners[i];
        }
      }
      return null;
    },
    API: TiAPI,
    App: {
      addEventListener: function(eventName, listener){
        var newListener = Ti.createEventListener(listener);
        newListener.systemId = TiApp.addEventListener(eventName, newListener.index);
        return newListener.systemId;
      },
      removeEventListener: function(eventName, listener){
        if (typeof listener == 'number') {
          TiApp.removeEventListener(eventName, listener);
          var l = Ti.getEventListenerByKey('systemId', listener);
          if (l !== null) {
            Ti._event_listeners.splice(l.index, 1);
          }
        } else {
          l = Ti.getEventListenerByKey('listener', listener);
          if (l !== null) {
            TiApp.removeEventListener(eventName, l.systemId);
            Ti._event_listeners.splice(l.index, 1);
          }
        }
      },
      fireEvent: function(eventName, data){
        TiApp.fireEvent(eventName, JSON.stringify(data));
      }
    },
    executeListener: function(id, data){
      var listener = this.getEventListenerByKey('index', id);
      if (listener !== null) {
        listener.listener.call(listener.listener, data);
      }
    }
  };
  var Titanium = Ti;
}catch(e){}

app.networkOffAlert();

app.loadByUrl = function(params, callbackSucess, callbackError){
  var config = {
    success: function(data) {
      callbackSucess.call(null, data);
    },
    error: function(xhr, type) {
      callbackError.call(xhr, type);
    },
  }

  config.url = params.url;
  if(params.type) config.type = params.type;
  if(params.data) config.data = params.data;
  if(params.dataType) config.dataType = params.dataType;
  $.ajax(config);
}

app.updateApp = function(){
  try{
    if(version){
      if(parseFloat(app.appVersion) < parseFloat(version.v)){
        if (app.isAndroid()){
          app.openUrlMensagem("https://play.google.com/store/apps/details?id=com.didox.programador", version.message + '\n\nDeseja atualizar agora?');
        }
        else{
          app.openUrlMensagem("https://itunes.apple.com/br/app/torne-se-um-programador/ssdd?mt=8", version.message + '\n\nDeseja atualizar agora?');
        }
      }
    }
  }
  catch(e){}
}

