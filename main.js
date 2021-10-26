document.addEventListener("mouseup", (event) => {
  if (document.getSelection().toString().length) {
    let selection = document.getSelection();
    let exactText = selection.toString();

    let span = document.createElement("SPAN");
    span.textContent = exactText;

    // // ------getRangeAt() 역할 추론하기-----------
    // let ranges = [];
    // for (let i = 0; i < selection.rangeCount; i++) {
    //   ranges[i] = selection.getRangeAt(i);
    //   console.log(ranges);
    // }
    // // ---------------------------------------

    let range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(span);

    let parentElement = selection.anchorNode.parentElement;

    let listByTagName = document.getElementsByTagName(a.tagName);

    let indexOfTags = 0;
    for (let i = 0; i < listByTagName.length; i++) {
      if (parentElement === listByTagName[i]) {
        indexOfTags = i;
      }
    }

    console.log(indexOfTags);
  }
});
