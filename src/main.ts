document.addEventListener("mouseup", (event) => {
  if (document.getSelection()?.toString().length) {
    const selection = document.getSelection() as Selection;
    const selectedText = selection.toString();

    const span = document.createElement("SPAN");
    span.textContent = selectedText;

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

    const elements = document.getElementsByTagName(parentElement.tagName);
    const textContent = elements.item(indexOfTags)?.textContent;
    const startOffset = textContent?.indexOf(selectedText);

    let m = {
      tagName: parentElement.tagName,
      indexOfTags: indexOfTags,
      textContent: textContent,
      selectedText: selectedText,
      startOffset: startOffset
    };
    const metaData = JSON.stringify(m);

    window.localStorage.setItem('hs', metaData);
  }
});



