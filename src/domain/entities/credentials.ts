
export class Credentials {
    constructor(
        public email: string,
        public password: string,
    ) { }

    validate(){
        if(!this.email){
            throw new Error("Email is required");
        }
        if(!this.password){
            throw new Error("Password is required");
        }
        //regex validates

        var emailRegex = new RegExp("^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$", "i");
        if(!emailRegex.test(this.email)){
            throw new Error("Invalid email");
        }
        var passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})", "i");
        if(!passwordRegex.test(this.password)){
            throw new Error("Invalid password");
        }
    }
}