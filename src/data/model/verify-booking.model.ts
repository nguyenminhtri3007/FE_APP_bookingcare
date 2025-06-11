export class VerifyBookingModel {
    token: string;
    doctorId: string;

    constructor(token: string, doctorId: string) {
        this.token = token;
        this.doctorId = doctorId;
    }
} 