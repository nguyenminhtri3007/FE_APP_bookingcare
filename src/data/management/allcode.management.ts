import { AllCodeRequestModel } from "../model/allcode.model";
import * as AllCodeService from "@/src/data/service/allcode.service";
export const getAllCodeService = async (data: AllCodeRequestModel) => {
  try {
    return await AllCodeService.getAllCodeService(data);
  } catch (error) {
    throw error;
  }
};
