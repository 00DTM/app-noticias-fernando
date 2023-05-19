import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Article, NewsResponse, articlesByCategoryAndPage } from '../interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class NewsService {



  constructor(private http: HttpClient) { }

  private executeQuery<T>( endpoint: string ) {
    console.log('Petición HTTP realizada');
    return this.http.get<T>(`${ apiUrl }${ endpoint }`, {
      params: {
        apiKey:apiKey,
        country: 'us',
      }
    });
   }

  private articlesByCategoryAndPage: articlesByCategoryAndPage = {

  }

  getTopHeadlines():Observable<Article[]>{
 
    return this.executeQuery<NewsResponse>(`/top-headlines?category=business`)
    .pipe(
     map(({articles}) => articles)
     );
    }
   

   
    getTopHeadlinesByCategory(category:string, loadMore:boolean = false):Observable<Article[]>{
  return this.executeQuery<NewsResponse>(`/top-headlines?category=${category}`)
    .pipe(
    map(({articles}) => articles)
   );
    }

  private getArticlesByCategory(category: string): Observable<Article[]> {
    if (Object.keys(this.articlesByCategoryAndPage).includes(category)) {
      //Ya existe
      //this.articlesByCategoryAndPage[category].page += 1;
    } else {
      this.articlesByCategoryAndPage[category] = {
        page: 0,
        articles: []
      }
    }

    const page = this.articlesByCategoryAndPage[category].page + 1;

    return this.executeQuery<NewsResponse>(`/top-headlines?category=${category}$page=${page}`)
      .pipe(
        map(({ articles }) => articles)
      );

  }

}
