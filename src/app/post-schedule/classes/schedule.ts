import { Datum, Schedule } from '../../interfaces/schedule';
export class PostSchedule implements Schedule  {
  constructor(id: number) {
    this.id = id;
    this.status = 'success';
    this.start_date = '';
    this.end_date = '';
    this.data = [];
    this.type = '',
    this.image_url = ''
  }
  id: number;
  status: string;
  start_date: string;
  end_date: string;
  data: Datum[];
  type: string;
  image_url: string;
}
