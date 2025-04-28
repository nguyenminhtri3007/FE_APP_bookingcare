import { AppConfig } from "@/src/common/config/app.config";
import { ServiceCore } from "@/src/common/service/service.core";
import { ClinicModel } from "../model/clinic.model"; 

export const getClinic = async (data: ClinicModel) => {
  try {
    const domain = new AppConfig().getDomain();
    const response = await ServiceCore.POST(
      `${domain}`,
      `get-clinic`,
      data
    );
    return response;
  } catch (error) {
    throw error;
  }
};