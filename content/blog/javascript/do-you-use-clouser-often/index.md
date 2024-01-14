---
title: 클로저를 자주 사용하시나요?
date: "2022-09-18 23:18:53"
tags: ["javascript"]
---

최근 몇 달 동안 [모던 자바스크립트 Deep Dive](http://www.yes24.com/Product/Goods/92742567) 책을 통해 스터디를 진행하고 있는데, 이번에 공부했던 내용 중 하나가 `클로저`였다. 같이 클로저에 대해 얘기하면서 나는 이렇게 얘기했던 것 같다.

> "클로저를 공부하다보면 개념 자체가 그렇게 어렵지는 않은데, 자주 사용하지 않다보니까 익숙하지가 않은 것 같아요."
> <br>
> 이 문장에서 이상한 점이 느껴지시나요??
> <br>
> 힌트를 하나 말하면, 나는 React와 Next.js를 주 스택으로 사용하는 프론트엔드 개발자이다.

정답은 나는 **클로저를 매우 매우 매우 자주 사용한다**는 것이다. React를 사용하면서 React Hooks도 사용하고 있기 때문이다. 그리고 React Hooks에서는 클로저가 사용되고 있다. 나는 useState와 같은 hooks를 사용하면서 useState가 어떻게 동작하는지에 대해 의문을 가지지 않았기 때문에 hooks에서 클로저를 사용한다는 점을 알지 못했고, 그렇기에 ‘클로저를 자주 사용하지 않아요'라고 말했던 것이다. (물론 클로저를 직접적으로 사용하지 않는다는 점에서는 맞지만, 지금의 요지는 내가 React의 useState를 쓰면서도 클로저를 사용하고 있지 않았다고 생각했다는 점이다. )

그래서 오늘은 클로저에 대해서 정리하고, React hook에서 클로저가 어떻게 사용되고 있는지를 정리해보려고 한다.

## 클로저 Clouser

클로저는 JS의 고유 개념이 아니라서 ECMAScript 사양에는 등장하지 않는데, MDN에서는 클로저를 `함수와 함수가 선언된 렉시컬 환경과의 조합` 이라고 정의한다.

DeepDive 책에서는 **외부 함수보다 중첩 함수가 더 오래 유지되는 경우 중첩 함수는 이미 생명주기가 종료한 외부 함수의 변수를 참조할 수 있는데, 여기서 중첩함수를 클로저**라고 설명한다. 다시 말하자면, 모든 중첩 함수가 MDN의 클로저 정의처럼 함수와 함수가 선언된 렉시컬 환경과의 조합인데, 그 중에서도 외부 함수보다 중첩 함수가 더 오래 유지되는 경우에서의 중첩 함수만 클로저라고 보는 것이다.

### 클로저와 렉시컬 환경

```tsx
const x = 1;

function outer() {
  const x = 10;

  const inner = function () {
    console.log(x);
  };
  return inner;
}

const innerFunc = outer();
innerFunc(); // 10
```

`outer` 함수를 호출하면 중첩 함수 `inner를` 반환하고 `outer` 함수의 생명 주기가 종료되면서 `outer` 함수의 실행 컨텍스트가 제거된다. 하지만 `innerFunc`를 호출하면 `outer` 함수의 지역 변수 `x`의 값인 10이 출력된다. 즉, 중첩 함수 `inner`가 생명 주기가 종료한 외부함수 `outer`의 변수를 참조할 수 있기 때문이다.

여기서 `outer` 함수의 실행 컨텍스트는 생명 주기가 종료될 때 실행 컨텍스트 스택에서 제거되지만 `outer` 함수의 렉시컬 환경까지 소멸하는 것은 아니라는 것을 알 수 있다.

#### 사라지지 않는 변수 x를 사라지게 하고 싶다면?

```tsx
function outer() {
  const x = 10;

  const inner = function () {
    console.log(x);
  };
  return inner;
}

let innerFunc = outer();
innerFunc(); // 10
```

위 예제에서 변수 `x`는 전역 컨텍스트가 종료되기 전까지 GC(Garbage Collection)의 대상이 되지 않아 사라지지 않는 좀비와 같은 변수가 된다. 더 이상 필요가 없는데, 계속 살아있다면 메모리에 영향이 갈 수도 있기 때문에 변수 `x`를 GC의 대상으로 만들어 사라지게 하려면 어떻게 해야될까?

변수 `x`가 살아있는 이유는 중첩 함수 `inner`에서 변수 `x`를 계속 참조하고 있기 때문이다. 따라서 중첩 함수 `inner`가 더 이상 변수 `x`를 참조하지 않도록 중첩 함수를 실행하는 함수 `innerFunc`에 `outer`가 아닌 다른 값을 대입하면 된다.

#### 아래 예제에서 함수 `inner`는 클로저일까?

```tsx
function outer() {
  const x = 10;

  const inner = function () {
    console.log(x);
  };
  inner();
}

outer();
```

중첩 함수 `inner`는 외부 함수 `outer` 안에 있기 때문에 변수 `x`를 출력할 때 `outer`의 렉시컬 스코프를 참조하여 `x`를 10으로 출력할 것이다. 그렇다면 중첩 함수가 외부 함수의 변수를 참조하고 있으니까 위 예제에서 중첩 함수 `inner`는 클로저라고 부를 수 있을까?

답은 ‘아니다’ 이다. 중첩 함수 `inner`는 외부 함수 `outer` 안에서 정의되고 실행되었지만, 외부 함수 `outer` 바깥으로 나오지 않았다. 즉, 중첩 함수 `inner`가 외부 함수 `outer`보다 더 오래 유지되지 않았기 때문에 이는 클로저라고 부를 수 없는 것이다.

## React Hook과 클로저

React에서는 state의 데이터가 변경되면 render함수가 자동으로 다시 호출되어서 변경된 state 값이 화면에 나타날 수 있도록 리렌더링이 된다.

React Hook에서는 `useState`라는 Hook을 통해서 component의 state 값을 관리한다. 즉, `useState`는 component 내에서 수시로 변경되는 state 값을 담고 있다. 이전 상태와 현 상태의 변경이 있는지를 감지하기 위해서는 함수가 실행되었을 때 이전 상태에 대한 정보를 가지고 있어야 하는데, React는 이 과정에서 클로저를 사용한다.

### useState에서 클로저는 어떻게 사용되고 있을까?

> [이 글](https://www.netlify.com/blog/2019/03/11/deep-dive-how-do-react-hooks-really-work/)에 있는 예제를 가져왔습니다.

```tsx
const MyReact = (function () {
  let _val; // hold our state in module scope
  return {
    render(Component) {
      const Comp = Component();
      Comp.render();
      return Comp;
    },
    useState(initialValue) {
      _val = _val || initialValue;
      function setState(newVal) {
        _val = newVal;
      }
      return [_val, setState];
    },
  };
})();

function Counter() {
  const [count, setCount] = MyReact.useState(0);
  return {
    click: () => setCount(count + 1),
    render: () => console.log("render:", { count }),
  };
}

let App;
App = MyReact.render(Counter); // render: { count: 0 }
App.click();
App = MyReact.render(Counter); // render: { count: 1 }
```

외부 함수 MyReact는 중첩 함수 `render`와 `useState`를 리턴한다. 외부 함수 MyReact 안에 있는 변수 `_val`는 중첩 함수 `useState`를 사용할 때마다 참조되기 때문에 죽지 않고 살아 있을 것이다. 즉, 중첩 함수 `useState`는 클로저이다.

따라서 MyReact의 `render`를 이용해서 Counter를 렌더링하면, MyReact의 `useState`가 실행된다. 따라서 변수 `_val`는 0이 된다. 이 후, `App.click()` 을 실행함으로써 `_val` 값이 1로 업데이트된다. 그 다음, 다시 MyReact의 `render`를 이용해서 Counter를 렌더링하면 MyReact의 `useState`가 실행되는데, `_val`가 1로 업데이트되었기 때문에 이제 변수 `_val`는 1이 된다.

## ✏️ 새롭게 배운 점

지금까지 useState Hook을 사용하면서 그냥 당연하게 state값이 변한다고 생각했는데, 그게 아니었다. useState는 클로저로써 외부함수의 렉시컬 환경에 있는 변수를 변경시키고, 리렌더링이 일어날 때 변경된 변수의 값을 state에 업데이트해줌으로써 변경된 state를 확인할 수 있게 한다.

처음에 React를 사용할 때 useState를 쓰면서 내 예상처럼 동작하지 않아 당황한 경우가 있었는데, 그게 바로 아래와 같은 경우였다.

> 🤔 useEffect 안에서 `setState` 를 통해 `state` 값에 1을 더했는데, `state` 값을 출력하면 왜 여전히 0일까

```tsx
const [state, setState] = useState(0);

useEffect(() => {
  setState(state + 1);
  console.log(state); // 0
}, []);
```

useState의 setState는 state를 직접적으로 수정하는 것이 아니라, useState 외부함수의 어떤 변수를 수정한 것이다. 그리고 그 변수는 리렌더링이 될 때 state값에 업데이트 된다. 위 경우에서 useEffect가 끝났을 때 리렌더링되기 때문에 `console.log(state);` 를 실행하는 시점에는 어딘가에 저장되어 있는 변수는 +1이 되었을 지라도 state는 변하지 않았다. 따라서 실행 값이 여전히 0이 되는 것이다.

<br>

React를 쓰면서, 그리고 위와 같은 이상한 현상을 겪으면서도 그 당시에는 그런가보다 하고 넘어갔었는데, 이번에 클로저 개념을 공부하면서 예상하지 못했던 useState hook의 동작 원리에 대해서 생각해볼 수 있었고, 덕분에 항상 기본이 가장 중요하다는 점을 알고 지나가는 것 같다.

## Ref.

- [JavaScript 클로저(Closure)](https://hyunseob.github.io/2016/08/30/javascript-closure/)
- [Closure | PoiemaWeb](https://poiemaweb.com/js-closure)
- [useState Hook과 클로저](https://velog.io/@ggong/useState-Hook%EA%B3%BC-%ED%81%B4%EB%A1%9C%EC%A0%80)
- [Web: useState의 동작 원리와 함정](https://medium.com/hcleedev/web-usestate%EC%9D%98-%EB%8F%99%EC%9E%91-%EC%9B%90%EB%A6%AC%EC%99%80-%ED%95%A8%EC%A0%95-7b4825c16b9)
- [Deep dive: How do React hooks really work?](https://www.netlify.com/blog/2019/03/11/deep-dive-how-do-react-hooks-really-work/)
