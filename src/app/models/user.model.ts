export class User {
  public id: string;
  public fullName: string;
  public email: string;
  public company: object;
  public password: string;
  public admin: boolean;
  public superAdmin: boolean;
  public status: boolean;
  public verified: boolean;
  public refId: number;
  public role: string;
  public createdAt: Date;
  public token: string;

  constructor(
    id: string,
    fullName: string,
    email: string,
    company: object,
    password: string,
    admin: boolean,
    superAdmin: boolean,
    status: boolean,
    verified: boolean,
    refId: number,
    role: string,
    createdAt: Date,
    token: string) {

    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.company = company;
    this.password = password;
    this.admin = admin;
    this.superAdmin = superAdmin;
    this.status = status;
    this.verified = verified;
    this.refId = refId;
    this.role = role;
    this.createdAt = createdAt;
    this.token = token;
  }
}
