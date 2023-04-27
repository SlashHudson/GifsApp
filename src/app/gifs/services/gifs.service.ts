import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = "ZdOwNwmULPQNgFRWG7JFUrOt6nRNFhwo";
  private servicioUrl: string = "https://api.giphy.com/v1/gifs";
  private _historial: string[]= [];
  //
  public resultados :Gif[] = [];
  
  get historial(){
    return [...this._historial];
  }

  constructor( private http: HttpClient ){

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultado')!) || [];
    // if(localStorage.getItem('historial')){
    //   this._historial = JSON.parse(localStorage.getItem('historial')! );
    // }

    
  }
  
  buscarGifs(query:string = ""){


    query = query.trim().toLowerCase();

    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10) //splice toma como parametros dos numeros, el primero es el indice de donde empieza a mantener los numeros y el segundo es el indice donde termina y el resto para adelante lo borra
   
      localStorage.setItem('historial', JSON.stringify(this._historial) );
   
   
    }

    // fetch('https://api.giphy.com/v1/gifs/trending?api_key=ZdOwNwmULPQNgFRWG7JFUrOt6nRNFhwo&q=Dragon Ball z&limit=10')
    // .then( resp => {
    //   resp.json().then(data=>{
    //     console.log(data);
        
    //   })
    // })
    
    const params = new HttpParams()
      .set('api_key', this.apiKey )
      .set('limit', '10' )
      .set('q', query )

      console.log(params.toString());
      

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
      .subscribe((resp:SearchGifsResponse) => {
        this.resultados = resp.data; 
        localStorage.setItem('resultado', JSON.stringify(this.resultados));
      });


  }

  borrarHistorial() {
    localStorage.removeItem('historial');
    this._historial = [];
  }

}
