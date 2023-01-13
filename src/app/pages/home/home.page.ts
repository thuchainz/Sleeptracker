import { Component } from '@angular/core';
import { SleepService } from '../../services/sleep.service';
import { OvernightSleepData } from '../../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../../data/stanford-sleepiness-data';
import { OvernightModalComponent } from '../../components/overnight-modal.component';
import { SleepinessModalComponent } from '../../components/sleepiness-modal.component';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
	today = new Date();
	sleepStart:Date;
	sleepEnd:Date;
	sleepStarted:boolean = false;

	sleepinessValue:number;
	sleepinessTime:Date;
	sleepNotes:string;
	sleepinessNotes:string;

	constructor(private sleepService:SleepService, 
				private overnightModalCtrl:ModalController, 
				private sleepinessModalCtrl:ModalController,
				private toastCtrl:ToastController) {}

	ngOnInit() {}

	//overnight sleep modal controls
	async openOvernightModal(sleepStarted:boolean) {
		const overnightModal = await this.overnightModalCtrl.create({
			component: OvernightModalComponent,
			componentProps: {sleepStarted}
		});
		overnightModal.present();

		const { data, role } = await overnightModal.onWillDismiss();
		if (role.split(',')[0] == 'save') {
			if (!sleepStarted) {
				this.sleepStart = new Date(data);
				this.sleepStarted = true;
				this.presentToast('Goodnight!', 'start');
			}
			else {
				this.sleepEnd = new Date(data);
				this.sleepStarted = false;
				this.sleepNotes = role.split(',')[1]
				this.sleepService.logOvernightData(new OvernightSleepData(this.sleepStart, this.sleepEnd, this.sleepNotes));
				this.presentToast('Sleep logged!', 'end');
			}
		}
	}

	//sleepiness modal controls
	async openSleepinessModal() {
		const sleepinessModal = await this.sleepinessModalCtrl.create({
			component: SleepinessModalComponent,
		});
		sleepinessModal.present();

		const { data, role } = await sleepinessModal.onWillDismiss();
		if (role.split(',')[0] == 'save') {
			this.sleepinessValue = data[0]*1;
			this.sleepinessTime = new Date(data[1]);
			this.sleepinessNotes = role.split(',')[1];
			this.sleepService.logSleepinessData(new StanfordSleepinessData(this.sleepinessValue, this.sleepinessTime, this.sleepinessNotes));
			this.presentToast('Sleepiness logged!', 'sleepiness');
		}
	}

	//toast to confirm action
	async presentToast(message:string, type:string) {
		const toast = await this.toastCtrl.create({
			message: message,
			duration: 2500,
			position: 'top',
			buttons: [
				{
					text: 'Undo',
					role: type,
					handler: () => { this.presentUndoToast('Log removed!') }
				}]
		});
		await toast.present();
		const { role } = await toast.onDidDismiss();
		this.undoLog(role);
	}

	//toast to confirm action undone
	async presentUndoToast(message:string) {
		const toast = await this.toastCtrl.create({
			message: message,
			duration: 1500,
			position: 'top',
		});
		await toast.present();
	}

	//removes most recent log
	private undoLog(role:string) {
		if (role == 'start') {
			this.sleepStart = new Date();
			this.sleepStarted = false;
		}
		else {
			if (role == 'end') {
				this.sleepService.removeOvernightLog(this.sleepService.allOvernightData[0])
			}
			else if (role == 'sleepiness') {
				this.sleepService.removeSleepinessLog(this.sleepService.allSleepinessData[0]);
			}
		}
	}
}
