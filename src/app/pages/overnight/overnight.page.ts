import { Component, OnInit, ViewChild } from '@angular/core';
import { SleepService } from '../../services/sleep.service';
import { OvernightSleepData } from 'src/app/data/overnight-sleep-data';
import { AlertController, IonContent } from '@ionic/angular';

@Component({
  selector: 'app-overnight',
  templateUrl: './overnight.page.html',
  styleUrls: ['./overnight.page.scss'],
})
export class OvernightPage implements OnInit {
  @ViewChild(IonContent) content:IonContent;

  constructor(private sleepService:SleepService,
              private alertController:AlertController) { }

  ngOnInit() {}

  //details alert controls
  async presentDetails(start:string, end:string, notes:string) {
    const alert = await this.alertController.create({
      header: 'From ' + start + ' to ' + end,
      message: notes,
      buttons: ['OK'],
    });
    await alert.present();
  }

  //delete alert controls
  async presentDelete(sleepData:OvernightSleepData) {
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes',
          role: 'confirm'
        }
      ]
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
    if (role == 'confirm') {
      this.sleepService.removeOvernightLog(sleepData);
    }
  }

  //slows down scroll to top
  scrollToTop() {
    this.content.scrollToTop(500);
  }
  
  get allOvernightData() {
		return this.sleepService.allOvernightData;
	}
}
