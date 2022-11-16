import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Offer{
  name: string;
  descri: string;
  date: string;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private url = 'http://localhost/php-api/offers'
  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<[Offer]>(this.url);
  }
  remove(id: any){
    return this.http.delete(this.url + '/' + id);
  }
  store(offer: Offer){
    const offer_data = offer;
    return this.http.post(this.url, offer_data, {observe: 'response'})
    .subscribe(
      res => {
        console.log(res)
      },
      erro => {
        if(erro.status == 400) {
          console.log(erro);
        }
      }
    );
  }
}