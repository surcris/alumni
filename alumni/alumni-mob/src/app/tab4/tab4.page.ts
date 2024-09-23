import { Component, OnInit } from '@angular/core';
import { InternService } from '../core/services/intern.service';
import { take } from 'rxjs';
import { InternDTO } from '../core/internDto/internDto';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { ProfileComponentComponent } from '../profile/component/profile-component.component';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  intern: InternDTO | undefined;
  isModalOpen = false;
  isSupported = false;


  constructor(
    private internService: InternService, 
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  setOpen(isOpen: boolean) {
    this.retriveUserInfos()
    this.isModalOpen = isOpen;
  }

  private retriveUserInfos() {
    this.internService.getProfileData().pipe(take(1))
      .subscribe({
        next: (intern: InternDTO) => {
          this.intern = intern
        },
        error: (error: any) => { },
        complete: () => { }
      })
  }

  private retriveScannedUserInfos(id: string) {
    this.internService.findOne(id).pipe(take(1))
      .subscribe({
        next: (intern: InternDTO) => {
          this.intern = intern
          this.createModal()
        },
        error: (error: any) => { },
        complete: () => { }
      })
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.openModal(barcodes[0].rawValue)
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async openModal(userId: string) {
    this.retriveScannedUserInfos(userId)
  }

  private async createModal(){
    const modal = await this.modalCtrl.create({
      component: ProfileComponentComponent,
      componentProps: {
        intern: this.intern,
        isModalRequest: true
      }
    });
    modal.present();

  }


}
