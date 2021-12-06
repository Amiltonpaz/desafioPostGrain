import { ScheduleAPIService } from './../schedule-api.service';
import { Component, EventEmitter, OnInit, Inject, Optional } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PostScheduleComponent } from '../post-schedule/post-schedule.component';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Channel } from '../interfaces/schedule';
import { PostChannel } from '../post-schedule/classes/channel';


@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss'],
  providers: [ScheduleAPIService]
})

export class ChannelsComponent{

    public static changeChannel = new EventEmitter();
    public channels: PostChannel[];
    public selectedChannel = new PostChannel();
    private readonly API_CHANNELS = 'http://localhost:3000/channels';
    public static dialogRef: MatDialogRef<PostScheduleComponent>;

    public constructor(
      private modal: MatDialog,
      serviceAPI: ScheduleAPIService,
      @Optional() @Inject(MAT_DIALOG_DATA) public data: Channel) {

        // carrega o array de channels
        serviceAPI.getChannels().subscribe(
          (channels) => this.channels = channels
        )

         // Inicializa a variável com o primeiro elemento do array
         serviceAPI.getChannels().subscribe(
           (channels) => this.selectedChannel = channels[0]
         )
    }

    // Ao clicar no Channel, emite o channel selecionado para o componente PostSchedule (que é um modal);
    public selectChannel(channel) {
      this.selectedChannel = channel;
      ChannelsComponent.changeChannel.emit({channel});
    }

    //abre o modal post-schedule passando o channel selecionado
    openModal() {
      // utilizando acesso estático, pois não estabelecem relação de Pai e Filho;
      ChannelsComponent.dialogRef = this.modal.open(PostScheduleComponent, {
        height: '550px',
        width: '800px',
        panelClass: 'fundo-modal',
        data : this.selectedChannel
      });

    }

}
