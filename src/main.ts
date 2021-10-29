if (window.localStorage.getItem('meta')) {
  let metaData: Array<Meta>;
  const s = window.localStorage.getItem('meta') as string;
  metaData = JSON.parse(s);
  metaData.forEach(data => { // selection을 어떻게 만들지?
    // const elements = document.getElementsByTagName(data.tagName);
    // const textContent = elements.item(data.indexOfTags)?.textContent as string;

  });
}

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
    const textContent = elements.item(indexOfTags)?.textContent as string;
    const startOffset = textContent.indexOf(selectedText) as number;

    let selectedData = new Meta(
    parentElement.tagName,
      indexOfTags,
      selectedText,
    startOffset,
    textContent
     );

    let metaData: Array<Meta>;
    if (window.localStorage.getItem('meta')) {
      const s = window.localStorage.getItem('meta') as string;
      metaData = JSON.parse(s);
    } else {
      metaData = [];
    }

    metaData.push(selectedData);

    const strLocationInfo = JSON.stringify(metaData);
    window.localStorage.setItem('meta', strLocationInfo);
  }
});



