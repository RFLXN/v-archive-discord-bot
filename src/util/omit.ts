const omitProperty = <T, K extends keyof T>(obj: T, property: K) => {
    const copied: Partial<T> = obj;

    delete copied[property];

    return copied as Omit<T, K>;
};

const omitProperties = <T, R = Partial<T>>(obj: T, keys: (keyof T)[]) => {
    const copied: Partial<T> = obj;

    keys.map((key) => {
        delete copied[key];
    });

    return copied as R;
};

export { omitProperty, omitProperties };
