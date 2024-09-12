Using only lerp, multiplication and addition can be derived with only the numerical constants: -1, 0, and 1/2.

lerp can interestingly also act a ternary with little manipulation. To derive comparisons, pos(x) and neg(x) must be given.
This allows most if-else branches to be eleminated in favor of lerp.

Using lambdas, recursion, and ternary-lerp, it is possible to define a while-lerp. The only issue is that it ternary-lerp will always evaluate all its arguments causing a stack overflow.
To avoid this use a real ternary and pretend it is ternary-lerp.

For the reciprocal function, use all that came before to apply the bisect method to xy-1=0.

That is all that is needed to calculate the inverse of lerp.
