import * as BookingService from "@/src/data/service/booking.service";

export const booking = async (data: any) => {
  try {
   const res = await BookingService.booking(data);
   console.log('aaaa', res);
   return res;
 
  } 
  catch (error) {
    throw error;
  }
};