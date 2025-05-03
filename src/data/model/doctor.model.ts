export class TopDoctorRequestModel {
  limit?: number;

  constructor(limit?: number) {
    this.limit = limit ?? 8; 
  }
}

export class DoctorDetailRequestModel {
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}

export class DoctorScheduleRequestModel {
  doctorId: number;
  date: string;

  constructor(doctorId: number, date: string) {
    this.doctorId = doctorId;
    this.date = date;
  }
}

export class DoctorExtraInforRequestModel {
  doctorId: number;

  constructor(doctorId: number) {
    this.doctorId = doctorId;
  }
}

export class DoctorProfileRequestModel {
  doctorId: number;

  constructor(doctorId: number) {
    this.doctorId = doctorId;
  }
}