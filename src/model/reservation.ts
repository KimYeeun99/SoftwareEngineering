import { iUser } from "./register";
import { Room } from "./roomType";
interface ReserveInterface {
  reserve_id: number; //pk값
  room_id: number;
  user_id: string;
  people: number; //이용자 수
  name: string; //예약자 이름
  phone: string; //예약자 핸드폰
  price: number; //가격
  startDate: string; //시작날짜
  endDate: string; //끝나는날짜

  room: Room; //선택한 방
  customer: iUser; //예약자
}

class Reservation {
  private reserve_id: number; //pk값
  private room: Room; //선택한 방
  private people: number; //이용자 수
  private customer: iUser; //예약자
  private name: string; //예약자 이름
  private phone: string; //예약자 핸드폰
  private price: number; //가격
  private startDate: string; //시작날짜
  private endDate: string; //끝나는날짜

  constructor(reservation: ReserveInterface) {
    this.reserve_id = reservation.reserve_id;
    this.room = reservation.room;
    this.people = reservation.people;
    this.customer = reservation.customer;
    this.name = reservation.name;
    this.phone = reservation.phone;
    this.price = reservation.price;
    this.startDate = reservation.startDate;
    this.endDate = reservation.endDate;
  }

  public getReserve_id() {
    return this.reserve_id;
  }
  public setReserve_id(reserve_id: number) {
    this.reserve_id = reserve_id;
  }
  public getRoom() {
    return this.room;
  }
  public setRoom(room: Room) {
    this.room = room;
  }
  public getPeople() {
    return this.people;
  }
  public setPeople(people: number) {
    this.people = people;
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
  public setStartDate(startDate: string) {
    this.startDate = startDate;
  }
  public getEndDate() {
    return this.endDate;
  }
  public setEndDate(endDate: string) {
    this.endDate = endDate;
  }
}

export { ReserveInterface, Reservation };
