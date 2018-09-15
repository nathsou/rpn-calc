import * as actions from './Redux/actions';

export default function attachCalculatorToKeyboard(dispatch) {
    document.addEventListener('keydown', ({
        key
    }) => {
        if ('.0123456789'.includes(key)) {
            dispatch(actions.append(key));
            return;
        }

        switch (key.toUpperCase()) {
            case 'C':
            case 'BACKSPACE':
                dispatch(actions.pop());
                break;

            case 'ENTER':
                dispatch(actions.push());
                break;

            case '+':
                dispatch(actions.operate('add'));
                break;

            case '-':
                dispatch(actions.operate('sub'));
                break;

            case '*':
            case 'X':
                dispatch(actions.operate('mul'));
                break;

            case '/':
            case ':':
                dispatch(actions.operate('div'));
                break;

            case 'DEAD':
            case '^':
                dispatch(actions.operate('pow'));
                break;

            case 'M':
            case '%':
                dispatch(actions.operate('mod'));
                break;

            case 'L':
                dispatch(actions.operate('log'));
                break;

            case 'S':
                dispatch(actions.swap());
                break;

            case 'T':
                dispatch(actions.toggleSign());
                break;

            case 'D':
                dispatch(actions.copyDown());
                break;
            default:
                break;
        }

    });
}