export const getAverage = ([...arg]) => {
    const total = arg.reduce((prev, curr) => {
        prev += curr;
        return prev;
    }, 0);
    return Number((total / arg.length).toFixed(1));
};

export const getDecimal = (value: number) => {
    return Number(((value - Math.floor(value)) * 100).toFixed(1));
};

// round to number half. for example: 1.1, 1.2...1.8, 1.9 -> 1.5 is rounded to 1.5
export const roundToHalf = (value: number) => {
    return (Math.floor(value) * 2 + 1) / 2;
};

export const formatNumber = (value: number) => {
    return Number(value.toFixed(0)).toLocaleString().replaceAll(',', '.');
};
