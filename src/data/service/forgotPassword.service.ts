import { AppConfig } from "@/src/common/config/app.config";
import { ServiceCore } from "@/src/common/service/service.core";
import { ForgotPasswordModel } from "../model/forgotPassword.model"; 

export const forgotPassword = async (data: ForgotPasswordModel) => {
  try {
    const domain = new AppConfig().getDomain();
    const response = ServiceCore.POST(
      `${domain}`,
      `user-forgot-password`,
      data
    );
    return response;
  } catch (error) {
    throw error;
  }
};
