import { Component,OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { Subscritor } from '../model/subscritor';
import { RegistoService} from '../registo.service';

@Component({
  selector: 'app-lista-subscritores',
  templateUrl: './lista-subscritores.component.html',
  styleUrls: ['./lista-subscritores.component.scss']
})
export class ListaSubscritoresComponent implements OnInit {

  constructor(private subscritorService:RegistoService) { }

  dados:any;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  ngOnInit() {
  	this.listar();
  	this.dtOptions = {
      pagingType: 'full_numbers',
      "language": {
        "emptyTable": "Nenhum registro encontrado",
        "info": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
        "infoEmpty": "Mostrando 0 até 0 de 0 registros",
        "infoFiltered": "(Filtrados de _MAX_ registros)",
        "infoPostFix": "",
        "lengthMenu": "_MENU_ resultados por página",
        "loadingRecords": "Carregando...",
        "processing": "Processando...",
        "zeroRecords": "Nenhum registro encontrado",
        "search": "Pesquisar",
        "paginate": {
          "next": "Próximo",
          "previous": "Anterior",
          "first": "Primeiro",
          "last": "Último"
        },
        "aria": {
          "sortAscending": ": Ordenar colunas de forma ascendente",
          "sortDescending": ": Ordenar colunas de forma descendente"
        }
      }
      
    };
  }
  listar(){
    this.subscritorService.getSubscritores().subscribe(data => {
      // set items to json response
      console.log(data)
       this.dados = data;
       this.dtTrigger.next();
    });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
