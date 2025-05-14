export class ForgotPasswordModel {
  email: string;

  constructor(email?: string) {
    this.email = email ?? '';
  }

}
