import { Component, OnInit, ViewChild } from '@angular/core';
import { SleepService } from '../../services/sleep.service';
import { StanfordSleepinessData } from 'src/app/data/stanford-sleepiness-data';
import { AlertController, IonContent } from '@ionic/angular';

@Component({
  selector: 'app-sleepiness',
  templateUrl: './sleepiness.page.html',
  styleUrls: ['./sleepiness.page.scss'],
})
export class SleepinessPage implements OnInit {
  @ViewChild(IonContent) content:IonContent;

  constructor(private sleepService:SleepService,
              private alertController:AlertController) { }

  ngOnInit() {}

  //details alert controls
  async presentDetails(summary:string, notes:string) {
    const alert = await this.alertController.create({
      header: summary,
      message: notes,
      buttons: ['OK'],
    });
    await alert.present();
  }

  //delete alert controls
  async presentDelete(sleepData:StanfordSleepinessData) {
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
      this.sleepService.removeSleepinessLog(sleepData);
    }
  }

  //slows down scroll to top
  scrollToTop() {
    this.content.scrollToTop(500);
  }

  get allSleepinessData() {
    return this.sleepService.allSleepinessData;
	}
}
