import { Logger } from "@nestjs/common";
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { RequestMessageType } from "./dto/request-message.type";
import { ResponseConnectionType } from "./dto/response-connection.type";
import { SocketUserType } from "./types/socket-user.type";
import { Socket } from "ngx-socket-io";

@WebSocketGateway(
    {
        cors: {
            origin: '*'
        },
        transports: ['polling', 'websocket']
    }
)
export class ChatEventGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    wsServer: Server

    private _clients: Map<string, SocketUserType> = new Map<string, SocketUserType>()

    @SubscribeMessage('message')
    async chat(@MessageBody() data: RequestMessageType): Promise<any> {
        Logger.log(`Received ${JSON.stringify(data)}`)
        // Find the recipient
        const recipientSocket: SocketUserType = this._userToSocket(data.recipient)

        const payload: any = {
            emitter: data.recipient,
            recipient: data.emitter,
            datetime: new Date(),
            content: data.content
        }
        Logger.log(`Emit : ${JSON.stringify(payload)} to ${recipientSocket.socket.id}`)

        recipientSocket.socket.emit('message', payload)
    }

    @SubscribeMessage('identity')
    async identity(@MessageBody() identity: ResponseConnectionType): Promise<any> {
        return identity
    }

    @SubscribeMessage('userId:Identity')
    async setUserId(@MessageBody() user: any): Promise<any> {
        Logger.log(`Store DNS for : ${JSON.stringify(user)}`)
        this._clients.get(user.socketId).userId = user.id
    }

    handleConnection(client: any, ...args: any[]): void {
        const { sockets } = this.wsServer.sockets

        Logger.log(`Connection was established for ${client.id}`)

        sockets.forEach((socket: any) => {
            if (socket.id === client.id) {
                this._clients.set(client.id, {socket})
            }
        })
        

        const identity: ResponseConnectionType = {
            datetime: new Date(),
            socketId: client.id
        }

        this._clients.get(client.id).socket.emit('identity', identity)
    }

    handleDisconnect(client: any) {
        Logger.log(`Client ${client.id} was disconnected`)
        this._clients.delete(client.id)
    }

    private _userToSocket(user: string): SocketUserType {
        let recipient: SocketUserType
        this._clients.forEach((value: SocketUserType, sid: string) => {
            if (value.userId === user) {
                recipient = value
                return
            }
        })
        return recipient
    }
}