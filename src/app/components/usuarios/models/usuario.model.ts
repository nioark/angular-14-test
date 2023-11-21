export class Usuario {
  id?: number;
  name: string;
  password: any;

  constructor(name: string, password: any, id?: number) {
    this.id = id;
    this.name = name;
    this.password = password;
  }
}
