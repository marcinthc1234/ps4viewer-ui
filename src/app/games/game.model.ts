export class Game {
    public name: string;
    public company: string;
    public imagePath: string;

    constructor(name: string, company: string, imagePath: string) {
        this.name = name;
        this.company = company;
        this.imagePath = imagePath;
    }
}