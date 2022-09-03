export interface singupModel{
    email: string,
    username: string,
    admin_name: string,
    password: string 

}

export interface AuthResData{
    user_id?: string,
    email: string,
    admin_name?: string,
    username: string,
    token?: string    

}

export interface loginModel{
    email: string,
    password: string    

}


export class User{
    constructor( 
        public id: string,
        public email: string,
        public username: string,
        public admin_name: string,
        public token: string
    ){}
}

