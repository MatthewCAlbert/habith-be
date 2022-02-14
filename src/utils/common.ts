import dayjs from 'dayjs'

/**
 * Strip object keys with empty or undefined values
 */
export function stripObjectKeys (src: Record<string, any>) {
    const newObj: Record<string, any> = {}
    for (const key of Object.keys(src)) {
        if (!src?.[key] || src?.[key] === '' || src?.[key] === undefined) { continue }
        newObj[key] = src?.[key]
    }
    return newObj
}

export function datetimeToDateOnly(date: Date | string) {
    return dayjs(dayjs(date).format('YYYY-MM-DD')).toDate()
}