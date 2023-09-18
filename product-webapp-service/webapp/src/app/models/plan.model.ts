export class Plan {
    planId!: string;
    planName: string;
    planPrice: number;
    planDuration: string;
    planDescription: string[];

    constructor(planName: string, planPrice: number, planDuration: string, planDescription: string[]) {
        this.planName = planName;
        this.planPrice = planPrice;
        this.planDuration = planDuration;
        this.planDescription = planDescription;
    }

}
