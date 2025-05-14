import { AppConfig } from "@/src/common/config/app.config";
import { ServiceCore } from "@/src/common/service/service.core";
import { EditPasswordModel } from "../model/edit-password.model";

export const editPassword = async (data: EditPasswordModel) => {
  try {
    const domain = new AppConfig().getDomain();
    const response = ServiceCore.POST(
      `${domain}`,
      `edit-password-user`,
      data
    );
    return response;
  } catch (error) {
    throw error;
  }
};
