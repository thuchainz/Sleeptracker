import { Injectable } from '@angular/core';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class SleepService {
	public static AllOvernightData:OvernightSleepData[] = [];
	public static AllSleepinessData:StanfordSleepinessData[] = [];
	private OvernightDataStorage:Storage | null = null;
	private SleepinessDataStorage:Storage | null = null;

	constructor(private overnightDataStorage:Storage, 
				private sleepinessDataStorage:Storage) {	
		
		this.init();
	}

	async init() {
		const overnightDataStorage = await this.overnightDataStorage.create();
		const sleepinessDataStorage = await this.sleepinessDataStorage.create();
		this.OvernightDataStorage = overnightDataStorage;
		this.SleepinessDataStorage = sleepinessDataStorage;
		this.loadOvernightData();
		this.loadSleepinessData();
		//this.OvernightDataStorage.clear();
		//this.SleepinessDataStorage.clear();
	}

	//loads pre-existing overnight data
	//by iterating through storage and adding all elements to AllOvernightData array
	private loadOvernightData() {
		this.OvernightDataStorage.forEach( (value) => {
			let start = new Date(value.split(',')[0]);
			let end = new Date(value.split(',')[1]);
			let notes = value.split(',')[2];
			let sleepData = new OvernightSleepData(start, end, notes);
			SleepService.AllOvernightData.push(sleepData);
		});
	}

	//loads pre-existing sleepiness data
	//by iterating through storage and adding all elements to AllSleepinessData array
	private loadSleepinessData() {
		this.SleepinessDataStorage.forEach( (value) => {
			let sleepValue = Number(value.split(',')[0]);
			let time = new Date(value.split(',')[1]);
			let notes = value.split(',')[2];
			let sleepData = new StanfordSleepinessData(sleepValue, time, notes);
			SleepService.AllSleepinessData.push(sleepData);
		});
	}

	//logs new overnight data
	public logOvernightData(sleepData:OvernightSleepData) {
		this.OvernightDataStorage.set(sleepData.id, sleepData.startEndNotesString());
		SleepService.AllOvernightData.push(sleepData);
	}

	//logs new sleepiness data
	public logSleepinessData(sleepData:StanfordSleepinessData) {
		this.SleepinessDataStorage.set(sleepData.id, sleepData.valueTimeNotesString());
		SleepService.AllSleepinessData.push(sleepData);
	}

	//removes overnight log
	public async removeOvernightLog(sleepData:OvernightSleepData) {
		this.OvernightDataStorage.remove(sleepData.id);
		SleepService.AllOvernightData.splice(SleepService.AllOvernightData.indexOf(sleepData), 1);
	}

	//removes sleepiness log
	public removeSleepinessLog(sleepData:StanfordSleepinessData) {
		this.SleepinessDataStorage.remove(sleepData.id);
		SleepService.AllSleepinessData.splice(SleepService.AllSleepinessData.indexOf(sleepData), 1);
	}

	//sorts overnight data by most recent
	get allOvernightData() {
		return SleepService.AllOvernightData.sort((a, b) => {
			return new Date(b.sleepStart).getTime() - new Date(a.sleepStart).getTime();
		  });
	}

	//sorts sleepiness data by most recent
	get allSleepinessData() {
		return SleepService.AllSleepinessData.sort((a, b) => {
			return new Date(b.loggedAt).getTime() - new Date(a.loggedAt).getTime();
		  });
	}
} 
