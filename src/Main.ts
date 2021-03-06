import {Meta} from "./classes/Meta.js";

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
                    "<span class='yellow-highlight'>" +
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

        const anchorNodeText = selection.anchorNode?.parentElement?.textContent as string;
        const focusNodeText = selection.focusNode?.parentElement?.textContent as string;
        const fullText = anchorNodeText + focusNodeText;

        console.log(fullText);
        console.log(fullText.indexOf(selectedText));
        console.log(selectedText.length);

        const startIndex = fullText.indexOf(selectedText);
        const endIndex = startIndex + selectedText.length - 1;

        const leftTextStartIndex = startIndex;
        const leftTextEndIndex = focusNodeText.length;

        const leftText = fullText.substring(0, startIndex);
        const rightText = fullText.substring(endIndex + 1, fullText.length - 10);

        const leftSelectedText = focusNodeText.substring(leftTextStartIndex, leftTextEndIndex);

        const rightSelectedText = anchorNodeText.substring(leftTextEndIndex, endIndex + 1);


        console.log("leftTexxt: ", leftText);
        console.log("rightText: ", rightText);
        console.log(leftSelectedText);

        const temp = "<span class='yellow-highlight'>" + rightSelectedText + '</span>'

        console.log(temp);
        // @ts-ignore
        selection.focusNode?.parentElement?.innerHTML = leftText + "<span class='yellow-highlight'>" + leftSelectedText + '</span>';

        const anchorInnerHTML = selection.anchorNode?.parentElement?.innerHTML as string;
        const a = anchorInnerHTML.substring(0, anchorInnerHTML.indexOf(rightSelectedText));

        console.log(a);
        // @ts-ignore
        selection.anchorNode?.parentElement?.innerHTML = a + temp + rightText;

        // @ts-ignore
        // selection.anchorNode?.parentElement?.innerHTML = '432';

        // insertSpanToSelectedText(selection, selectedText);

        const parentElement = selection.anchorNode?.parentElement as HTMLElement;
        const elements = document.getElementsByTagName(parentElement.tagName);

        const indexOfTags = getIndexOfTags(parentElement, elements);

        const textContent = elements.item(indexOfTags)?.textContent as string;
        const startOffset = textContent.indexOf(selectedText) as number;

        const selectedData = new Meta(
            parentElement.tagName,
            indexOfTags,
            selectedText,
            startOffset,
            textContent
        );

        setItemToLocalStorage(selectedData);
    }
});

function insertSpanToSelectedText(selection: Selection, selectedText: string): void {
    const span = document.createElement("SPAN");
    span.textContent = selectedText;
    span.setAttribute("class", "yellow-highlight")

    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(span);
}

function getIndexOfTags(parentElement: HTMLElement, elements: HTMLCollectionOf<Element>): number {
    let indexOfTags = 0;
    for (let i = 0; i < elements.length; i++) {
        if (parentElement === elements[i]) {
            indexOfTags = i;
        }
    }
    return indexOfTags;
}

function setItemToLocalStorage(selectedData: Meta) {
    let metaData: Meta[];
    if (window.localStorage.getItem("meta")) {
        const s = window.localStorage.getItem("meta") as string;
        metaData = JSON.parse(s);
    } else {
        metaData = [];
    }

    metaData.push(selectedData);

    const strLocationInfo = JSON.stringify(metaData);
    window.localStorage.setItem("meta", strLocationInfo);
}