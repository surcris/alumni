import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InfiniteScrollCustomEvent, ModalController, NavController } from '@ionic/angular';
import { WsChatService } from 'src/app/core/services/ws-chat-service'; 
import { SocketMessageType } from '../Dto/socket-message.type'; 
import { InternService } from 'src/app/core/services/intern.service';
import { InternType } from 'src/app/core/types/intern/inter-type'; 
import { MessagerieService } from 'src/app/core/services/messagerie.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent  implements OnInit {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;  // Accède au conteneur de chat
  public message: string = ''
  public recievedMessages: Array<SocketMessageType> = []
  public sendedMessages: Array<SocketMessageType> = []

  private _sid: string = ''
  public intern!: InternType
  public messages: Array<any> = []
  roomId!: string;
  
  constructor(
    private _modalController: ModalController,
    // private _wsService: WsChatService,
    private _mesService: MessagerieService,
    private _internService: InternService,
    private navCtrl: NavController
  ) { }

  ngAfterViewInit() {
    // this.scrollToBottom()
    // this._wsService.receiveMessage()
    //   .subscribe((filteredMessages: Array<any>) => {
    //     this.scrollToBottom()
    //     this.messages = filteredMessages
    //   })
  }
  ngOnInit() {
    this.intern = history.state.intern
    // this.roomId = history.state.intern;
    console.log('Room ID:', this.intern);
  }

  onSend() {
    // Vérifie si un message et un intern ID existent avant d'envoyer
    if (this.message && this.intern?.id) {
      console.log("Send")
      this._mesService.send(this.message, this.intern.id, this._mesService._id)
    }
  }

  onCancel(): void {
    this._modalController.dismiss()
    // this._wsService.disconnect()
    this.navCtrl.back()
  }

  // onIonInfinite(ev: any) {
  //   setTimeout(() => {
  //     (ev as InfiniteScrollCustomEvent).target.complete();
  //   }, 500);
  // }

  scrollToBottom(): void {
    try {
      
      const container = this.chatContainer.nativeElement;
      container.scrollTop = container.scrollHeight; 
      console.log("Scroll :",container.scrollTop )
    } catch (err) {
      console.error('Scroll failed:', err);
    }
  }





}