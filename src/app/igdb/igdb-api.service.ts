import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class IgdbApiService {

  // use cors-anywhere proxy to avoid CORS security check.
  private apiUrl: string = 'https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com';
  private defaultStep: number = 50; // number of games per request (per page)
  private apiKey: string;
  private defaultPlatformCode: number = 48; // for PS4 games

  constructor(private httpClient: HttpClient) { }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  getGames(filters: string[] = null, orderBy: string = null, page: number = 0, step: number = this.defaultStep, fields: string[] = this.getDefaultFields()): Observable<object[]> {
    let gamesUrl = this.getGamesUrl(filters, orderBy, page, step, fields);
    return this.get(gamesUrl);
  }

  getGamesCount(filters: string[] = null): Observable<number> {
    let gamesCountUrl = this.getGamesCountUrl();
    let gamesCountBody = this.getGamesCountBody(filters);
    return this.post(gamesCountUrl, gamesCountBody).pipe(map(result => result['count'])) ;
  }
  
  private getGamesUrl(filters: string[] = null, orderBy: string = null, page: number = 0, step: number = this.defaultStep, fields: string[] = this.getDefaultFields()) {
    let url: string = this.apiUrl;
    url += '/games'
    url += '/?fields=' + fields.join(',');
    url += '&limit=' + step;
    url += '&offset=' + (page*step);
    if (orderBy != null) {
      url += '&order=' + orderBy;
    }
    url += '&filter[platforms][in]=' + this.defaultPlatformCode;
    if (filters != null) {
      filters.forEach(filter => {
        url += '&filter' + filter;
      });
    }
    return url;
  }

  private getGamesCountUrl(): string {
    let url: string = this.apiUrl;
    url += '/games/count'
    return url;
  }

  private getGamesCountBody(filters: string[] = null): string {
    let body: string = "where platforms = [" + this.defaultPlatformCode + "]";
    if (filters != null) {
      filters.forEach(filter => {
        body += ' & ' + filter;
      });
    }
    body += ";"
    return body;
  }

  private getDefaultFields(): string[] {
    let defaultFields = 
      ['id','name','created_at','updated_at','release_dates.date','release_dates.platform','summary','storyline','popularity',
      'involved_companies.company.name','involved_companies.company.description',
      'involved_companies.company.logo.image_id','involved_companies.company.updated_at',
      'involved_companies.developer','genres.name','platforms.name','cover.image_id']
    return defaultFields;
  }
  
  private get(url: string): Observable<object[]> {
    let headers = this.getDefaultHeaders();
    return this.httpClient.get<object[]>(url, { headers: headers });
  }

  private post(url: string, body: string): Observable<object[]> {
    let headers = this.getDefaultHeaders();
    return this.httpClient.post<object[]>(url, body, { headers: headers });
  }

  private getDefaultHeaders(): HttpHeaders {
    return new HttpHeaders().set('user-key', this.apiKey);
  }

}
