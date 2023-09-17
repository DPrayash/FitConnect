export class Activity {
    activityId: number;
    slotNumber: string;
    userEmail: string;
    slotStatus: string;
    trainerName: string;
    bookingDate: string;

    constructor() {
        this.activityId = 0;
        this.slotNumber = "";
        this.userEmail = "";
        this.slotStatus = "";
        this.trainerName = "";
        this.bookingDate = "";
    }

}