import { LogBoxComponent } from "./log-box.component";

export class LogBox {

  /** This number represents the pixels that are occupied per character of monospace font in a textarea */
  pixelsPerCharacter: number = 846 / 105;
  logBoxComponent: LogBoxComponent;

  constructor(logBoxComponent: LogBoxComponent) {
    this.logBoxComponent = logBoxComponent;
  }

  append(data: string) {
    if (this.logBoxComponent != null) {
        this.logBoxComponent.append(data);
    }
  }

  appendLine(data: string) {
    if (this.logBoxComponent != null) {
        this.logBoxComponent.appendLine(data);
    }
  }
  
  reset() {
    if (this.logBoxComponent != null) {
        this.logBoxComponent.reset();
    }
  }

  getMaxCharactersPerLine(): number {
    let characters: number = this.logBoxComponent.getWidth() / this.pixelsPerCharacter;
    return Math.floor(characters);
  }

}
