import { AppConfig } from "@/src/common/config/app.config";
import { ServiceCore } from "@/src/common/service/service.core";
import { ClinicByIdModel, ClinicModel, } from "../model/clinic.model"; 

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

export const getAllClinicById = async (data: ClinicByIdModel) => {
  try {
    const domain = new AppConfig().getDomain();
    const response = await ServiceCore.GET(
      `${domain}`,
      `get-detail-clinic-by-id?id=${data.id}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
