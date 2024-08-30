export type ChatMessageType = {
    // userId of the emitter
    emitter: string

    // userId of the Recipient
    recipient: string | undefined

    datetime: Date
    content: string
}