export function getTime(time: number) {
    const date = new Date(time)
    return date.getHours() + '' + date.getMinutes()
}

export function isEmptyObject(obj: object) {
    return !Object.keys(obj).length
}
