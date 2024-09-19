import { Injectable, Logger, Post } from "@nestjs/common";
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { RequestMessageType } from "./dto/request-message.type";
import { ResponseConnectionType } from "./dto/response-connection.type";
import { SocketUserType } from "./types/socket-user.type";
import { Socket } from "ngx-socket-io";
import { AppService } from "src/app.service";
import { ConversationService } from "src/conversation/conversation.service";

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  transports: ['polling', 'websocket'],
})
export class ChatEventGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  wsServer: Server;

  
  private _clients: Map<string, any> = new Map<string, any>();

  constructor(private conversationService:ConversationService){

  }

  @SubscribeMessage('message')
  async chat(@MessageBody() data: any): Promise<any> {
    Logger.log(`Received ${JSON.stringify(data)}`);
    // Find the recipient
    // const recipientSocket: any = this.userToSocket(data.recipient);

    this.conversationService.create(data)

    const payload: any = {
      datetime: new Date(),
      content: data.content,
    };
    // Logger.log(`Emit : ${JSON.stringify(payload)} to ${recipientSocket.id}`);

    // recipientSocket.emit('message', payload);
  }

  handleConnection(client: any, ...args: any[]): void {
    const { sockets } = this.wsServer.sockets;
    const userId = client.handshake.query.userId;

    Logger.log(`Connection was established for ${userId}`);

    this._clients.set(userId, sockets.get(client.id));
    this.wsServer.emit('userConnected', { userId });
    this.wsServer.emit('connectedUsers', this.usersToSocket());
  }

  handleDisconnect(client: any) {
    Logger.log(`Client ${client.handshake.query.userId} was disconnected`);
    const userId = client.handshake.query.userId;
    this._clients.delete(userId);
    this.wsServer.emit('userDisconnected', { userId });
    this.wsServer.emit('connectedUsers', this.usersToSocket());
  }

  @SubscribeMessage('getAllConnectedUsers')
  handleGetAllConnectedUsers() {
    const users = this.getAllConnectedUsers();
    this.wsServer.emit('connectedUsers', users);
  }
  userToSocket(userId: string): SocketUserType {
    return this._clients.get(userId);
  }

  usersToSocket() {
    console.log(this._clients.size);
    let tabUserId: Array<string> = [];
    this._clients.forEach((value, key) => {
      console.log(`Clé: ${key}, Valeur: ${value}`);
      tabUserId.push(key);
    });
    return tabUserId;
  }

  getAllConnectedUsers() {
    return Array.from(this._clients.values());
  }
}