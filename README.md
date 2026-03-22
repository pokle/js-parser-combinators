# js-parser-combinators

Building blocks to write your own tiny and fast parsers.

[![CI](https://github.com/pokle/js-parser-combinators/actions/workflows/ci.yml/badge.svg)](https://github.com/pokle/js-parser-combinators/actions/workflows/ci.yml)

```js
const P = require('js-parser-combinators')

// A parser that can parse paths such as:
//    /user/1234
//    /user/1234/details

const parser = P.exhaustive(
    P.and(
        P.and(
            P.literal('/user/'),
            P.param('userid', /^\d+/, parseInt)
        ),
        P.optional(P.literal('/details'))
    )
);

parser({ input: '/user/1234/details' }).ast
// => { userid: 1234 }
```
[Try it live on StackBlitz](https://stackblitz.com/github/pokle/js-parser-combinators/tree/master/stackblitz-demo?file=index.js)
