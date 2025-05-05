import { FilterHistoryModel } from "../model/history.model";
import * as HistoryService from "../service/history.service";

export const getFilteredHistories = async (data: FilterHistoryModel) => {
  try {
    const result = await HistoryService.filterHistoriesPatient(data);
    return result; 
  } catch (error) {
    throw error;
  }
};