export class FilterHistoryModel {
  patientId?: number;
  doctorId?: number;
  fromDate?: string;
  toDate?: string;

  constructor(
    patientId?: number,
    doctorId?: number,
    fromDate?: string,
    toDate?: string
  ) {
    this.patientId = patientId ?? undefined;
    this.doctorId = doctorId ?? undefined;
    this.fromDate = fromDate ?? undefined;
    this.toDate = toDate ?? undefined;
  }
}
