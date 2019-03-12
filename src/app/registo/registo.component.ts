import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { ToastrService } from 'ngx-toastr';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';

import { Subscritor,SubscritorValidar } from '../model/subscritor';
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
  subscritorv:SubscritorValidar=new SubscritorValidar();
  termo:boolean=false;
  maxDate: Date;
  minDate: Date;
  dataNascimento:Date;
  dados;
  form:NgForm;
  mensagem:string;
  mensagemChave:string
  codigo1:number;
  codigo2:number;
  codigo3:number;
  codigo4:number;
  codigo5:number;
  codigo6:number;
  ngOnInit() {
  	//var dt=this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  	/*console.log(this.termo)
  	setTimeout(() => this.toastr.success('sup'))*/
  }
  termoChange() {
    this.termo =  !this.termo;
  }
  changeTextButton(estado:boolean,texto:string){
    var element = <HTMLInputElement> document.getElementById("myButton");
    element.disabled = estado;
    element.textContent = texto;
  }
  clean(form:NgForm,form1?:NgForm){
    var element = <HTMLInputElement> document.getElementById("myButton");
  	form.reset();
  	this.termoChange();
  	this.dados='';
    this.mensagem='';
    this.changeTextButton(true,"Registrar");
  }
  cadastrarSubscritor(form){
    let num=this.codigo1+this.codigo2+this.codigo3+this.codigo4+this.codigo5+this.codigo6;
    //console.log(num);
    this.subscritor.chave=num.toString();
    /*form.value.myButton.disabled = true;
    form.value.myButton.value = "Please wait...";*/
    this.changeTextButton(true,"Processando...");
    this.subscritor.dataNascimento=this.datePipe.transform(this.dataNascimento, 'yyyy-MM-dd'); 
  	this.subscritorService.cadastrar(this.subscritor).subscribe(data=> {

        //console.log(data)
        $('#modalTrigger').click();
        this.dados=data;
        this.mensagem='Inscrição feita com sucesso! O seu id é: ' +this.dados[0];
        //this.showSuccess(this.dados[0]);
        
        //form.reset();
        setTimeout(() =>this.clean(this.form,form),9000 )
    },
       error => {
        this.changeTextButton(false,"Registrar");
       	this.dados=error.error.error;
       	//this.mensagem=error.error;
        this.mensagem='';
        this.mensagemChave=this.dados.chave;
       	//console.log(this.dados)
        //this.showWarning('Ocorreu um erro.'+ this.dados);
    });/**/
  }
  validarSubscritor(form){

    this.changeTextButton(true,"Processando...");
    //this.subscritor.dataNascimento=this.datePipe.transform(this.dataNascimento, 'yyyy-MM-dd'); 
    this.subscritorv.telemovel=this.subscritor.telemovel;
    this.subscritorv.bi=this.subscritor.bi;
    this.subscritorv.email=this.subscritor.email;
    //console.log(this.subscritorv);
    this.form=form;
    //$('#modalTrigger').click();
    this.subscritorService.validarDados(this.subscritorv).subscribe(data=> {

        //console.log(data)
        this.dados=data;
        $('#modalTrigger').click();
    },
    error => {
      this.changeTextButton(false,"Registrar");
      this.dados=error.error.error;
      //this.mensagem=error.error;
      this.mensagem='';
      //console.log(this.dados)
    });/**/
  }
  //Funções para o toastr
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
  //Para implementar na funcao cadastro
  chaveConfirmacao(data){
    let chave=this.codigo1+this.codigo2+this.codigo3+this.codigo4+this.codigo5+this.codigo6;
    //let telefone=this.subscritor.telemovel;

    if(data.chave){
      $('#modalTrigger').click();
      //implementar timer por 3 vezes de não inserir a chave com 6 digitos
      //mandar a chave inserida pelo usuario com o numero de telefone
      //se estiver tudo bem mostrar o numero de inscricao
    }
  }
  numeroMostrar(form){
    let num=this.codigo1+this.codigo2+this.codigo3+this.codigo4+this.codigo5+this.codigo6;
    //console.log(num);
    //this.clean(this.form);
    this.subscritor.chave=num.toString();
    this.cadastrarSubscritor(form);
    /*if(data){
      //fechar a modal
      //limpar os form subscritor e da modal
    }*/
    //$('#modalTrigger').click();
  }
}
