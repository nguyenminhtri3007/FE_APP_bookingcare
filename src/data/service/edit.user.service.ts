import { AppConfig } from "@/src/common/config/app.config";
import { ServiceCore } from "@/src/common/service/service.core";
import { EditUserRequestModel, GetUserByIdRequestModel } from "../model/edit.user.model";


export const getUserByIdService = async () => {
  try {
    const domain = new AppConfig().getDomain();
    const userId = await new AppConfig().getUserId();
    const response = await ServiceCore.GET(`${domain}`, `get-all-users?id=${userId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const editUserService = async (data: EditUserRequestModel) => {
  try {
    const domain = new AppConfig().getDomain();
    const response = await ServiceCore.PUT(`${domain}`, "edit-user", data);
    return response;
  } catch (error) {
    throw error;
  }
};