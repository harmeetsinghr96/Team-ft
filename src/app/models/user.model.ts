export class User {

  constructor(
    public email?: string,
    public password?: string,
    // tslint:disable-next-line: variable-name
    public full_name?: string,
    public company?: object,
    public id?: string,
    // tslint:disable-next-line: variable-name
    public company_id?: string,
    // tslint:disable-next-line: variable-name
    public company_full_name?: string,
    // tslint:disable-next-line: variable-name
    public is_verified?: boolean,
    // tslint:disable-next-line: variable-name
    public core_type?: string,
    // tslint:disable-next-line: variable-name
    public ref_id?: string,
    public admin?: boolean,
    // tslint:disable-next-line: variable-name
    public super_admin?: boolean,
    public role?: string,
    // tslint:disable-next-line: variable-name
    public created_at?: string,
    public token?: string
  ) { }
}
