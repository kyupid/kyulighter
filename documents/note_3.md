각 위치에 대한 값을 고유하게 설정해야한다.

> **Serialization**
>
> 객체나 자료구조를 네트워크나 스토리지를 통한 전송에 적합한 형식으로 변환하는 프로세스이다.
>
> 예를 들면 자바스크립트에서 JSON.stringify()를 이용해서 객체를 JSON string 으로 serialize 할 수 있다.

> **Local storage**
>
> 로컬 스토리지는 키-밸류 형태로 데이터를 저장할 수 있는 저장소이다.
>
> 로컬스토리지에 위치에 대한 정보를 저장하고 있어야한다. 그래서 브라우저를 닫아도 하이라이트가 남아있게 말이다.

HTML에서 텍스트의 위치에 대해서 고유성을 주려면 최대한 여러 요소들을 합쳐야 할것이다.

참고하고 있는 web-highlighter에서는 이를 구분하기위해서 다양하게 가져오는 것 같다.

1. parent tag name
2. parent index
3. end and start textOffset
4. uuid
5. 선택된 텍스트 문자열

오늘은 1번과 2번 가지고 오는 것을 배웠다.

selection API 에서 parentElement를 어떻게 가지고 오는지 검색하고 이리저리 방황했다.

결국 깨달은건 MDN에서 함수들을 대충 쭉 훑어보며 어떤게 필요할지 생각해보는 게 가장 빠른 방법이라는 것이다.

```js
document.addEventListener("mouseup", (event) => {
  if (document.getSelection().toString().length) {
    let selection = document.getSelection();
    let exactText = selection.toString();

    let span = document.createElement("SPAN");
    span.textContent = exactText;

    let range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(span);

    let parentElement = selection.anchorNode.parentElement;

    let listByTagName = document.getElementsByTagName(parentElement.tagName);

    let indexOfTags = 0;
    for (let i = 0; i < listByTagName.length; i++) {
      if (parentElement === listByTagName[i]) {
        indexOfTags = i;
      }
    }

    console.log(parentElement.tagName, indexOfTags);
  }
});
```

어쨋든 selection에 있는 함수를 통해서 결국 모두 접근할 수 있었다.  
태그의 인덱스가 필요한 것은 같은 부모 요소 내에 똑같은 태그가 여러개 있으면 구분할수가 없기때문이다.  
여기에 더해서 start and end offset 과 실제 하이라이트하는 텍스트까지 같이 가지면 완전 고유한 값이 될 것이다.  
이 고유한 위치 값을 로컬스토리지에 넣고 혹은 크롬 익스텐션으로 만들땐 각 페이지 URL 정보까지 같이 담으면 될것같다.
