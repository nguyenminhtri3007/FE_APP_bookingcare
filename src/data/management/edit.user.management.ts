import { EditUserRequestModel, GetUserByIdRequestModel } from "../model/edit.user.model";
import * as EditUserService from "../service/edit.user.service";

export const getUserByIdService = async () => {
  try {
    return await EditUserService.getUserByIdService();
  } catch (error) {
    throw error;
  }
};

export const editUserService = async (data: EditUserRequestModel) => {
  try {
    return await EditUserService.editUserService(data);
  } catch (error) {
    throw error;
  }
};
