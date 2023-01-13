/* from the Stanford Sleepiness Scale */
/* https://web.stanford.edu/~dement/sss.html */

import { SleepData } from './sleep-data';

export class StanfordSleepinessData extends SleepData {
	public static ScaleValues = [undefined,//Sleepiness scale starts at 1
	'Feeling active, vital, alert, or wide awake.', //1
	'Functioning at high levels, but not at peak. Able to concentrate.', //2
	'Awake, but relaxed. Responsive but not fully alert.', //3
	'Somewhat foggy, let down.', //4
	'Foggy. Losing interest in remaining awake. Slowed down.', //5
	'Sleepy, woozy, fighting sleep. Prefer to lie down.', //6
	'No longer fighting sleep, sleep onset soon. Having dream-like thoughts.']; //7

	loggedValue:number;
	notes:string;

	constructor(loggedValue:number, loggedAt:Date, notes:string) {
		super();
		this.loggedValue = loggedValue;
		this.loggedAt = loggedAt;
		this.notes = notes;
	}

	summaryString(): string {
		return this.loggedValue + ": " + StanfordSleepinessData.ScaleValues[this.loggedValue];
	}

	dateString():string {
		return this.loggedAt.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
	}

	timeString():string {
		return " " + this.loggedAt.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
	}

	valueTimeNotesString():string {
		return this.loggedValue + "," + this.loggedAt + "," + this.notes;
	}
}
