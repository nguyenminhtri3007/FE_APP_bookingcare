import * as VerifyBookingService from "../service/verify-booking.service";
import { VerifyBookingModel } from "../model/verify-booking.model";

export const verifyBooking = async (data: VerifyBookingModel) => {
    try {
        const result = await VerifyBookingService.verifyBooking(data);
        return result;
    } catch (error) {
        throw error;
    }
}; 