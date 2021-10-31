> **Today I Learned**
> 1. 로컬 스토리지에는 string만 들어갈 수 있다는 점.
> 2. 구현 고민

아래 코드 처럼 스트링으로 변환해야 로컬스토리지에 들어간다.
```typescript
    let m = {
      tagName: parentElement.tagName,
      indexOfTags: indexOfTags,
      textContent: textContent,
      selectedText: selectedText,
      startOffset: startOffset
    };
    const metaData = JSON.stringify(m);

    window.localStorage.setItem('meta', metaData);
```

---


하이라이트 된 객체들을 배열로 저장하기 위해서 아래와 같이 코드를 만들었다.

로컬 스토리지에 저장할 때 페이지에 데이터가 있으면 기존에 있는 것을 배열로 가지고오고 아니면 새로 초기화하도록 한다.

다시 배열을 스트링으로 변환해서 넣는다.
```typescript
    let metaData: Meta[];
    if (window.localStorage.getItem('meta')) {
      const s = window.localStorage.getItem('meta') as string;
      metaData = JSON.parse(s);
    } else {
      metaData = [];
    }

    metaData.push(selectedData);

    const strLocationInfo = JSON.stringify(metaData);
    window.localStorage.setItem('meta', strLocationInfo);
```

---
import/export시에 컴파일된 JS파일에서 exports is not defined 라는 에러가 뜬다.

JS에서 import / export 할시에 문제인데, 해결방법은 아래 링크와 같다.

https://stackoverflow.com/a/43473448/14058876
```typescript
export class Meta {}
```
```typescript
import { Meta } from "./meta";
```

---

```typescript
if (window.localStorage.getItem('meta')) {
  let metaData: Meta[];
  const s = window.localStorage.getItem('meta') as string;
  metaData = JSON.parse(s);
  metaData.forEach(data => { // selection을 어떻게 만들지?
  });
}
```
페이지 최초 로드시에 로컬스토리지에 데이터가 있으면 가져와서 하이라이트 하려고 한다.

문제는 텍스트 정보를 어떻게 가져오냐다.

필요한 텍스트를 하이라이트 하기 위해 내가 필요하다고 생각했던 정보들을 모두 저장해놨지만 어떻게 구체적으로 쓸진 모르겠다.

최초 하이라이트 할때는 `window.getSelection()` 을 통해 Selection API 를 이용해서 무엇을 선택하고 있는지 알 수 있는데 아무것도 없는 상태에서는 어떻게 특정 텍스트를 선택해야할까 무엇을 이용해야할까?

Selection을 가지고 있는 데이터를 가지고 new연산자를 통해 만들 수 있나?

https://github.com/kyupid/kyulighter
