import { ClinicByIdModel, ClinicModel, ClinicResponseModel } from "../model/clinic.model";
import * as ClinicService from "../service/clinic.service";
import * as ClinicByIdService from "../service/clinic.service";
export const getClinic = async (data: ClinicModel) => {
  try {
    const result = await ClinicService.getClinic(data);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getAllClinicById = async (data: ClinicByIdModel) => {
  try {
    const result = await ClinicByIdService.getAllClinicById(data);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getAllClinic = async (data: ClinicModel) => {
  try {
    const result = await ClinicService.getAllClinic(data);
    return result;
  } catch (error) {
    throw error;
  }
};