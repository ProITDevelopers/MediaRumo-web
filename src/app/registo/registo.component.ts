import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { ToastrService } from 'ngx-toastr';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';

import { Subscritor } from '../model/subscritor';
import { RegistoService} from '../registo.service';

@Component({
  selector: 'app-registo',
  templateUrl: './registo.component.html',
  styleUrls: ['./registo.component.scss']
})
export class RegistoComponent implements OnInit {

  constructor(private subscritorService:RegistoService,private datePipe: DatePipe,
  	private toastr: ToastrService,private localeService: BsLocaleService) { 
  	this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 43800);
    this.maxDate.setDate(this.maxDate.getDate() - 6570);
    this.localeService.use('pt-br');
  }

  subscritor:Subscritor=new Subscritor();
  termo:boolean=false;
  maxDate: Date;
  minDate: Date;
  dados;
  mensagem:string;
  ngOnInit() {
  	//var dt=this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  	/*console.log(this.termo)
  	setTimeout(() => this.toastr.success('sup'))*/
  }
  termoChange() {
    this.termo =  !this.termo;
  }
  clean(form:NgForm){
  	form.reset();
  	this.termoChange();
  	this.dados='';
    this.mensagem='';

  }
  cadastrarSubscritor(form){
  	this.subscritorService.cadastrar(this.subscritor).subscribe(data=> {

        console.log(data)
        this.dados=data;

        this.mensagem='Inscrição feita com sucesso! O seu id é: ' +this.dados.Cliente_Id;
        this.showSuccess(this.dados.Cliente_Id);
        setTimeout(() =>this.clean(form),3000 )
        
    },
       error => {
       	this.dados=error.error;
       	this.mensagem=error.error;
       	console.log(this.dados)
        this.showWarning('Ocorreu um erro.'+ this.dados);
        console.log(error);
    });

  }
   showSuccess(id) {
    this.toastr.success('Inscrição feita com sucesso! O seu id é: ' +id, 'Success!');
  }
    
  showError() {
    //this.toastr.error('Algo não está bem!'+ this.dados.mensagem, 'Oops!');
  }
  showWarning(mensagem) {
    this.toastr.warning(mensagem, 'Alert!');
  }
    
  showInfo() {
    this.toastr.info('Just some information for you.');
  }

}
