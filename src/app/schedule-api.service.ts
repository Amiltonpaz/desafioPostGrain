import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Channel, Schedule } from './interfaces/schedule';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostChannel } from './post-schedule/classes/channel';



@Injectable()

export class ScheduleAPIService{

  private schedules: Schedule[] = [];
  private channels: Channel[] = [];
  private API_schedules = 'http://localhost:3000/schedules';
  private API_channels = 'http://localhost:3000/channels';

  constructor(private http: HttpClient) {

  }


  public getChannels(): Observable<PostChannel[]>{
   return this.http.get<PostChannel[]>(this.API_channels);
  }

  public getSchedules(): Observable<Schedule[]>{

    return  this.http.get<Schedule[]>(this.API_schedules);
  }

  public postSchedule(schedule: Schedule): Observable<Schedule> {

    return this.http.post<Schedule>(this.API_schedules, schedule).pipe(
      tap(() => {

      })

    );
  }


}
