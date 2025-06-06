import { ReviewModel } from "../model/review.model";
import * as ReviewService from "../service/review.service"
export const createReview = async (data: ReviewModel) => {
    try {
        const result = await ReviewService.createReview(data);
        return result;
    } catch (error) {
        throw error;
    }
}

export const getDoctorReviews = async (doctorId: number) => {
    try {
        const result = await ReviewService.getDoctorReviews(doctorId);
        return result;
    } catch (error) {
        throw error;
    }
} 

export const getReviewedHistoriesByPatient = async (patientId: number, historyIds: number[]) => {
    try {
        const result = await ReviewService.getReviewedHistoriesByPatient(patientId, historyIds);
        return result;
    } catch (error) {
        throw error;
    }
} 

export const getDoctorReviewStats = async (doctorId: number) => {
    try {
        const result = await ReviewService.getDoctorReviewStats(doctorId);
        return result;
    } catch (error) {
        throw error;
    }
} 