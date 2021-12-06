import { UploadFileService } from './../services/upload-file.service';
import { ScheduleAPIService } from './../schedule-api.service';
import { Component,Inject, OnInit, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {
  NgxFileDropEntry,
  FileSystemFileEntry,
} from 'ngx-file-drop';
import { Channel, Schedule } from '../interfaces/schedule';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostSchedule } from './classes/schedule';
import { PostData } from './classes/datum';

@Component({
  selector: 'app-post-schedule',
  templateUrl: './post-schedule.component.html',
  styleUrls: ['./post-schedule.component.scss'],
  providers: [ScheduleAPIService]
})

export class PostScheduleComponent implements OnInit {

    public files: NgxFileDropEntry[];
    public channels: Channel[] = [];
    public schedules: Schedule[] = [];
    public selectedChannel: Channel;
    static novoPost = new EventEmitter();
    tipoPost: string = 'feed';
    id: number = Math.floor(Math.random() * 1000);
    public post  = new PostSchedule(Math.random() * 1000);
    public dadosPost = new PostData(Math.random() * 1000);
    public arrayDadosPost: PostData[] = [];
    formdata: FormData;
    srcImage = 'https://via.placeholder.com/200';
    temp: any;


    public constructor(
      private serviceSchedule: ScheduleAPIService,
      private modal: MatDialog,
      private serviceUploadFile: UploadFileService,
      @Inject(MAT_DIALOG_DATA) public data: Channel
      ){

       this.selectedChannel = data;

       this.serviceSchedule.getSchedules().subscribe(
        (schedules) =>  schedules.forEach(element => {
         this.schedules.push(element);

         this.post.start_date = this.schedules[0].start_date;
         this.post.end_date = this.schedules[0].end_date;
         this.post.status = 'waiting';
         this.post.type = this.tipoPost;
         this.post.image_url = this.srcImage;

         this.dadosPost.channel = this.selectedChannel;
         this.dadosPost.type = this.tipoPost;
         this.dadosPost.created_at = new Date();

         let image = {
          id:       Math.floor(Math.random() * 1000),
          filename: null,
          is_album: true,
          url:      this.srcImage,
          type:     null
        }

         this.dadosPost.image = image;

         this.arrayDadosPost.push(this.dadosPost);
         this.post['data'] = this.arrayDadosPost;
       }));

      }

      ngOnInit(): void { }


      public onChangeChannel(event) {

        this.post['data'][0].channel = event.selectedChannel;
      }
      public close() {
       this.modal.closeAll();
      }

    public schedule() {

      this.serviceSchedule.postSchedule(this.post).subscribe(
        retorno => {PostScheduleComponent.novoPost.emit({dado: retorno})},
        error => {PostScheduleComponent.novoPost.emit({dado: error})}
      );

        this.files = [];
        this.close();
    }

    uploadFile(files: NgxFileDropEntry[]) {
      this.files = files;

      for (const droppedFile of files) {

        // é um arquivo?
        if (droppedFile.fileEntry.isFile) {


          const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          fileEntry.file((file: File) => {

            this.formdata = new FormData();
            this.formdata.append('files', file, file.name );
            console.log(this.formdata);
            this.serviceUploadFile.upload(this.files,this.formdata)
            .subscribe((response) => {

              this.temp = response;
              let str = 'http://localhost:8000/images/'+this.temp.message.files.path;
              str = str.split('\\').pop();
              this.srcImage = 'http://localhost:8000/images/'+str;
              this.post.image_url = this.srcImage;
               console.log(str);
              console.log('Upload Concluído.');
            });
          });
        }
      }
    }

    public changeTab($event) { //emitir evento e passar valor
      this.tipoPost = $event.index === 0 ? 'feed' : 'story';
      this.post.type = this.tipoPost;
    }

}
