```html
<ul class="generic-list">
  <li class="item">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam vero.
  </li>
  <li class="item">
    Laboriosam quaerat sapiente minima nam minus similique illum architecto et!
  </li>
  <li class="item">
    Incidunt vitae quae facere ducimus nostrum aliquid dolorum veritatis dicta!
  </li>
  <li class="item">
    Tenetur laborum quod cum excepturi recusandae porro sint quas soluta!
  </li>
</ul>
```

예를 들어 위와 같은 텍스트가 있을 때 각 li들의 첫 단어를 드래그해서 offset을 체크해보면 모두 0부터 시작한다.

이걸 구분 지어야 나중에 백엔드에서 정확히 하이라이트 된 텍스트를 가져올 수 있다.

하이라이트 하는 것은 드래그한 selection에 style만 주면 된다.

```js
document.addEventListener("mouseup", (event) => {
  if (window.getSelection().toString().length) {
    // -- 1 -- //
    let selection = window.getSelection();
    let exactText = selection.toString();

    // -- 2 -- //
    let span = document.createElement("SPAN");
    span.textContent = exactText;

    // -- 3 -- //
    let range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(span);
  }
});
```

_참고: https://stackoverflow.com/a/24691115/14058876_

방법은 이렇다:

1. selection의 텍스트를 가져온다.
2. 그 텍스트에 태그(span)를 붙여 할당한 변수를 만든다.
3. selection에서 range를 만들어 기존 content를 삭제하고 대신에 2번에서 만든걸 넣는다.

이 방법의 문제점은:

1. 이 하이라이트된 텍스트들을 구분할 "키"가 없기 때문에 저장해서 다시 꺼낼수 없다. 즉, 새로고침해서 다시 가져올 수가 없다.
2. 단순히 선택된 것을 replace하는 형태이기 때문에 기존에 있던 html이 망가진다.

![Oct-25-2021 22-28-12](https://user-images.githubusercontent.com/59721293/138704464-dc640f97-ef15-42c8-b0f7-5f7b2c438078.gif)

그래서 그 텍스트는 어떻게 구분할 것이며 구분했으면  
구분한 "키"를 어떻게 입력/보관/출력 할건지 잘 생각해서 구현해야함.
