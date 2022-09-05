export class ForgotPassword{
  

    constructor(public email:string,public newPassword:string,public confirmPassword:string){
        this.newPassword = newPassword
        this.confirmPassword = confirmPassword
    }
}