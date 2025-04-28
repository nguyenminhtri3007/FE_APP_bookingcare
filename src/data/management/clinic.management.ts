import { ClinicModel } from "../model/clinic.model";
import * as ClinicService from "../service/clinic.service";

export const getClinic = async (data: ClinicModel) => {
  try {
    const result = await ClinicService.getClinic(data);
    return result;
  } catch (error) {
    throw error;
  }
};