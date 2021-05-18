export class User {
  public id:string;
  public username:String;
  public image:String;
  public email:String;
  public password:String;
  public phone:string;
  public address:String;

  constructor(name:string,Image:string,Email:string,Phone:string,Adress:string){
    this.username=name;
    this.image = Image;
    this.email = Email;
    this.phone = Phone;
    this.address = Adress;
  }
}