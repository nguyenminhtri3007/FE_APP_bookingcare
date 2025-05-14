import { EditPasswordModel } from "../model/edit-password.model";
import * as EditPasswordService from "../service/edit-password.service";

export const editPassword = async (data: EditPasswordModel) => {
  try {
    const result = await EditPasswordService.editPassword(data);
    return result;
  } catch (error) {
    throw error;
  }
};
