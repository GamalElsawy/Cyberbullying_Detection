export class User {
  public Name:String;
  public Image:String;
  public EMail:String;
  public Password:String;
  public Phone:string;
  public Address:String;

  constructor(name:string,Image:string,Email:string,Password:string,Phone:string,Adress:string){
    this.Name=name;
    this.Image = Image;
    this.EMail = Email;
    this.Password = Password;
    this.Phone = Phone;
    this.Address = Adress;
  }
}