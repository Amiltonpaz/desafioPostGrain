import { Channel, Datum, Image } from './../../interfaces/schedule';
export class PostData implements Datum{
  constructor(id: number) {
    this.created_at = new Date;
    this.status = 'success';
    this.now = true;
    this.date = '',
    this.type = 'feed',
    this.image = {
      id:       Math.floor(Math.random() * 1000),
      filename: null,
      is_album: true,
      url:      '',
      type:     null
    },

    this.channel = null;

  }
  id: number;
  created_at: Date;
  status?: string;
  now?: boolean;
  date?: string;
  caption?: string;
  ig_code?: null;
  is_history?: boolean;
  is_album?: boolean;
  is_igtv?: boolean;
  is_reels?: boolean;
  ig_image_url?: null;
  type: string;
  media_type?: string;
  image?: Image;
  channel: Channel;
  socials?: any[];
}
