import { AppConfig } from "@/src/common/config/app.config";
import { ServiceCore } from "@/src/common/service/service.core";

export const booking = async (data: any) => {
  try {
    const domain = new AppConfig().getDomain();
    const response = await ServiceCore.POST(
      `${domain}`,
      `patient-book-appointment`,
      data
    );
    return response;
  } catch (error) {
    throw error;
  }
};