interface Room {
  room_id: number;
  camp_id: number;
  name: string;
  price: number;
  info: string;
}

class RoomInfo {
  private room_id: number;
  private camp_id: number;
  private name: string;
  private price: number;
  private info: string;

  constructor(room: Room) {
    this.room_id = room.room_id;
    this.camp_id = room.camp_id;
    this.name = room.name;
    this.price = room.price;
    this.info = room.info;
  }
}

export { Room, RoomInfo };
