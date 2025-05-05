import { AppConfig } from "@/src/common/config/app.config";
import { ServiceCore } from "@/src/common/service/service.core";
import { FilterHistoryModel } from "../model/history.model";

export const filterHistoriesPatient = async (data: FilterHistoryModel) => {
  try {
    const domain = new AppConfig().getDomain();
    const response = await ServiceCore.POST(
      `${domain}`,
      `filter-history`,
      data
    );
    return response;
  } catch (error) {
    throw error;
  }
};
