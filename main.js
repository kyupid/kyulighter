// document.addEventListener("mouseup", (event) => {
//   if (window.getSelection().toString().length) {
//     let exactText = window.getSelection().toString();
//     console.log(exactText);
//   }
// });

// document.addEventListener("selectionchange", (e) => {
//   console.log("Archor node - ", window.getSelection().anchorNode);
//   console.log("Focus Node - ", window.getSelection().toString());
// });

document.addEventListener("mouseup", function (e) {
  var txt = this.innerText;
  var selection = window.getSelection();
  var start = selection.anchorOffset;
  var end = selection.focusOffset;
  console.log(
    "start at postion",
    start,
    "in node",
    selection.anchorNode.wholeText
  );
  console.log(
    "stop at position",
    end,
    "in node",
    selection.focusNode.wholeText
  );
});
