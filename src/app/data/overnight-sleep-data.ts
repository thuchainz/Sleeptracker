import { SleepData } from './sleep-data';

export class OvernightSleepData extends SleepData {
	sleepStart:Date;
	sleepEnd:Date;
	notes:string;

	constructor(sleepStart:Date, sleepEnd:Date, notes:string) {
		super();
		this.sleepStart = sleepStart;
		this.sleepEnd = sleepEnd;
		this.notes = notes;
	}

	summaryString():string {
		var sleepStart_ms = this.sleepStart.getTime();
		var sleepEnd_ms = this.sleepEnd.getTime();

		// Calculate the difference in milliseconds
		var difference_ms = sleepEnd_ms - sleepStart_ms;
		    
		// Convert to hours and minutes
		return Math.floor(difference_ms / (1000*60*60)) + " hours, " + Math.floor(difference_ms / (1000*60) % 60) + " minutes";
	}

	dateString():string {
		return this.sleepStart.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
	}

	startString():string {
		return " " + this.sleepStart.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
	}

	endString():string {
		return " " + this.sleepEnd.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
	}

	startEndNotesString():string {
		return this.sleepStart + "," + this.sleepEnd + "," + this.notes;
	}
} 
