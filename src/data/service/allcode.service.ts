import { AppConfig } from "@/src/common/config/app.config";
import { ServiceCore } from "@/src/common/service/service.core";
import { AllCodeRequestModel } from "../model/allcode.model";

export const getAllCodeService = async (data: AllCodeRequestModel) => {
  try {
    const domain = new AppConfig().getDomain();
    const response = await ServiceCore.GET(`${domain}`, `allcode?type=${data.type}`);
    return response;
  } catch (error) {
    throw error;
  }
};
