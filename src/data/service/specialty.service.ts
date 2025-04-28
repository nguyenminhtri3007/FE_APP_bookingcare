import { AppConfig } from "@/src/common/config/app.config";
import { ServiceCore } from "@/src/common/service/service.core";
import { SpecialtyModel,SpecialtyByIdModel } from "../model/specialty.model";


export const getSpecialty = async (data: SpecialtyModel) => {
    try {
        const domain = new AppConfig().getDomain();
        const response = await ServiceCore.POST(
            `${domain}`,
            `get-specialty`,
            data
        );
        return response;
    } catch (error) {
        throw error;
    }
}

export const getAllSpecialtyById = async (data: SpecialtyByIdModel) => {
    try {
      const domain = new AppConfig().getDomain();
      const response = await ServiceCore.GET(
        `${domain}`,
        `get-detail-specialty-by-id?id=${data.id}&location=${data.location}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  };