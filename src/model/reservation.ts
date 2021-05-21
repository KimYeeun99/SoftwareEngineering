import { User } from "./user";
import { Room } from "./roomType";

interface Reservation {
  user: User;
  room: Room;
  date: string;
}

interface ReservationInfo {
  rooms: Room[];
  info: string;
}

interface Comment {
  user: User;
  body: string;
}

export { Reservation, Comment };
