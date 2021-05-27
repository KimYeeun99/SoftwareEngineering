class User {
  private id: string;
  private password: string;
  private isHost: boolean;
}

class Customer extends User {
  private nickname: string;
}

class Host extends User {
  private name: string;
  private businesNum: string;
}

export { Customer, Host };
