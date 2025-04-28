import { AppConfig } from "@/src/common/config/app.config";
import { ServiceCore } from "@/src/common/service/service.core";
import { TopDoctorRequestModel } from "../model/doctor.model";

export const getTopDoctorList = async (data: TopDoctorRequestModel) => {
  try {
    const domain = new AppConfig().getDomain();
    const response = await ServiceCore.POST(`${domain}`, `top-doctor-home`, data);
    return response;
  } catch (error) {
    throw error;
  }
};
