import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { BarcodeScanner, LensFacing } from '@capacitor-mlkit/barcode-scanning';
import { FilePicker } from '@capawesome/capacitor-file-picker';


@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage {

  segment = 'scan';

  scanResult = '';

  constructor(
    private modalController: ModalController
  ) { }

  async startScan() {
    const modal = await this.modalController.create({
    component: BarcodeScanningModalComponent,
    cssClass: 'barcode-scanning-modal',
    componentProps: { 
      formats: [],
      LensFacing: LensFacing.Back
     }
    });
  
    await modal.present();
  
  }

  async readBarcodeFromImage() {
      const { files } = await FilePicker.pickImages();

      const path = files[0]?.path;

      if(!path) return;

     const { barcodes } = await BarcodeScanner.readBarcodesFromImage({
        path,
        formats: []
      })

     this.scanResult = barcodes[0].displayValue;

  }

}
