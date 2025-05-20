export class FilterHistoryModel {
  patientId?: number;
  doctorId?: number;
  startDate?: string;
  endDate?: string;

  constructor(
    patientId?: number,
    doctorId?: number,
    startDate?: string,
    endDate?: string
  ) {
    this.patientId = patientId ?? undefined;
    this.doctorId = doctorId ?? undefined;
    this.startDate = startDate ?? undefined;
    this.endDate = endDate ?? undefined;
  }
}
