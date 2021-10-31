class Meta {
  tagName: string;
  indexOfTags: number;
  selectedText: string;
  startOffset: number;
  textContent: string;

  constructor(
    tagName: string,
    indexOfTags: number,
    selectedText: string,
    startOffset: number,
    textContent: string
  ) {
    this.tagName = tagName;
    this.indexOfTags = indexOfTags;
    this.selectedText = selectedText;
    this.startOffset = startOffset;
    this.textContent = textContent;
  }
}

if (window.localStorage.getItem("meta")) {
  let metaData: Meta[];
  const s = window.localStorage.getItem("meta") as string;
  metaData = JSON.parse(s);

  window.addEventListener("load", function () {
    metaData.forEach((data) => {
      let elements = document.getElementsByTagName(
        data.tagName
      ) as HTMLCollection;
      let item = elements.item(data.indexOfTags) as Element;

      let innerHTML = item.innerHTML as string;

      const index = innerHTML.indexOf(data.selectedText);

      if (index >= 0) {
        innerHTML =
          innerHTML.substring(0, index) +
          "<span>" +
          innerHTML.substring(index, index + data.selectedText.length) +
          "</span>" +
          innerHTML.substring(index + data.selectedText.length);
        item.innerHTML = innerHTML;
      }
    });
  });
}

document.addEventListener("mouseup", () => {
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

    let metaData: Meta[];
    if (window.localStorage.getItem("meta")) {
      const s = window.localStorage.getItem("meta") as string;
      metaData = JSON.parse(s);
    } else {
      metaData = [];
    }

    metaData.push(selectedData);
    console.log(metaData);

    const strLocationInfo = JSON.stringify(metaData);
    window.localStorage.setItem("meta", strLocationInfo);
  }
});
