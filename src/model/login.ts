class LoginClass {
  private id: string;
  private password: string;
  private isHost: boolean;

  constructor(id: string, password: string, isHost: boolean) {
    this.id = id;
    this.password = password;
    this.isHost = isHost;
  }

  public getId() {
    return this.id;
  }
  public setId(id: string) {
    this.id = id;
  }
  public getPassword() {
    return this.password;
  }
  public setPassword(password: string) {
    this.password = password;
  }
  public getIsHost() {
    return this.isHost;
  }
  public setIsHost(isHost: boolean) {
    this.isHost = isHost;
  }
}

export { LoginClass };
