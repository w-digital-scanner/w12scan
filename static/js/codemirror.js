(function($) {
  'use strict';
  if ($('textarea[name=code-editable]').length) {
    var editableCodeMirror = CodeMirror.fromTextArea(document.getElementById('code-editable'), {
      mode: "javascript",
      theme: "ambiance",
      lineNumbers: true
    });
  }
  if ($('#code-readonly').length) {
    var readOnlyCodeMirror = CodeMirror.fromTextArea(document.getElementById('code-readonly'), {
      mode: "javascript",
      theme: "ambiance",
      lineNumbers: true,
      readOnly: "nocursor"
    });
  }

  //Use this method of there are multiple codes with same properties
  if ($('.multiple-codes').length) {
    var code_type = '';
    var editorTextarea = $('.multiple-codes');
    for (var i = 0; i < editorTextarea.length; i++) {
      $(editorTextarea[i]).attr('id', 'code-' + i);
      CodeMirror.fromTextArea(document.getElementById('code-' + i), {
        mode: "javascript",
        theme: "ambiance",
        lineNumbers: true,
        readOnly: "nocursor",
        maxHighlightLength: 0,
        workDelay: 0
      });
    }
  }

  //Use this method of there are multiple codes with same properties in shell mode
  if ($('.shell-mode').length) {
    var code_type = '';
    var shellEditor = $('.shell-mode');
    for (var i = 0; i < shellEditor.length; i++) {
      $(shellEditor[i]).attr('id', 'code-' + i);
      CodeMirror.fromTextArea(document.getElementById('code-' + i), {
        mode: "shell",
        theme: "ambiance",
        readOnly: "nocursor",
        maxHighlightLength: 0,
        workDelay: 0
      });
    }
  }
})(jQuery);