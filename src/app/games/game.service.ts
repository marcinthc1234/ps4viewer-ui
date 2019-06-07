import { Game } from './game.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators'; 
import { TypeHelp } from '../tools-help/type-help';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    apiUrl: string = 'http://localhost:8080/games';

    constructor(private httpClient: HttpClient) {

    }

    getGames(): Observable<Game[]> {
        let response: Observable<Game[]> = this.httpClient
            .get<Game[]>(this.apiUrl)
            .pipe(catchError((err: HttpErrorResponse) => {
                console.error('Getting all games failed', err.error);
                return EMPTY;
            }));
        return response;
    }

    createFromIgdb(game: object) {
        // prepare headers and data
        let httpHeaders = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Cache-Control', 'no-cache');
        let options = {
            headers: httpHeaders
        };
        game = this.validateAndFixFromIgdb(game);
        let gameJson: string = JSON.stringify(game);

        // send post request to create game in our API
        this.httpClient
            .post(this.apiUrl, gameJson, options)
            .pipe(catchError((err: HttpErrorResponse) => {
                console.error('Creation of game failed. JSON sent: ' + gameJson, err.error);
                return EMPTY;
            }))
            .subscribe(response => {
                // do nothing
            });
    }

    updateFromIgdb(game: object) {
        // prepare headers and data
        let httpHeaders = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Cache-Control', 'no-cache');
        let options = {
            headers: httpHeaders
        };
        game = this.validateAndFixFromIgdb(game);
        let gameJson: string = JSON.stringify(game);

        // send put request to update game in our API
        this.httpClient
            .put(this.apiUrl, gameJson, options)
            .pipe(catchError((err: HttpErrorResponse) => {
                console.error('Update of game failed. JSON sent: ' + gameJson, err.error);
                return EMPTY;
            }))
            .subscribe(response => {
                // do nothing
            });
    }

    getLastCreationDate(): Observable<number> {
        let response: Observable<number> = this.httpClient
            .get<number>(this.apiUrl + '/last-create')
            .pipe(catchError((err: HttpErrorResponse) => {
                console.error('Getting last creation date failed', err.error);
                return EMPTY;
            }));
        return response;
    }
    
    getLastUpdateDate(): Observable<number> {
        let response: Observable<number> = this.httpClient
            .get<number>(this.apiUrl + '/last-update')
            .pipe(catchError((err: HttpErrorResponse) => {
                console.error('Getting last update date failed', err.error);
                return EMPTY;
            }));
        return response;
    }

    setLastUpdateDate(lastUpdateDate: number) {
        
        // prepare headers and data
        // let httpHeaders = new HttpHeaders()
        //     .set('Content-Type', 'application/json')
        //     .set('Cache-Control', 'no-cache');
        // let options = {
        //     headers: httpHeaders
        // };
        // let gameJson: string = JSON.stringify(game);

        // send post request to create game in our API
        this.httpClient
            .post(this.apiUrl + '/last-update', lastUpdateDate) //, options
            .pipe(catchError((err: HttpErrorResponse) => {
                console.error('Setting last update date failed. Date sent: ' + lastUpdateDate, err.error);
                return EMPTY;
            }))
            .subscribe(response => {
                // do nothing
            });
    }

    /**
     * Validate if a game object comming from IGDB is valid.
     * All mistakes are fixed and game object is returned.
     * @param game 
     */
    private validateAndFixFromIgdb(game: object): object {
        // Sometimes IGDB sends an involved_company as a number (id probably) instead of object
        if ('involved_companies' in game) {
            game['involved_companies'].forEach(function(involvedCompany, index, involvedCompanies) {
                if (TypeHelp.isNumber(involvedCompany)) {
                    involvedCompanies.splice(index, 1);
                    console.log("Removed involved_company (not an object) from game: " + game['id']);
                }
            });
        }

        // Sometimes IGDB sends an image as a number (id probably) instead of object
        if ('involved_companies' in game) {
            game['involved_companies'].forEach(involvedCompany => {
                if (('logo' in involvedCompany['company']) && TypeHelp.isNumber(involvedCompany['company']['logo'])) {
                    delete involvedCompany['company']['logo'];
                    console.log("Removed company.logo (not an object) from game: " + game['id']);
                }
            });
        }
        
        return game;
    }

}