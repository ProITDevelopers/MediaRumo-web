import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import * as $ from 'jquery';

import { Observable } from 'rxjs';
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
    private localeService: BsLocaleService) { 
  	this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 43800);
    this.maxDate.setDate(this.maxDate.getDate() - 6570);
   this.maxDate1= this.datePipe.transform(this.maxDate, 'yyyy-MM-dd');
    this.minDate1=this.datePipe.transform(this.minDate, 'yyyy-MM-dd')
    this.localeService.use('pt-br');
  }

  subscritor:Subscritor=new Subscritor();
  subscritorv:SubscritorValidar=new SubscritorValidar();
  termo:boolean=false;
  maxDate: Date;
  minDate: Date;
  maxDate1:any;
  minDate1: any;
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
  image='assets/concurso mediarumo.png';
  municipios:Observable<any[]>;
  cidades:Observable<any[]>;

  ngOnInit() {
    this.getCidades();
  }
  //Mudar estado checkbox
  termoChange() {
    this.termo =  !this.termo;
  }
  //Mudar texto do botão
  changeTextButton(estado:boolean,texto:string){
    var element = <HTMLInputElement> document.getElementById("myButton");
    element.disabled = estado;
    element.textContent = texto;
  }
  changeTextButtonNum(estado:boolean,texto:string){
    var element = <HTMLInputElement> document.getElementById("validar");
    element.disabled = estado;
    element.textContent = texto;
  }
  //Limpar formprincipal
  clean(form:NgForm,form1?:NgForm){
    var element = <HTMLInputElement> document.getElementById("myButton");
  	form.reset();
    form1.reset();
    this.changeTextButton(true,"Registrar");
    this.changeTextButtonNum(true,"Enviar");
  	this.termoChange();
  	this.dados='';
    this.mensagem='';
    //$('#modalTrigger').click();
  }
  //Cancelar registo concurso
  cancelar(form:NgForm){
    form.reset();
    this.termoChange();
    this.dados='';
    this.mensagem='';
    this.changeTextButtonNum(false,"Enviar");
    this.changeTextButton(true,"Registrar");
  }
  //cadastro inscricao apos confirmar
  cadastrarSubscritor(form){
    let num=this.codigo1+this.codigo2+this.codigo3+this.codigo4+this.codigo5+this.codigo6;
    this.subscritor.chave=num.toString();
    /*form.value.myButton.disabled = true;
    form.value.myButton.value = "Please wait...";*/
    //this.changeTextButton(true,"Processando...");
    this.changeTextButtonNum(true,"Validando...");
    this.subscritor.dataNascimento=this.datePipe.transform(this.dataNascimento, 'yyyy-MM-dd'); 
  	this.subscritorService.cadastrar(this.subscritor).subscribe(
      data=> {
        $('#modalTrigger').click();
        this.dados=data;
        //this.mensagem='Inscrição feita com sucesso! O seu id é: ' +this.dados[0];
        this.mensagem='Inscrição feita com sucesso. Receberá um email e uma mensagem no seu telemóvel com a referência de pagamento.';
        setTimeout(() =>this.clean(this.form,form),9000)
      },
      error => {
        //this.changeTextButton(false,"Registrar");
        this.changeTextButtonNum(false,"Enviar");
       	this.dados=error.error.error;
       	//this.mensagem=error.error;
        this.mensagem='';
        this.mensagemChave=this.dados.chave;
      }
    );
  }
  //enviar telemovel para mensagem
  validarSubscritor(form){

    this.changeTextButton(true,"Processando...");
    this.subscritorv.telemovel=this.subscritor.telemovel;
    this.subscritorv.bi=this.subscritor.bi;
    this.subscritorv.email=this.subscritor.email;
    this.form=form;
    //$('#modalTrigger').click();
    this.subscritorService.validarDados(this.subscritorv).subscribe(
      data=> {
        this.dados=data;
        $('#modalTrigger').click();
      },
      error => {
        this.changeTextButton(false,"Registrar");
        this.dados=error.error.error;
        this.mensagem='';
      }
    );
  }
  //Tab auto
  keytab(event,maxlength){
    $(".input").keypress(function (e) {
      //var maxLength = $(this).attr("maxlength");
      
      if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
       //console.log('h');
       return false
      }else{
        var length=event.target.value.length;
        var maxLength=event.target.maxLength;
        if (length == maxLength) {
          //console.log(maxLength,length)
          //$(this).next('.input').focus();
         var nextFirst = $(this).closest('.col-xs-1').next().find('.input');
         nextFirst.focus();
        }/**/
      }  
    });
    //backspace
    $('.input').keyup(function(e){
      if(e.keyCode == 8 || e.which == 46){
        //console.log('backspace trapped')
        var prevFirst = $(this).closest('.col-xs-1').prev().find('.input');
        prevFirst.focus();
      }
    })
  }
  getCidades(){
    this.cidades=this.subscritorService.cidades();
  }
  onSelect(municipio){
    if (municipio != '') {
      this.municipios=this.subscritorService.municipios(municipio);
    }
    
  }
  
}
