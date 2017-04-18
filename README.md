# js-parser-combinators

Building blocks to write your own tiny and fast parsers.

[![CircleCI](https://circleci.com/gh/pokle/js-parser-combinators.svg?style=svg&circle-token=e1ed0f751c2b44469e534ee8d709112ef5732245)](https://circleci.com/gh/pokle/js-parser-combinators)

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
[Run this example on RunKit](https://runkit.com/pokle/js-parser-combinators-example1)
