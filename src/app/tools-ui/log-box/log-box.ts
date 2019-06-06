import { LogBoxComponent } from "./log-box.component";
import { TextHelp } from "src/app/tools-help/text-help";

export class LogBox {

  /** This number represents the pixels that are occupied per character of monospace font in a textarea */
  pixelsPerCharacter: number = 846 / 105;
  logBoxComponent: LogBoxComponent;

  constructor(logBoxComponent: LogBoxComponent) {
    this.logBoxComponent = logBoxComponent;
  }

  append(text: string) {
    if (this.logBoxComponent != null) {
        this.logBoxComponent.append(text);
    }
  }

  /**
   * Appends a line in the textarea. If left and right texts are given, 
   * then it concatenates the two texts by aligning them left and right of the textarea.
   * @param textLeft 
   * @param textRight 
   */
  appendLine(textLeft: string, textRight: string = null) {
    if (this.logBoxComponent != null) {
      // concatenate left and right text
      let text = textLeft;
      if (textRight != null) {
        let maxCharacters = this.getMaxCharactersPerLine();
        text = TextHelp.fixLength(textLeft, maxCharacters - textRight.length - 1);
        text += " " + textRight;
      }
        
      this.logBoxComponent.appendLine(text);
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
