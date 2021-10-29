

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

    let selectedData = {
          tagName: parentElement.tagName,
          indexOfTags: indexOfTags,
          textContent: textContent,
          selectedText: selectedText,
          startOffset: startOffset
        };

    let metaData: Array<Object>; // TODO: 정확한 타입
    if (window.localStorage.getItem('meta')) {
      const s = window.localStorage.getItem('meta') as string;
      metaData = JSON.parse(s);
    } else {
      metaData = [];
    }

    metaData.push(selectedData);
    console.log(metaData)

    const strLocationInfo = JSON.stringify(metaData);
    window.localStorage.setItem('meta', strLocationInfo);
  }
});



