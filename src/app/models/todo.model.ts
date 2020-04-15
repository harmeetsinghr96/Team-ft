export class Todo {

  constructor(
    // tslint:disable-next-line: variable-name
    public _id: string,
    public title: string,
    // tslint:disable-next-line: variable-name
    public ref_id: number,
    // tslint:disable-next-line: variable-name
    public created_at: Date,
    // tslint:disable-next-line: variable-name
    public updated_at: Date,
    // tslint:disable-next-line: variable-name
    public core_type: string,
  ) { }
}
