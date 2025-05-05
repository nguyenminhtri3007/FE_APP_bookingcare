import { AppConfig } from "@/src/common/config/app.config";
import { ServiceCore } from "@/src/common/service/service.core";
import { SignupModel } from "../model/signup.model";

export const createNewUserService = async (data: SignupModel) => {
  try {
    const domain = new AppConfig().getDomain();
    const response = await ServiceCore.POST(`${domain}`, "create-new-user", data);
    return response;
  } catch (error) {
    throw error;
  }
};
