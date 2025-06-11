import { AppConfig } from "@/src/common/config/app.config";
import { ServiceCore } from "@/src/common/service/service.core";
import { VerifyBookingModel } from "../model/verify-booking.model"; 

export const verifyBooking = async (data: VerifyBookingModel) => {
    try {
        const domain = new AppConfig().getDomain();
        const response = await ServiceCore.POST(
            `${domain}`,
            `verify-book-appointment`,
            data
        );
        return response;
    } catch (error) {
        throw error;
    }
}; 