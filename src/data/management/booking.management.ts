import * as BookingService from "@/src/data/service/booking.service";

export const booking = async (data: any) => {
  try {
   const res = await BookingService.booking(data);
   return res;
 
  } 
  catch (error) {
    throw error;
  }
};