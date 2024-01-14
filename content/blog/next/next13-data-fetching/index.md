---
title: Next13의 Data Fetching
date: "2023-07-23 23:31:53"
thumbnail: ./cover.png
tags: ["next"]
---

[이전 글](https://2dowon.com/next/next13-server-component-and-client-component/)에서 얘기했듯이, Next13에서 데이터를 가져오는 Component는 Server Component로 구현하는 것을 추천한다. 물론 반드시 그래야 하는 것은 아니고, Client Component에서 데이터를 가져오고 싶다면 Next12에서 했던 것처럼 SWR이나 React Query와 같은 라이브러리를 이용하면 된다.

하지만 Next13에서 데이터를 가져올 때 사용하는 fetch 함수를 이용하면 자동으로 요청의 중복을 제거해주고, 캐시된 값을 재사용하는 기능을 제공하고 있어 해당 글에서는 Client Component일 경우일지라도 Client Component를 다시 Server Component로 감싸서 데이터를 가져오는 방식을 사용해보려고 한다.

## Server Component에서 data fetching하기

[Server Component에서 data fetching하는 예제 코드](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#async-and-await-in-server-components)

```typescript
async function getData() {
  const res = await fetch("https://api.example.com/...");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const data = await getData();

  return <main></main>;
}
```

Server Component에서 데이터를 가져오는 방법은 async와 await을 사용하면 되는데 위처럼 굉장히 심플하다. 단, TypeScript에서 async Server Component를 사용하려면 `TypeScript` 버전 `5.1.3` 이상 그리고 `@types/react` 버전은 `18.2.8` 이상이여야 타입 에러가 발생하지 않는다.

## Client Component에서 fetch를 이용해 data fetching하기

Client Component에서 fetch를 이용해 데이터를 가져온다고 했지만, 사실 그건 불가능하다. 그렇다면 Client Component에서는 반드시 SWR이나 React Query와 같은 라이브러리를 이용해야 할까? 맨 처음에 얘기했듯이 방법이 그것만 있는 것은 아니다.

Client Component에서는 fetch를 사용하지 못하므로 Client Component를 감싸는 Server Component를 하나 만든다. 그 다음 Server Component에서 데이터를 fetch하고 가져온 데이터를 Client Component로 내려주면 된다. 약간 불필요한 Wrapper Component가 생기기는 하지만 다른 라이브러리를 사용하지 않고 Next13의 fetch 함수를 이용하는 방법은 내 생각에는 아직 이것 밖에 없는 것 같다. (혹시라도 더 좋은 방법이 있다면 댓글 부탁드립니다~)

```typescript
async function getData() {
  const res = await fetch('https://api.example.com/...')

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function ServerComponent() {
  const data = await getData()

  return <ClientComponent data={data}/>
}

function ClientComponent(data) {
  ...
}
```

Server Component에서 데이터를 가져오는 예제 코드를 살짝 바꾼건데, 위처럼 실제로는 ClientComponent만 있어도 되지만 이를 감싸는 ServerComponent를 만들어 데이터를 가져오고 ClientComponent에 데이터를 내려주면 ClientComponent에서 굳이 데이터를 가져올 필요가 없으므로 라이브러리를 사용하지 않아도 되는 것이다.

## (+) 효율적으로 fetch 함수 사용하기

Next12에서 데이터를 가져오기 위해 `axios`를 사용할 때는 `axios`의 `create`를 이용해 instance를 만드는 방식으로 공통으로 사용하는 부분들을 사용할 때마다 정의하는 않을 수 있었다.

Next13에서는 데이터를 가져올 때 `fetch`를 사용하는데, `fetch`에는 `axios`의 `create`와 같은 기능이 없어 어떻게 할까 하다 `fetch`를 감싸는 함수를 하나 만들기로 했다. 그 함수가 바로 아래 `request` 함수이다.

```typescript
import { BASE_URL } from "utils";

interface IRequestOptions extends RequestInit {
  query?: string | Record<string, any> | URLSearchParams | string[][];
}

export function request<TResponse>(
  path: string,
  options: IRequestOptions
): Promise<TResponse> {
  const {
    headers,
    query = null,
    method = "GET",
    body,
    ...extraOptions
  } = options;

  const reqOptions = {
    method,
    headers: {
      "Content-Type": "application/json",
      // ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    body,
    next: { revalidate: 60 * 60 }, // 1시간
    ...extraOptions,
  };

  if (body) {
    reqOptions.body = typeof body === "object" ? JSON.stringify(body) : body;
  }

  let queryString = "";
  if (query) {
    queryString = new URLSearchParams(query).toString();
    queryString = queryString && `?${queryString}`;
  }

  return fetch(`${BASE_URL}${path}${queryString}`, reqOptions)
    .then((response) => response.json())
    .then((data) => data as TResponse);
}
```

BASE_URL은 따로 const로 관리하고, 기본적으로는 path와 options를 props으로 전달받는다. options 안에는 일단 query를 받을 수 있고, 그 외에 기본으로 설정된 options와 다른 options를 설정하고 싶을 때 넘겨주면 된다.

또한 fetch 함수는 generic type을 지원하지 않는다. 하지만 이를 감싸는 request 함수를 만들었기 때문에 request 함수가 generic type을 받아 응답 데이터의 타입을 정할 수 있다는 점에서도 fetch를 감싸는 커스텀 함수를 만들 이유는 충분하다.

# Ref.

- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#async-and-await-in-server-components)
- [How to Use fetch with TypeScript](https://www.newline.co/@bespoyasov/how-to-use-fetch-with-typescript--a81ac257)
