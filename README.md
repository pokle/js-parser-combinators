# js-parser-combinators

Building blocks to write your own tiny and fast parsers.

<script src="https://embed.runkit.com" data-element-id="example1"></script>
<div id="example1">
const P = require('js-parser-combinators')

// A parser that can parse paths such as:
//    /user/1234
//    /user/1234/details

const parser = P.exhaustive(
    P.and(
        P.and(
            P.literal('/user/'),
            P.param('userid', /^\d+/)
        ),
        P.optional(P.literal('/details'))
    )
);

parser({ input: '/user/1234/details' }).ast
</div>
