```js
const elements = document.getElementsByTagName("LI");

console.log(elements);
```

위 코드는 Web API 의 HTMLCollection API를 호출한다.

아래 처럼 잘 찾아서 콘솔에 나오고 길이도 4라고 나온다.

![2021-10-27_20-49-11](https://user-images.githubusercontent.com/59721293/139059985-95648e26-7d37-4e3d-bc54-8dfb7162b27b.jpg)

```js
const elements = document.getElementsByTagName("LI");

console.log(elements.length);
```

그대로 프로퍼티를 가져오려고 하면 0 이라고 출력된다.

이유는 DOM으로 요소들이 렌더링 되기 전에 JS 가 먼저 실행되기 때문이다. 그 말은 스크립트를 body 뒤에 호출하거나 jQuery의 `$(document).ready` 나 `document.addEventLister(DOMContentLoaded", function() { })` 를 사용하면 된다.

_참고: https://stackoverflow.com/a/30212541/14058876_

```js
$(document).ready(() => {
  const elements = document.getElementsByTagName("LI");
  console.log(elements.length);
});
```

다시 확인 해보면 잘 나오는 것을 확인할 수 있다.

---

[이전 TIL](https://velog.io/@kyukim/20211026)에서는 부모 요소의 태그이름과 그 태그의 인덱스 등을 가져왔다.

백엔드에 이런 고유한 위치정보들이 저장하고 다시 가져올 때 어떻게 그 요소를 셀렉해야할까?

HTMLCollection API 메서드 중에서 `item()`이 있다. 배열에서 `elements[index]`나 `get()`과 똑같이 동작한다.

`document.getElementsByTagName`을 먼저 검색하고 저장했던 index로 `item(index)`로 Node를 가져온다.

원래 계획은 이 Node에서 저장해놨던 start and end offset 으로 찾으려 했으나,

만약에 그 Node에 하이라이트가 생길수록 offset이 플레인 텍스트였을때와 달리 계속 변경되는 점이 구현을 어렵게 할것 같았다.

그래서 바꾼 계획은 그 태그안에 있는 플레인 텍스트의 길이 즉 textContent.length를 가져와서 offset을 저장할때 Selection에서 가져오는 것이 아니라 textContent.length에서 가져오는 것이다.

> 참고로 textContent에서 다른 태그들도 가져올것 같아서 테스트를 해봤으나 태그들을 뺀 플레인 텍스트만 가져왔다.
>
> [MDN의 설명](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)에 더 자세하게 나와있다.

예를 들어서 아래와 같은 텍스트가 있다.

```
Laboriosam quaerat sapiente minima nam minus similique illum architecto et!
```

이 문자열의 길이는 75이다. 만약에 두번째 단어인 `quaerat`를 선택했으면 startOffset은 11이고 endOffset은 17이 되는 것이다.

이렇게 가져와서 마지막으로 저장했던 텍스트와 일치하는지 체크하고 true이면 하이라이트를 칠하는 것이다.
