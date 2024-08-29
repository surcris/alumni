export type RequestMessageType = {
    datetime: Date,
    emitter: string,
    content: string,
    recipient?: string
}