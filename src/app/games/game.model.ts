import { ArrayHelp } from "../tools-help/array-help";
import { DateHelp } from "../tools-help/date-help";

export class Game {

    constructor(
        public id: number,
        public name: string,
        public cover: {
            id: number,
            image_id: string 
        }, 
        public popuarity: number,
        public storyline: string,
        public summary: string,
        public created_at: number,
        public updated_at: number,
        public involved_companies: [{
            id: number,
            developer: boolean,
            company: {
                id: number,
                description: string,
                name: string,
                updated_at: number,
                logo: {
                    id: number,
                    image_id: string 
                },
            },
        }],
        public genres: [{
            id: number,
            name: string 
        }],
        public platforms: [{
            id: number,
            name: string 
        }],
        public release_dates: [{
            id: number,
            date: number,
            platform: number 
        }],
        ) {
    }
    
}