import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Component({
  selector: 'app-modal',
  templateUrl: 'sleepiness-modal.component.html',
})
export class SleepinessModalComponent {
  //sets default to current date and time
  timeNow:Date = new Date();
  localTime:Date = new Date(this.timeNow.setHours(this.timeNow.getHours()-8));
  maxTime:string = this.localTime.toISOString().split('.')[0].slice(0, 16);
  timeLogged:string = this.localTime.toISOString();
  timeNew:Date;

  //sets default value to 1
  sleepinessValue:string = '1';
  sleepinessState:string = StanfordSleepinessData.ScaleValues[1];
  sleepNotes:string = '';

  constructor(private sleepinessModalCtrl:ModalController) {}
  
  //displays value on slider
  pinFormatter(value:number) {
    return `${value}`;
  }

  //displays sleepiness state according to value on slider
  onIonChange(value:number) {
    this.sleepinessState = StanfordSleepinessData.ScaleValues[value];
  }

  //dismisses sleepiness modal
  cancel() {
    return this.sleepinessModalCtrl.dismiss(null, 'cancel');
  }

  //saves sleepiness log
  save() {
    if (this.timeLogged == this.localTime.toISOString()) {
      this.timeNew = new Date(this.localTime.setHours(this.localTime.getHours()+8));
      this.timeLogged = this.timeNew.toISOString();
    }
    return this.sleepinessModalCtrl.dismiss([this.sleepinessValue, this.timeLogged], 'save,'+this.sleepNotes);
  }
}