import * as BookingService from "@/src/data/service/booking.service";

export const booking = async (data: any) => {
  try {
    await BookingService.booking(data);
    return true;
  } catch (error) {
    throw error;
  }
};