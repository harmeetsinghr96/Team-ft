export class User {
  public id: string;
  public fullName: string;
  public email: string;
  public company: string;
  public password: string;
  public token: string;

  constructor(id: string, fullName: string, email: string, company: string, password: string, token: string) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.company = company;
    this.password = password;
    this.token = token;
  }
}
