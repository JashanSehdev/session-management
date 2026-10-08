import {  MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import {Server, Socket} from 'socket.io'
import * as cookie from 'cookie';
import { JwtService } from '@nestjs/jwt';
import { Body } from '@nestjs/common';
@WebSocketGateway({
  cors: {

    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'],
    credentials: true            
  }
})
export class SessionsGateway {
  constructor(
    private readonly jwtService :JwtService
  ){}

  @WebSocketServer()
  server : Server

  async handleConnection(client: Socket) {
    try{
      const rawCookie = client.handshake.headers.cookie
      if (!rawCookie){
        console.log('Cookie not found')
        client.disconnect()
        return;
      } 
      const cookies = cookie.parseCookie(rawCookie);
      const token = cookies.access_token

      if (!token) {
        console.log('connection rejected, token not found')
        client.disconnect();
        return
      }
      const token_data = await this.jwtService.verify(token)
      const userId = token_data.id
      const sessionId = token_data.session

      if (!sessionId && !userId) {
        console.log('connection rejected, missing data from cookie')
        client.disconnect();
        return
      }

      await client.join(`session:${sessionId}`);
      await client.join(`user:${userId}`)

      client.data = {sessionId, userId}

      console.log(`user connected with userId ${userId} joined session:${sessionId}`)
    } catch (error) {
      console.error('Error parsing handshake cookies:', error);
      client.disconnect();
    } 
    
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }


  handleCodeAlert(@Body() body : {userId : number, code : number} ){
    const {userId, code} = body
    this.server.to(`user:${userId}`).emit('sessionCode', code)
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() payload: any): string {
    console.log(payload)
    return 'Hello world!';
  }

  // handleMessage(client: any, payload: any): string {
  //   return 'Hello world!';
  // }
  emitSessionFull(client: Socket, payload : any):string {
    return 'payload'
  }
  
}
