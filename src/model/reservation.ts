import { iUser } from "./register";
import { Room } from "./roomType";

class Reservation {
  private id: number; //pk값
  private room: Room; //선택한 방
  private userNum: number; //이용자 수
  private customer: iUser; //예약자
  private name: string; //예약자 이름
  private phone: string; //예약자 핸드폰
  private price: number; //가격
  private startDate: Date; //시작날짜
  private endDate: Date; //끝나는날짜

  public getId() {
    return this.id;
  }
  public setId(id: number) {
    this.id = id;
  }
  public getRoom() {
    return this.room;
  }
  public setRoom(room: Room) {
    this.room = room;
  }
  public getUserNum() {
    return this.userNum;
  }
  public setUserNum(userNum: number) {
    this.userNum = userNum;
  }
  public getCustomer() {
    return this.customer;
  }
  public setCustomer(customer: iUser) {
    this.customer = customer;
  }
  public getName() {
    return this.name;
  }
  public setName(name: string) {
    this.name = name;
  }
  public getPhone() {
    return this.phone;
  }
  public setPhone(phone: string) {
    this.phone = phone;
  }
  public getPrice() {
    return this.price;
  }
  public setPrice(price: number) {
    this.price = price;
  }
  public getStartDate() {
    return this.startDate;
  }
  public setStartDate(startDate: Date) {
    this.startDate = startDate;
  }
  public getEndDate() {
    return this.endDate;
  }
  public setEndDate(endDate: Date) {
    this.endDate = endDate;
  }
}

export { Reservation };
