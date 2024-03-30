export interface UserModel {
  id?: string;
  name: string;
  email: string;
  password: string;
  cellphone?: number;
  registrationDate: Date;
}
