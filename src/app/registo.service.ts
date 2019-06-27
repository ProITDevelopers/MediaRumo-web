import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Subscritor,SubscritorValidar } from './model/subscritor';
import { Observable } from 'rxjs';
import { catchError} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RegistoService {

  constructor(private http:HttpClient) { }
   url="https://console.proitappsolutions.com/cliente";
   url1="https://console.proitappsolutions.com/cliente/chave";
   headers = new HttpHeaders();
   //registo concurso
   cadastrar(subscritor:Subscritor):Observable<any>{
    return this.http.post(this.url,subscritor, { headers: this.headers });
   }
   //Provincias,{ headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
   cidades():Observable<any>{
    return this.http.get(this.url+'/region');
   }
   //municipios
   municipios(regiao):Observable<any>{
     return this.http.get(this.url+'/city='+regiao);
   }
   //chave two factor
   validarDados(subscritorv:SubscritorValidar):Observable<any>{
    return this.http.post(this.url1,subscritorv, { headers: this.headers });
   }
}
