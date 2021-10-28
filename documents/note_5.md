> **Today I Learend**
> 텍스트의 위치 정보 다시 생각 / Object is possibly null

textContent에서 선택한 startOffset, endOffset을 가져오려면 어떤 정보가 필요한가?

일단 full text between the tags of selected text, selected text, ..

selected text가 full text에 여러개 있으면 어떤 걸 잡아야할지 어떻게 구분할까?

공백으로 텍스트들을 구분해서 각 word들을 인덱스로 삼고, 그 word가 몇번째에 있는건지 찾아낸다.

1. full text의 word들을 공백 단위로 키밸류형식으로.
2. 이때 찾으려는 word의 순서를 저장한다.
3. 같은 word가 있는 것을 고려해서 같은 word가 있는지 체크한다.
4. 같은 word가 있으면 그 word 들 중에 몇번째인지 저장한다 같은 word가 없어도 그렇게 저장하자.

정리하자면 공백기준으로
첫번째는 full text에서 찾으려는 word의 순서.
두번째는 full text에서 찾으려는 word의 같은 것들 사이에서 순서.

근데 이렇게 했을 때 생각해보니 공백포함해서 텍스트를 선택하면 말이 안된다😱

---

다시 정리해서 드래그했을때 저장해야하는 것은...

1. parentElement.tagName -> 어떤 태그가 감싸고 있는지 알아야함
2. indexOfTags -> 그 태그는 똑같은 태그들 중에 몇번째인가?
   1,2 번을 가지고
3. textContent -> 하이라이트한 full text를 가져온다
4. selectedText -> 선택된 텍스트
   3,4 번을 가지고
5. startOffset 선택된 텍스트의 첫번째 글자가 전체텍스트에서 몇번째인지
6. (option) endOffset은 굳이 필요없을듯? indexOf로 찾으면 일치하는거만 찾을거고 언제부터 시작하는거만 알면 찾을수있잖아
   _참고: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf_

```typescript
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

    console.log(startOffset);
  }
});
```

하지만 다시 생각해보니 자꾸 여러가지 예외 상황이 많이 발생한다.

예를 들어서 p태그와 또 다른 p태그를 길게 같이 선택하면 어떻게 처리해야할까?

일단 되는대로 완성부터 해보자. 다음은 가져온 값들을 객체로 만들어서 로컬스토리지에 넣기.

---

### Object is possibly null

타입스크립트에서 Object is possibly null 이라는 에러가 나올 땐?
타입스크립트는 말그대로 리턴값이 특정 타입이 아니고, null이 나올 가능성이 있으면 저런 에러를 나타냄.
뒤에 `?` 마크를 넣어주거나 타입을 assert하면 된다.
`?`는 삼향연산자에서 false일땐 null이라고 생각하면 된다.

예시) `getSomething() ? LovelyObject : null;` 이 때 조건문이 확실히 `LovelyObject`를 리턴한다는 보장을 할 수 없을때말이다.
저 삼향연산자가 곧 `var foo = getSomething() as LovelyObject` 이거다.

내 코드에 적용하면 밑에처럼 사용 가능하다.

```typescript
document.addEventListener("mouseup", (event) => {
  if (document.getSelection()?.toString().length) {
    let selection = document.getSelection() as Selection;
   ...
   ...
   // code //
   ...
   ...
```

_참고: https://kyounghwan01.github.io/blog/TS/object-null/#%E1%84%8B%E1%85%A8%E1%84%89%E1%85%B5_
