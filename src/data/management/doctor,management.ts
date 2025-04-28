import * as DoctorService from "../service/doctor.service";
import { TopDoctorRequestModel } from "../model/doctor.model";

export const getTopDoctorList = async (data: TopDoctorRequestModel) => {
  try {
    const result = await DoctorService.getTopDoctorList(data);
    return result;
  } catch (error) {
    console.error("Lỗi khi gọi getTopDoctorList:", error);
    throw error;
  }
};
