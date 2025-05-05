export class SignupModel {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;

  constructor(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    address: string
  ) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
  }
}
