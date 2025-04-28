export class TopDoctorRequestModel {
  limit?: number;

  constructor(limit?: number) {
    this.limit = limit ?? 8; // mặc định lấy 5 bác sĩ
  }
}