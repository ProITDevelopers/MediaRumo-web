import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DatePipe} from '@angular/common';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
defineLocale('pt-br', ptBrLocale); 

import { DataTablesModule } from 'angular-datatables';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistoComponent } from './registo/registo.component';
import { ListaSubscritoresComponent } from './lista-subscritores/lista-subscritores.component';
import { HeaderComponent } from './header/header.component';
import { InscricaoComponent } from './inscricao/inscricao.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistoComponent,
    ListaSubscritoresComponent,
    HeaderComponent,
    InscricaoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    DataTablesModule,
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot({
    timeOut: 20000,
    positionClass: 'toast-top-right',
    preventDuplicates: true,
  })
  ],
  providers: [ DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
