import { Game } from './game.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    apiUrl: string = 'http://localhost:8080';

    constructor(private httpClient: HttpClient) {

    }

    getGames(): Observable<Game[]> {

        return this.httpClient.get<Game[]>(this.apiUrl + '/games');

        // return [
        //     new Game('Dark Souls', 'From Software', 'https://upload.wikimedia.org/wikipedia/en/8/8d/Dark_Souls_Cover_Art.jpg'),
        //     new Game('Borderlands 2', 'Gearsoft', 'https://upload.wikimedia.org/wikipedia/en/7/77/Borderlands2boxart3.jpg'),
        //     new Game('Rise of the Tomb Raider', 'Square Enix', 'https://upload.wikimedia.org/wikipedia/en/2/29/Rise_of_the_Tomb_Raider.jpg'),
        //     new Game('Doom', 'ID Software', 'https://upload.wikimedia.org/wikipedia/en/5/57/Doom_cover_art.jpg'),
        //     new Game('Driveclub', 'Evolution Studios', 'https://techraptor.net/wp-content/uploads/2014/10/DriveClub-Logo.jpg'),
        //     new Game('Rayman Legends', 'Ubisoft', 'https://upload.wikimedia.org/wikipedia/en/f/f6/Rayman_Legends_Box_Art.jpg'),
        //     new Game('Horizon Zero Dawn', 'Guerrilla Games', 'https://upload.wikimedia.org/wikipedia/en/9/93/Horizon_Zero_Dawn.jpg'),
        //     new Game('Fallout 4', 'Bethesda Game Studios', 'https://upload.wikimedia.org/wikipedia/en/7/70/Fallout_4_cover_art.jpg'),
        //     new Game('Assassin\'s Creed Odyssey', 'Ubisoft', 'https://upload.wikimedia.org/wikipedia/en/9/99/ACOdysseyCoverArt.png'),
        //     new Game('Bloodborne', 'From Software', 'https://upload.wikimedia.org/wikipedia/en/6/68/Bloodborne_Cover_Wallpaper.jpg'),
        // ];
    }

    updateFromIgdb(game: object) {
        // prepare headers and data
        let httpHeaders = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Cache-Control', 'no-cache');
        let options = {
            headers: httpHeaders
        };
        let gameJson: string = JSON.stringify(game);

        // send post request to update game in our API
        this.httpClient.post(this.apiUrl + '/games', gameJson, options).subscribe(response => {
            // do nothing
        });
    }
    
}