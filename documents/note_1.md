먼저 문자를 선택하려면 [Document.getSelection()](https://developer.mozilla.org/en-US/docs/Web/API/Document/getSelection)함수와 [Selection](https://developer.mozilla.org/en-US/docs/Web/API/Selection) API에 대해 알아보면 된다.

간단하게 텍스트 가져오기.

```js
document.addEventListener("mouseup", (event) => {
  if (window.getSelection().toString().length) { 
    let exactText = window.getSelection().toString(); 
    console.log(exactText); // 
  }
});
```
_출처: https://stackoverflow.com/a/63628670/14058876_



mouseup 이벤트는 마우스를 release 했을때 생기는 이벤트이기 때문에 위에 있는 코드에서는 텍스트를 드래그해서 release 했을 경우에만 이벤트가 발생할 것이다.

반면에 이벤트들 중에 selectionchange 라는 이벤트가 있는데 이 이벤트를 listen 하면 selection이 바뀔때마다 이벤트가 발생한다.
```js
document.addEventListener("selectionchange", (e) => {
  console.log("Archor node - ", window.getSelection().anchorNode);
  console.log("Focus Node - ", window.getSelection().toString());
});

```
_출처: https://stackoverflow.com/a/68510738/14058876_

어쨋든 getSelection() 함수를 통해 셀렉된 텍스트를 가지고 올수 있다는 것이다.

selection의 인덱스를 가져오는 것도 있다. 예를 들면 `안녕하세요 012345 헬로우` 라는 텍스트에서 `012345` 를 드래그하면 selection.achorOffset = 6, selection.focusOffset = 11 이런식으로 가져온다.

```js
document.addEventListener('mouseup',function(e)
{
        var txt = this.innerText;
        var selection = window.getSelection();
        var start = selection.anchorOffset;
        var end = selection.focusOffset;
        console.log('start at postion', start, 'in node', selection.anchorNode.wholeText)
        console.log('stop at position', end, 'in node', selection.focusNode.wholeText)
});
```
_출처: https://stackoverflow.com/a/56574205/14058876_

근데 offset의 기준이 예를 들어서 `<body>텍스트</body>` 이런 식으로 사용하면 사용자가 추측할만한 offset의 값이 나오는데,
```html
<body>
    test
    테스트입니다
    안녕하셈
    아구아나
</body>
```
위 코드 처럼 되어있을 경우 test의 achorOffset의 값은 5이다. 앞에 공백이 총 5개 있기 때문이다.

이게 애매해서 어디에 어떻게 써먹을진 잘 모르겠다(?)

---
### 읽을거리

[Why using a selfmade highlighting function is a bad idea](https://stackoverflow.com/a/34614703/14058876)