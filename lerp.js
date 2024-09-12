let print = (x) => {console.log(x); return x} // for debug

let lerp = (t, a, b) => a + t*(b - a)
let id = (x) => lerp(x,0,1)
let EPSILON = Number.EPSILON

//BASIS for +,* : -1, 0, and 1/2
let NEGONE = -1
let ZERO = 0
let HALF = 1/2

let mult = (x,y) => lerp(x, ZERO, y)
let ONE = mult(NEGONE, NEGONE)

let double = (x) => lerp(NEGONE, x, ZERO)
let TWO = double(ONE)

let negate = (x) => lerp(TWO,x,ZERO)
let add = (x,y) => lerp(HALF, double(x), double(y))
let minus = (x,y) => add(x, negate(y))

//BASIS for logic : pos(x), neg(x)
let pos = (x) => x > ZERO
let neg = (x) => x < ZERO

let TRUE = ONE
let FALSE = ZERO

let ternary = (t,a,b) => lerp(t,b,a)
let left = (a,b) => ternary(TRUE, a, b)
let right = (a,b) => ternary(FALSE, a, b)
let not = (x) => ternary(x, FALSE, TRUE)
let and = (x,y) => mult(x,y)
let or = (x,y) => not(and(not(x), not(y)))

let LT = (x,y) => pos(minus(y,x))
let GT = (x,y) => pos(minus(x,y))
let EQ = (x,y) => and(not(LT(x,y)), not(GT(x,y)))

let abs = (x) => ternary(pos(x), x, negate(x))
let sign = (x) => ternary(pos(x), ONE, NEGONE)

let min = (x,y) => ternary(LT(x,y), x, y)
let max = (x,y) => ternary(GT(x,y), x, y)


let whileLerp = (condition, f, x) => {
    let g = (y) => condition(y) ? g(f(y)) : y // pretend like this is lerp-ternary. need real ternary for early exit.
    return g(x)
}

let reciprocal = (x, e=EPSILON) => {
    let signOfX = sign(x)
    x = abs(x)

    let f = (y) => minus(mult(x,y), ONE) // solving y for zero using bisection method will give the reciprocal of x
    let min = ZERO
    let max = whileLerp(r => neg(f(r)), double, ONE) // give upper bound

    let recursion = ([r, min, max]) => {
        min = ternary(pos(f(r)), min, r)
        max = ternary(pos(f(r)), r, max)

        r = lerp(HALF, min, max)
        return ([r, min, max])
    }
    let condition = ([r, min, max]) => GT(minus(max, min), double(mult(r,e)))
    let [y] = whileLerp(condition, recursion , [lerp(HALF, min, max), min, max])

    return mult(y, signOfX)
}

let div = (x,y) => mult(x, reciprocal(y))
let inverseLerp = (y, a, b) => div(minus(y, a), minus(b, a))

console.log(inverseLerp(lerp(0.2, 2, 50), 2, 50)) // should output 0.2
