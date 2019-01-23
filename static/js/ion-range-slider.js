(function($) {
  'use strict';

  if ($('#range_01').length) {
    $("#range_01").ionRangeSlider();
  }

  if ($("#range_02").length) {
    $("#range_02").ionRangeSlider({
      min: 100,
      max: 1000,
      from: 550
    });
  }

  if ($("#range_03").length) {
    $("#range_03").ionRangeSlider({
      type: "double",
      grid: true,
      min: 0,
      max: 1000,
      from: 200,
      to: 800,
      prefix: "$"
    });
  }

  if ($("#range_04").length) {
    $("#range_04").ionRangeSlider({
      type: "double",
      min: 100,
      max: 200,
      from: 145,
      to: 155,
      prefix: "Weight: ",
      postfix: " million pounds",
      decorate_both: true
    });
  }

  if ($("#range_05").length) {
    $("#range_05").ionRangeSlider({
      type: "double",
      min: 1000,
      max: 2000,
      from: 1200,
      to: 1800,
      hide_min_max: true,
      hide_from_to: true,
      grid: false
    });
  }

  if ($("#range_06").length) {
    $("#range_06").ionRangeSlider({
      type: "double",
      min: 1000,
      max: 2000,
      from: 1200,
      to: 1800,
      hide_min_max: true,
      hide_from_to: true,
      grid: true
    });
  }

  if ($("#range_07").length) {
    $("#range_07").ionRangeSlider({
      type: "double",
      grid: true,
      min: 0,
      max: 10000,
      from: 1000,
      prefix: "$"
    });
  }

  if ($("#range_08").length) {
    $("#range_08").ionRangeSlider({
      type: "single",
      grid: true,
      min: -90,
      max: 90,
      from: 0,
      postfix: "Â°"
    });
  }

  if ($("#range_09").length) {
    $("#range_09").ionRangeSlider({
      type: "double",
      min: 0,
      max: 10000,
      grid: true
    });
  }

  if ($("#range_10").length) {
    $("#range_10").ionRangeSlider({
      type: "double",
      min: 0,
      max: 10000,
      grid: true,
      grid_num: 10
    });
  }

  if ($("#range_11").length) {
    $("#range_11").ionRangeSlider({
      type: "double",
      min: 0,
      max: 10000,
      step: 500,
      grid: true,
      grid_snap: true
    });
  }

  if ($("#range_12").length) {
    $("#range_12").ionRangeSlider({
      type: "single",
      min: 0,
      max: 10,
      step: 2.34,
      grid: true,
      grid_snap: true
    });
  }

  if ($("#range_13").length) {
    $("#range_13").ionRangeSlider({
      type: "double",
      min: 0,
      max: 100,
      from: 30,
      to: 70,
      from_fixed: true
    });
  }

  if ($("#range_14").length) {
    $("#range_14").ionRangeSlider({
      min: 0,
      max: 100,
      from: 30,
      from_min: 10,
      from_max: 50
    });
  }

  if ($("#range_15").length) {
    $("#range_15").ionRangeSlider({
      min: 0,
      max: 100,
      from: 30,
      from_min: 10,
      from_max: 50,
      from_shadow: true
    });
  }

  if ($("#range_16").length) {
    $("#range_16").ionRangeSlider({
      type: "double",
      min: 0,
      max: 100,
      from: 20,
      from_min: 10,
      from_max: 30,
      from_shadow: true,
      to: 80,
      to_min: 70,
      to_max: 90,
      to_shadow: true,
      grid: true,
      grid_num: 10
    });
  }

  if ($("#range_17").length) {
    $("#range_17").ionRangeSlider({
      min: 0,
      max: 100,
      from: 30,
      disable: true
    });
  }

})(jQuery);