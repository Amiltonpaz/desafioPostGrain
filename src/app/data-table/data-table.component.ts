import { PostScheduleComponent } from './../post-schedule/post-schedule.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ScheduleAPIService } from './../schedule-api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableDataSource } from './data-table-datasource';
import { Schedule } from '../interfaces/schedule';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  providers: [ScheduleAPIService]
})
export class DataTableComponent implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable, {static:true}) table!: MatTable<any>;

  dataSource: DataTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['type', 'status', 'image', 'channel', 'date'];
  agendamentos : Schedule;
  fonte$: Schedule[];
  public dataAtual = new Date();

  constructor(
    private serviceSchedule: ScheduleAPIService,
    private snackBar:MatSnackBar) {

   // carrega o array de agendamentos
   serviceSchedule.getSchedules().subscribe(
    (schedules) => {this.fonte$ = schedules},
    error => this.snackBar.open("API não disponível. Tente novamente mais tarde.",'fechar',{duration: 5000})
  )

  // inicializa a variável com o primeiro elemento do array
    serviceSchedule.getSchedules().subscribe(
    schedules => this.agendamentos = schedules[0],
    error => this.snackBar.open("API não disponível. Tente novamente mais tarde.",'fechar',{duration: 5000})
  )

  }

  ngOnInit() {

    var config = new MatSnackBarConfig();
    config.duration = 5000;

    // escuta o evento emitido pelo componente que insere novos agendametos e atualiza o array e a tabela de dados
    PostScheduleComponent.novoPost.subscribe(

            // método executado paraatualizar a fonte de dados após sinalização de novo agendamento
      () => this.getDataSource().subscribe(
        dados => {this.fonte$ = dados, this.snackBar.open('Dados atualizados com sucesso!','fechar'), {duration: 5000}},
        error => this.snackBar.open("API não disponível. Tente novamente mais tarde.",'fechar', {duration: 10000})
      )
    )
  }

  // carrega a fonte de dados e retorna um observable
  private getDataSource(): Observable<Schedule[]> {
    return this.serviceSchedule.getSchedules();
  }


}
