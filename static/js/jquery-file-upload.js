(function($) {
  'use strict';
  if ($("#fileuploader").length) {
    $("#fileuploader").uploadFile({
      url: "YOUR_FILE_UPLOAD_URL",
      fileName: "myfile"
    });
  }
})(jQuery);
