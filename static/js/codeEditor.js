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
  if ($('#cm-js-mode').length) {
    var cm = CodeMirror(document.getElementById("cm-js-mode"), {
      mode: "javascript",
      lineNumbers: true
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
  if ($('#ace_html').length) {
    $(function() {
      var editor = ace.edit("ace_html");
      editor.setTheme("ace/theme/monokai");
      editor.getSession().setMode("ace/mode/html");
      document.getElementById('ace_html');
    });
  }
  if ($('#ace_javaScript').length) {
    $(function() {
      var editor = ace.edit("ace_javaScript");
      editor.setTheme("ace/theme/monokai");
      editor.getSession().setMode("ace/mode/javascript");
      document.getElementById('aceExample');
    });
  }
  if ($('#ace_json').length) {
    $(function() {
      var editor = ace.edit("ace_json");
      editor.setTheme("ace/theme/monokai");
      editor.getSession().setMode("ace/mode/json");
      document.getElementById('ace_json');
    });
  }
  if ($('#ace_css').length) {
    $(function() {
      var editor = ace.edit("ace_css");
      editor.setTheme("ace/theme/monokai");
      editor.getSession().setMode("ace/mode/css");
      document.getElementById('ace_css');
    });
  }
  if ($('#ace_scss').length) {
    $(function() {
      var editor = ace.edit("ace_scss");
      editor.setTheme("ace/theme/monokai");
      editor.getSession().setMode("ace/mode/scss");
      document.getElementById('ace_scss');
    });
  }
  if ($('#ace_php').length) {
    $(function() {
      var editor = ace.edit("ace_php");
      editor.setTheme("ace/theme/monokai");
      editor.getSession().setMode("ace/mode/php");
      document.getElementById('ace_php');
    });
  }
  if ($('#ace_ruby').length) {
    $(function() {
      var editor = ace.edit("ace_ruby");
      editor.setTheme("ace/theme/monokai");
      editor.getSession().setMode("ace/mode/ruby");
      document.getElementById('ace_ruby');
    });
  }
  if ($('#ace_coffee').length) {
    $(function() {
      var editor = ace.edit("ace_coffee");
      editor.setTheme("ace/theme/monokai");
      editor.getSession().setMode("ace/mode/coffee");
      document.getElementById('ace_coffee');
    });
  }
})(jQuery);