import { AppConfig } from "@/src/common/config/app.config";
import { ServiceCore } from "@/src/common/service/service.core";
import { ReviewModel } from "../model/review.model";

export const createReview = async (data: ReviewModel) => {
    try {
        const domain = new AppConfig().getDomain();
        const response = await ServiceCore.POST(
            `${domain}`,
            `review`,
            data
        );
        return response;
    } catch (error) {
        throw error;
    }
}

export const getDoctorReviews = async (doctorId: number) => {
    try {
        const domain = new AppConfig().getDomain();
        const response = await ServiceCore.GET(
            `${domain}`,
            `review/doctor?doctorId=${doctorId}`
        );
        return response;
    } catch (error) {
        throw error;
    }
} 

export const getReviewedHistoriesByPatient = async (patientId: number, historyIds: number[]) => {
    try {
        const domain = new AppConfig().getDomain();
        const historyIdsString = historyIds.join(',');
        const response = await ServiceCore.GET(
            `${domain}`,
            `review/patient-reviewed-histories?patientId=${patientId}&historyIds=${historyIdsString}`
        );
        return response;
    } catch (error) {
        throw error;
    }
} 