import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Article, NewsResponse } from '../interfaces';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'

const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor( private http: HttpClient) { }

  getTopHeadlines(): Observable<Article[]>{
    // Hace una solicitud HTTP GET para obtener los titulares principales de las noticias
    // utilizando la URL 'https://newsapi.org/v2/top-headlines?country=us'
     return this.http.get<NewsResponse>(`https://newsapi.org/v2/top-headlines?country=us`,{
     // Especifica el parámetro apiKey en la solicitud HTTP 
     params: {
        apiKey: apiKey
      }
    }).pipe(
      // Utiliza el operador 'map' para extraer y devolver solo el array de artículos de la respuesta
      map( ({articles}) => articles)
    );
  }

  getTopHeadlinesByCategory(category: string):Observable<Article[]>{
    return this.http.get<NewsResponse>(`https://newsapi.org/v2/top-headlines?country=us&category=${category}`,{
      params: {
        apiKey: apiKey
      }
    }).pipe(
      map( ({articles}) => articles)
    );
  }

}
