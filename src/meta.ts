class Meta {
    tagName: string;
    indexOfTags: number;
    selectedText: string;
    startOffset: number;
    textContent: string;

    constructor(tagName: string, indexOfTags: number, selectedText: string, startOffset: number, textContent: string) {
        this.tagName = tagName;
        this.indexOfTags = indexOfTags;
        this.selectedText = selectedText;
        this.startOffset = startOffset;
        this.textContent = textContent;
    }
}