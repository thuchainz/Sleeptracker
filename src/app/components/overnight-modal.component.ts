import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: 'overnight-modal.component.html',
})
export class OvernightModalComponent {
  //sets default to current date and time
  timeNow:Date = new Date();
  localTime:Date = new Date(this.timeNow.setHours(this.timeNow.getHours()-8));
  maxTime:string = this.localTime.toISOString().split('.')[0].slice(0, 16);
  sleepInput:string = this.localTime.toISOString();
  timeNew:Date;
  
  sleepNotes:string = '';
  sleepStarted:boolean;

  constructor(private overnightModalCtrl:ModalController) {}

  //dismisses overnight modal
  cancel() {
    return this.overnightModalCtrl.dismiss(null, 'cancel');
  }

  //saves overnight sleep log
  save() {
    if (this.sleepInput == this.localTime.toISOString()) {
      this.timeNew = new Date(this.localTime.setHours(this.localTime.getHours()+8));
      this.sleepInput = this.timeNew.toISOString();
    }
    return this.overnightModalCtrl.dismiss(this.sleepInput, 'save,'+this.sleepNotes);
  }
}