export function numFormat(x, max_length = 10) {
    if (!Number.isFinite(x)) return null;
    if (`${x}`.length < max_length) return `${x}`;
    const x_cpy = x;
    const max_length_cpy = max_length;
    const neg = x < 0;
    x = Math.abs(x);
    // take '-' into account
    max_length -= neg ? 1 : 0;
    // ensure max_length is an integer
    max_length = Math.floor(max_length);

    let str;
    const [int_part, frac_part] = [`${Math.floor(x)}`, `${(x % 1)}`.slice(2)];
    const len_frac = max_length - (int_part.length + 1);

    if (int_part.length === max_length || max_length === int_part.length + 1) {
        str = int_part;
    } else if (len_frac >= 0) {
        const rounded_frac = parseFloat(parseFloat('0.' + frac_part).toFixed(len_frac));
        str = `${parseFloat(int_part) + rounded_frac}`;
        str = str.endsWith('.') ? str.slice(0, -1) : str;
    } else {
        const exp = x.toExponential();
        const exp_part = exp.substr(exp.indexOf('e'));
        if (max_length < exp_part.length + 1) {
            const min_rep = max_length <= int_part.length ? int_part : `${exp.charAt(0)}${exp_part}`;
            throw new Error(
                `Cannot represent '${x_cpy}' with less than ${min_rep.length} characters, ` +
                `minimal approximation is '${min_rep}', got max_length = ${max_length_cpy}`
            );
        }
        //const exp_len = `e+${Math.floor(Math.log10(x))}`.length;
        const m = exp.substr(0, exp.length - exp_part.length);
        const precision = max_length - (exp_part.length + 2);
        let rounded = precision !== -1 ? parseFloat(m).toFixed(precision) : m;
        //return rounded;
        rounded = rounded.substr(0, max_length - exp_part.length);
        rounded = rounded.endsWith('.') ? rounded.slice(0, -1) : rounded;
        str = rounded.substr(0, max_length - exp_part.length) + exp_part;
    }

    return `${neg ? '-' : ''}${str}`;
}

export function format(x) {
    if (`${x}`.substr(-1) === '.') return `${x}`;

    x = parseFloat(x);

    if (!Number.isFinite(x)) {
        if (Math.abs(x) === Infinity) {
            return `${x}`.replace('Infinity', '∞');
        }

        return 'math error';
    }

    return numFormat(x, 12);
}