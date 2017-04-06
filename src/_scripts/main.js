// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

var $ = require('jquery');
var Link = require('../_modules/link/link');

$(function() {

  
  check_browser_features();
  $(".info-browser-ver .info").text(get_browser().version);
  $(".info-OS .info").text(get_OS());

  $.getJSON("http://freegeoip.net/json/", function(data) {
    var country_code = data.country_code;
    var country = data.country_name;
    var ip = data.ip;
    var time_zone = data.time_zone;
    var latitude = data.latitude;
    var longitude = data.longitude;

    $(".info-ip .info").text(ip);
    $(".info-location-country .info").text(country);
    $(".info-location-city .info").text(time_zone);
    $(".info-location-lat .info").text(latitude);
    $(".info-location-long .info").text(longitude);

    console.log("Country Name: " + country);
    console.log("IP: " + ip);
    console.log("Time Zone: " + time_zone);
    console.log("Latitude: " + latitude);
    console.log("Longitude: " + longitude);
  });
});

function check_browser_features() {
  // Opera 8.0+
  var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
  // Firefox 1.0+
  var isFirefox = typeof InstallTrigger !== 'undefined';
  // Safari 3.0+ "[object HTMLElementConstructor]"
  var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
  // Internet Explorer 6-11
  var isIE = /*@cc_on!@*/false || !!document.documentMode;
  // Edge 20+
  var isEdge = !isIE && !!window.StyleMedia;
  // Chrome 1+
  var isChrome = !!window.chrome && !!window.chrome.webstore;
  // Blink engine detection
  var isBlink = (isChrome || isOpera) && !!window.CSS;

  if(isChrome) {
    $(".info-browser .info").text("Chrome");
  } else if (isOpera) {
    $(".info-browser .info").text("Opera");
  } else if (isFirefox) {
    $(".info-browser .info").text("Firefox");
  } else if (isSafari) {
    $(".info-browser .info").text("Safari");
  } else if (isIE) {
    $(".info-browser .info").text("Internet Explorer");
  } else if (isEdge) {
    $(".info-browser .info").text("Microsoft Edge");
  }
}

function get_browser() {
    var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=/\brv[ :]+(\d+)/g.exec(ua) || [];
        return {name:'IE',version:(tem[1]||'')};
        }
    if(M[1]==='Chrome'){
        tem=ua.match(/\bOPR|Edge\/(\d+)/)
        if(tem!=null)   {return {name:'Opera', version:tem[1]};}
        }
    M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
    return {
      name: M[0],
      version: M[1]
    };
 }

function get_OS() {
  var OSName="Unknown OS";
  if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
  if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
  if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
  if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";
  return OSName;
}
