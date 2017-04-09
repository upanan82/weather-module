'use strict';

var city, 
    country, 
    loc,
    region,
    cf = 0,
    temp,
    tempIcon,
    tempDescription,
    message = "<p><img src='images/error.png' width='50'></p>We're Sorry, but you can not find the forecast for<br> your area at the moment!<br><br><a class='a' target='_blank' href='https://openweathermap.org/'>see forecast here</a>";

function weather() {
  $.getJSON("http://ipinfo.io/", function(place) {
    loc = place.loc.split(",");
    region = place.region;
    if(place.city == "") 
    {
      $(".block").html(message);
      return;
    }
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + loc[0] + "&lon=" + loc[1] + "&APPID=ccceef811955b8382cd92c367c1a77bb", function(json) {
      city = json.name;
      country = json.sys.country;
      temp = Math.round(json.main.temp - 273.15);
      description = json.weather[0].description;
      tempIcon = "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png";
      cf = "<a href='#' onclick='far();'>C</a>";
      $("h2").html(city + ", " + region + ", " + country);
      $("h3").html("<img src='" + tempIcon + "'><br>" + temp + " °" + cf);
      $(".inf").html(description);
      $(".footer").html("by <a target='_blank' href='https://github.com/upanan82'>upanan82</a>");
    })
    .fail(function() { $(".block").html(message); })
  })
  .fail(function() { $(".block").html(message); })
};

function cel() {
  temp = Math.round((temp - 32) / 1.8);
  cf = "<a href='#' onclick='far();'>C</a>";
  $("h3").html("<img src='" + tempIcon + "'><br>" + temp + " °" + cf);
};

function far() {
  temp = Math.round(temp * 1.8 + 32);
  cf = "<a href='#' onclick='cel();'>F</a>";
  $("h3").html("<img src='" + tempIcon + "'><br>" + temp + " °" + cf);
};

$(document).ready(function () {
  weather();
});