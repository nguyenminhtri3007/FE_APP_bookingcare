import { ForgotPasswordModel } from "../model/forgotPassword.model"; 
import * as ForgotPasswordService  from "../service/forgotPassword.service"

export const forgotPassword = async (data: ForgotPasswordModel) => {
  try {
    const result = await ForgotPasswordService.forgotPassword(data);
    return result;
  } catch (error) {
    throw error;
  }
};
