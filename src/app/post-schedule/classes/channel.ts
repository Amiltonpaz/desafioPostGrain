import { Channel, User } from './../../interfaces/channel';
export class PostChannel implements Channel{
  constructor() {

  }
  id: number;
  user: User;
  status: string;


}
