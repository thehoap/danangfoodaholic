export const getAverage = ([...arg]) => {
    const total = arg.reduce((prev, curr) => {
        prev += curr;
        return prev;
    }, 0);
    return total / arg.length;
};
