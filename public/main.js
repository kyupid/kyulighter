"use strict";
document.addEventListener("mouseup", (event) => {
    var _a, _b, _c;
    if ((_a = document.getSelection()) === null || _a === void 0 ? void 0 : _a.toString().length) {
        const selection = document.getSelection();
        const selectedText = selection.toString();
        const span = document.createElement("SPAN");
        span.textContent = selectedText;
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(span);
        const parentElement = (_b = selection.anchorNode) === null || _b === void 0 ? void 0 : _b.parentElement;
        const listByTagName = document.getElementsByTagName(parentElement.tagName);
        let indexOfTags = 0;
        for (let i = 0; i < listByTagName.length; i++) {
            if (parentElement === listByTagName[i]) {
                indexOfTags = i;
            }
        }
        const elements = document.getElementsByTagName(parentElement.tagName);
        const textContent = (_c = elements.item(indexOfTags)) === null || _c === void 0 ? void 0 : _c.textContent;
        const startOffset = textContent === null || textContent === void 0 ? void 0 : textContent.indexOf(selectedText);
        console.log(startOffset);
    }
});
