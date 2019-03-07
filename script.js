// 1. Promise
const users = [
    {id: 1, name: 'Bob'},
    {id: 2, name: 'Joe'},
    {id: 3, name: 'Don', groupId: 1},
    {id: 4, name: 'Kally'},
    {name: 'Alex'},
    {name: 'John'},
];
const groups = [
    {id: 1, title: 'First Group'},
    {id: 2, title: 'Last Group'},
];
function resolveAfter(obj, ms) {
    return new Promise(
        function (resolve) {
            setTimeout(() => {
                resolve(obj);
            }, ms);
        });
}
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
async function addSelectedGrouptoUserId(users, group) {
    let a = await resolveAfter(users, 500)
        .then((res) => {
            return res;
        })
        .then((res) => {
            let userId = res.map(el => {
                return {
                    id: (!el.id) ? getRandomInt(4, 20) : el.id,
                    name: el.name,
                    groupId: (!el.groupId) ? getRandomInt(1, group.length) : el.groupId,
                }
            })
            return userId;
        })
        .then(res=>console.log(res))
}
addSelectedGrouptoUserId(users, groups);


// 2. Итератор
const integers = () => {
    let index = 0;
    return {
        next: () => {
            return {
                value: index++,
                done: false
            }
        }
    }
}
var take = (to, iter) => {
    return {
        [Symbol.iterator]: function () {
            let current = iter.next().value;
            return {
                next() {
                    if (current <= to) {
                        return {
                            done: false,
                            value: current++
                        };
                    } else {
                        return {
                            done: true
                        };
                    }
                }

            }
        }
    }
};
const iter = integers();
for (let i of take(10, iter)) {
    console.log(i)
}
;

// 3.memoization
const sum = (...args) => args.reduce((sum, current) => sum + current);
const multiply = (x, y) => x * y;
const memoization = (fn) => {
    const cache = {};
    let fnName = fn.name;
    return (...args) => {
        let argString = args.join('');
        let key = JSON.stringify(fnName + argString);
        if (key in cache) {
            console.log('взято из кеша');
            return cache[key];
        } else {
            console.log('вычислено');
            let result = fn(...args);
            cache[key] = result;
            return result;
        }
    };
}
// TEST
const memSum = memoization(sum);
const memMyltiply = memoization(multiply);
console.log(memSum(4, 1));
console.log(memSum(4, 1));
console.log(memSum(4, 1));
console.log(memSum(4, 1));
console.log(memSum(5, 1));
console.log(memSum(9, 1));
console.log(memMyltiply(1, 2));
console.log(memMyltiply(6, 2));
console.log(memMyltiply(5, 2));
console.log(memMyltiply(1, 2));

const memoize = (f) => {
    if (f instanceof Function) {
        // only memoize functions of arity 1, otherwise return function
        if (f.length == 0 || f.length > 1) return f;
        var fn = (...x) => {
            if (fn.memoizer.values[x] == null) {
                fn.memoizer.values[x] = f(...x);
            }
            return fn.memoizer.values[x];
        };

        fn.memoizer = {values: []};
        return fn;
    } else {
        return f;
    }
}

// TEST
console.log('sum'+memoize(sum));
console.log('sum'+memoize(sum)(4,5,6,7));
console.log('sum'+ memoize(sum)(4,5,6,7));
console.log('multiply' + memoize(multiply));
console.log('multiply' + memoize(multiply)(6, 2));
console.log('multiply' + memoize(multiply)(3, 2));
console.log('multiply' + memoize(multiply)(6, 2));
console.log('multiply' + memoize(multiply)(4, 2));

