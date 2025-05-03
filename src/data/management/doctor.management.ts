import * as DoctorService from "../service/doctor.service";
import { DoctorDetailRequestModel, DoctorExtraInforRequestModel,
   DoctorProfileRequestModel, DoctorScheduleRequestModel,
    TopDoctorRequestModel } from "../model/doctor.model";

export const getTopDoctorList = async (data: TopDoctorRequestModel) => {
  try {
    const result = await DoctorService.getTopDoctorList(data);
    return result;
  } catch (error) {
    console.error("Lỗi khi gọi getTopDoctorList:", error);
    throw error;
  }
};

export const getDetailInforDoctor = async (data: DoctorDetailRequestModel) => {
  try {
    const result = await DoctorService.getDetailInforDoctor(data);
    return result;
  } catch (error) {
    throw error;
  }
};
export const getScheduleDoctorByDate = async (data: DoctorScheduleRequestModel) => {
  try {
    const result = await DoctorService.getScheduleDoctorByDate(data);
    return result;
  } catch (error) {
    throw error;
  }
};
export const getExtraInforDoctorById = async (data: DoctorExtraInforRequestModel) => {
  try {
    const result = await DoctorService.getExtraInforDoctorById(data);
    return result;
  } catch (error) {
    throw error;
  }
};


export const getProfileDoctorById = async (data: DoctorProfileRequestModel) => {
  try {
    const result = await DoctorService.getProfileDoctorById(data);
    return result;
  } catch (error) {
    throw error;
  }
};