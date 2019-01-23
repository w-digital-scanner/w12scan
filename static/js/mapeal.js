$(function() {
  'use strict';
  if ($(".mapeal-container").length) {
    $(".mapeal-container").mapael({
      map: {
        name: "world_countries"
      }
    });
  }
});