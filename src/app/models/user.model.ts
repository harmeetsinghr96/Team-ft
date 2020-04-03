export class User {
  public fullName: string;
  public email: string;
  public company: object;
  public password: string;
  public token?: string;

  constructor(
    fullName: string,
    email: string,
    company: object,
    password: string,
    token?: string) {

    this.fullName = fullName;
    this.email = email;
    this.company = company;
    this.password = password;
    this.token = token;
  }
}
