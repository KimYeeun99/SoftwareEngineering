import { Room } from "./roomType";
import { Host } from "./user";

interface CampInfo {
  id: number;
  name: string;
  writer: string;
  regDate: string;
  rooms: Room[];
  contents: string;
}

class Camp {
  private id: number;
  private name: string;
  private writer: string;
  private regDate: string;
  private rooms: Room[];
  private contents: string;

  constructor(camp: CampInfo) {
    this.id = camp.id;
    this.name = camp.name;
    this.writer = this.writer;
    this.regDate = camp.regDate;
    this.contents = camp.contents;
  }

  public getId() {
    return this.id;
  }
  public setRegDate(regDate: string) {
    this.regDate = regDate;
  }
  public getRegDate() {
    return this.regDate;
  }
  public setRooms(rooms: Room[]) {
    this.rooms = rooms;
  }
  public getRooms() {
    return this.rooms;
  }
}

export { CampInfo, Camp };
