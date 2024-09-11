import { Injectable, Logger, Post } from "@nestjs/common";
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

    private _clients: Map<string,any> = new Map<string, any>()

    @SubscribeMessage('message')
    async chat(@MessageBody() data: RequestMessageType): Promise<any> {
        Logger.log(`Received ${JSON.stringify(data)}`)
        // Find the recipient
        const recipientSocket: any = this.userToSocket(data.recipient)

        const payload: any = {
            datetime: new Date(),
            content: data.content
        }
        Logger.log(`Emit : ${JSON.stringify(payload)} to ${recipientSocket.id}`)

        recipientSocket.emit('message', payload)
    }

    
    handleConnection(client: any, ...args: any[]): void {
        const { sockets } = this.wsServer.sockets
        const userId = client.handshake.query.userId
                    
        Logger.log(`Connection was established for ${userId}`)

        this._clients.set(userId, sockets.get(client.id))
    }

    handleDisconnect(client: any) {
        Logger.log(`Client ${client.handshake.query.userId} was disconnected`)
        const userId = client.handshake.query.userId
        this._clients.delete(userId)
    }

    userToSocket(userId: string): SocketUserType {
        return this._clients.get(userId)

    }

    usersToSocket() {
        console.log(this._clients.size)
        this._clients.forEach((value, key) => {
            console.log(`Clé: ${key}, Valeur: ${value}`);
          });
        return this._clients

    }

    
}