import { AppConfig } from "@/src/common/config/app.config";
import { ServiceCore } from "@/src/common/service/service.core";
import { DoctorDetailRequestModel,
   DoctorExtraInforRequestModel, DoctorProfileRequestModel, 
   DoctorScheduleRequestModel, TopDoctorRequestModel, } from "../model/doctor.model";

export const getTopDoctorList = async (data: TopDoctorRequestModel) => {
  try {
    const domain = new AppConfig().getDomain();
    const response = await ServiceCore.POST(`${domain}`, `top-doctor-home`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getDetailInforDoctor = async (data: DoctorDetailRequestModel) => {
  try {
    const domain = new AppConfig().getDomain();
    const response = await ServiceCore.GET(
      `${domain}`,
      `get-detail-doctor-by-id?id=${data.id}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getScheduleDoctorByDate = async (data: DoctorScheduleRequestModel) => {
  try {
    const domain = new AppConfig().getDomain();
    const url = `get-schedule-doctor-by-date?doctorId=${data.doctorId}&date=${data.date}`;
    const response = await ServiceCore.GET(domain, url);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getExtraInforDoctorById = async (data: DoctorExtraInforRequestModel) => {
  try {
    const domain = new AppConfig().getDomain();
    const response = await ServiceCore.GET(
      `${domain}`,
      `get-extra-infor-doctor-by-id?doctorId=${data.doctorId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getProfileDoctorById = async (data: DoctorProfileRequestModel) => {
  try {
    const domain = new AppConfig().getDomain();
    const response = await ServiceCore.GET(
      domain,
      `get-profile-doctor-by-id?doctorId=${data.doctorId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllDoctors = async () => {
  try {
    const domain = new AppConfig().getDomain();
    const response = await ServiceCore.GET(`${domain}`, `get-all-doctors`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getTotalAppointmentsByDoctorId = async (doctorId: number) => {
    try {
        const domain = new AppConfig().getDomain();
        const response = await ServiceCore.GET(
            `${domain}`,
            `doctor-total-appointments?doctorId=${doctorId}`
        );
        return response;
    } catch (error) {
        throw error;
    }
};