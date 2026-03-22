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

const result = parser({ input: '/user/1234/details' });
console.log('Parsed AST:', result.ast);
// => { userid: 1234 }
