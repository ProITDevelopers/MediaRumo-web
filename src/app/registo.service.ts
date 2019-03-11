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
   
   cadastrar(subscritor:Subscritor):Observable<any>{
    return this.http.post(this.url,subscritor, { headers: this.headers });
   }
   validarDados(subscritorv:SubscritorValidar):Observable<any>{

    return this.http.post(this.url1,subscritorv, { headers: this.headers });
   }
   getSubscritores():Observable<any>{
    return this.http.get(this.url, { headers: this.headers });
   }
   private handlerError(errorResponse:HttpErrorResponse){
   	if(errorResponse.error instanceof ErrorEvent){
   		console.error('Client Side Error: ', errorResponse.error.message);
   	}else{
   		console.log('Server side Error: ', errorResponse);
   	}
   	//return new ErrorObservable()

   }
}
