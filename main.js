$(document).ready(function () {
  $(document).bind("mouseup", mouseUp());
});

function getSelectionText() {
  var t = "";
  if (window.getSelection) {
    t = window.getSelection();
  } else if (document.getSelection) {
    t = document.getSelection();
  } else if (document.selection) {
    t = document.selection.createRange().text;
  }
  return t;
}

function mouseUp() {
  var st = getSelectionText();
  if (st != "") {
    alert("You selected:\n" + st);
  }
}
