const responseFormat = (success, meta, data) => {
    return {
        meta: {
            success,
            ...meta,
        },
        data,
    };
};

export default responseFormat;
