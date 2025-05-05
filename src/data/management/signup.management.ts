import { SignupModel } from "../model/signup.model";
import * as SignupService from "../service/signup.service";

export const createNewUser = async (data: SignupModel) => {
  try {
    const result = await SignupService.createNewUserService(data);
    return result;
  } catch (error) {
    throw error;
  }
};
