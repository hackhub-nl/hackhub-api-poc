interface IAuthenticationService {
  login(email: string, password: string): Promise<string>;
  register(
    email: string,
    password: string,
    name: string,
    username: string
  ): Promise<void>;
}

export class AuthenticationService implements IAuthenticationService {
    
    login(email: string, password: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    
    register(email: string, password: string, name: string, username: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}
