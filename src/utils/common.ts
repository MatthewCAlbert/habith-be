
export function reduceObject (src: Record<string, any>) {
    const newObj: Record<string, any> = {}
    for (const key of Object.keys(src)) {
        if (!src?.[key] || src?.[key] === '' || src?.[key] === undefined) { continue }
        newObj[key] = src?.[key]
    }
    return newObj
}
