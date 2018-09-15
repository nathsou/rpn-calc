export const CALC_APPEND = 'CALC_APPEND';
export const CALC_CLEAR = 'CALC_CLEAR';
export const CALC_TOGGLE_SIGN = 'CALC_TOGGLE_SIGN';
export const CALC_PUSH = 'CALC_PUSH';
export const CALC_POP = 'CALC_POP';
export const CALC_OPERATE = 'CALC_OPERATE';
export const CALC_SWAP = 'CALC_SWAP';
export const CALC_COPY_DOWN = 'CALC_COPY_DOWN';

export const clear = () => ({
    type: CALC_CLEAR
});

export const append = text => ({
    type: CALC_APPEND,
    text
});

export const push = () => ({
    type: CALC_PUSH
});

export const pop = () => ({
    type: CALC_POP
});

export const operate = operation => ({
    type: CALC_OPERATE,
    operation
});

export const toggleSign = () => ({
    type: CALC_TOGGLE_SIGN
});

export const swap = () => ({
    type: CALC_SWAP
});

export const copyDown = () => ({
    type: CALC_COPY_DOWN
});