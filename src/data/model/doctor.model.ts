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

export class DoctorResponseModel {
  id!: number;
  email!: string;
  firstName!: string;
  lastName!: string;
  address?: string;
  gender?: string;
  phoneNumber?: string;
  image?: string;
  positionId?: string;
  roleId?: string;
  status?: string;
  createdAt?: string;

  genderData?: { valueEn: string; valueVi: string };
  positionData?: { valueEn: string; valueVi: string };
  Doctor_Infor?: {
    specialtyId?: number;
    provinceId?: string;
    address?: string;
    specialtyData?: {
      id: number;
      name: string;
    };
  };

  constructor(data: Partial<DoctorResponseModel>) {
    Object.assign(this, data);
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}