document.addEventListener("mouseup", (event) => {
  if (document.getSelection()?.toString().length) {
    const selection = document.getSelection() as Selection;
    const selectedText = selection.toString();

    const span = document.createElement("SPAN");
    span.textContent = selectedText;

    // // ------getRangeAt() 역할 추론하기-----------
    // let ranges = [];
    // for (let i = 0; i < selection.rangeCount; i++) {
    //   ranges[i] = selection.getRangeAt(i);
    //   console.log(ranges);
    // }
    // // ---------------------------------------

    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(span);

    const parentElement = selection.anchorNode?.parentElement as HTMLElement;

    const listByTagName = document.getElementsByTagName(parentElement.tagName);

    let indexOfTags = 0;
    for (let i = 0; i < listByTagName.length; i++) {
      if (parentElement === listByTagName[i]) {
        indexOfTags = i;
      }
    }

    console.log(
      parentElement.tagName,
      indexOfTags,
      selection.anchorOffset,
      selection.focusOffset,
      selectedText
    );

    const elements = document.getElementsByTagName(parentElement.tagName);
    const textContent = elements.item(indexOfTags)?.textContent;

    const startOffset = textContent?.indexOf(selectedText);
  }
});

