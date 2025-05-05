export class EditUserRequestModel {
  id!: string;
  email!: string;
  password!: string;
  firstName!: string;
  lastName!: string;
  phonenumber!: string;
  address!: string;
  gender!: string;
  avatar?: string;

  constructor(data: Partial<EditUserRequestModel>) {
    Object.assign(this, data);
  }
}

export class GetUserByIdRequestModel {
  id: string;
  constructor(id: string) {
    this.id = id;
  }
}