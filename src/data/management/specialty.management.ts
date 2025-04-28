import { SpecialtyModel , SpecialtyByIdModel } from "../model/specialty.model";
import * as SpecialtyService from "../service/specialty.service";
import * as SpecialtyByIdService from "../service/specialty.service";

export const getSpecialty = async (data: SpecialtyModel) => {
  try {
    const result = await SpecialtyService.getSpecialty(data);
    return result; 

    
  } catch (error) {
    throw error;
  }
};
export const getAllSpecialtyById = async (data: SpecialtyByIdModel) => {
  try {
    const result = await SpecialtyByIdService.getAllSpecialtyById(data);
    return result;
  } catch (error) {
    throw error;
  }
};
