document.addEventListener("mouseup", (event) => {
  if (window.getSelection().toString().length) {
    let selection = window.getSelection();
    let exactText = selection.toString();

    let span = document.createElement("SPAN");
    span.textContent = exactText;

    // ------getRangeAt() 역할 추론하기-----------
    let ranges = [];
    for (let i = 0; i < selection.rangeCount; i++) {
      ranges[i] = selection.getRangeAt(i);
      console.log(ranges);
    }
    // ---------------------------------------

    let range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(span);
  }
});

// document.addEventListener("selectionchange", (e) => {
//   console.log("Archor node - ", window.getSelection().anchorNode);
//   console.log("Focus Node - ", window.getSelection().toString());
// });

$(document).ready(function () {});

// document.addEventListener("mouseup", function (e) {
//   var txt = this.innerText;
//   var selection = window.getSelection();
//   var start = selection.anchorOffset;
//   var end = selection.focusOffset;
//   console.log(
//     "start at postion",
//     start
//     // "in node",
//     // selection.anchorNode.wholeText
//   );
//   console.log(
//     "stop at position",
//     end
//     // "in node",
//     // selection.focusNode.wholeText
//   );
// });
