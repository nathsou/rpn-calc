import {
    CALC_APPEND,
    CALC_CLEAR,
    CALC_TOGGLE_SIGN,
    CALC_PUSH,
    CALC_POP,
    CALC_OPERATE,
    CALC_SWAP,
    CALC_COPY_DOWN
} from "./actions";

const push = (x, state) => ({
    ...state,
    stack: [...state.stack, parseFloat(x)],
    should_push: false
});

const operators = {
    'add': (a, b) => a + b,
    'sub': (a, b) => a - b,
    'mul': (a, b) => a * b,
    'div': (a, b) => a / b,
    'pow': (a, b) => a ** b,
    'mod': (a, b) => a % b,
    'log': x => Math.log(x)
};

const getOperator = name => operators[name];

export function reducer(state = {
    current: '0',
    stack: [],
    should_push: false
}, action) {
    switch (action.type) {
        case CALC_APPEND:
            if (state.should_push) {
                return {
                    ...push(state.current, state),
                    current: action.text
                };
            }

            let current;

            if (action.text === '.') {
                current = `${state.current}${state.current.includes('.') ? '' : '.'}`;
            } else {
                current = `${state.current !== '0' ? state.current : ''}${action.text}`;
            }

            return {
                ...state,
                current
            };

        case CALC_CLEAR:
            return {
                ...state,
                current: '0',
                should_push: false
            };

        case CALC_TOGGLE_SIGN:
            return {
                ...state,
                current: state.current.charAt(0) === '-' ? state.current.substr(1) : `-${state.current}`
            };

        case CALC_PUSH:
            return {
                ...push(state.current, state),
                current: '0',
                should_push: false
            };

        case CALC_POP:
            if (parseFloat(state.current) !== 0) {
                return {
                    ...state,
                    current: '0',
                    should_push: false
                };
            } else {
                return {
                    ...state,
                    stack: state.stack.length > 0 ? state.stack.slice(0, -1) : state.stack,
                    current: state.stack.length === 0 ? '0' : state.stack[state.stack.length - 1],
                    should_push: false
                };
            }

        case CALC_OPERATE:
            const operator = getOperator(action.operation);
            if (operator.length === 1) {
                return {
                    ...state,
                    current: `${operator(parseFloat(state.current))}`,
                    should_push: true
                };
            } else if (state.stack.length + 1 >= operator.length) {
                const rest = state.stack.slice(-(operator.length - 1));
                const head = parseFloat(state.current);

                return {
                    ...state,
                    stack: state.stack.slice(0, -(operator.length - 1)),
                    current: `${operator(...rest, head)}`,
                    should_push: true
                };
            }
            break;

        case CALC_SWAP:
            if (state.stack.length > 0) {
                const a = state.stack[state.stack.length - 1];
                const b = parseFloat(state.current);
                return {
                    ...state,
                    stack: [...state.stack.slice(0, -1), b],
                    current: `${a}`,
                    should_push: false
                };
            }
            break;

        case CALC_COPY_DOWN:
            if (state.stack.length > 0) {
                return {
                    ...state,
                    current: `${state.stack[state.stack.length - 1]}`,
                    should_push: false
                };
            }
            break;

        default:
            return state;
    }

    return state;
}