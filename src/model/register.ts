interface iUser {
  id: string;
  password: string;
  isHost: boolean;
}

class RegisterClass {
  private userInfo: iUser;

  constructor(userInfo: iUser) {
    this.userInfo = userInfo;
  }

  public getUserInfo() {
    return this.userInfo;
  }
  public setUserInfo(userInfo: iUser) {
    this.userInfo = userInfo;
  }
}

class RegisterCustomerClass extends RegisterClass {
  private nickname: string;

  constructor(userinfo: iUser, nickname: string) {
    super(userinfo);
    this.nickname = nickname;
  }

  public getNickname() {
    return this.nickname;
  }
  public setNickname(nickname: string) {
    this.nickname = nickname;
  }
}

class RegisterHostClass extends RegisterClass {
  private name: string;
  private businessNum: string;

  constructor(userInfo: iUser, name: string, businessNum: string) {
    super(userInfo);
    this.name = name;
    this.businessNum = businessNum;
  }

  public getName() {
    return this.name;
  }
  public setName(name: string) {
    this.name = name;
  }
  public getBusinessNum() {
    return this.businessNum;
  }
  public setBusinessNum(businessNum: string) {
    this.businessNum = businessNum;
  }
}

export { iUser, RegisterCustomerClass, RegisterHostClass, RegisterClass };
