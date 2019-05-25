import { LogBoxComponent } from "./log-box.component";

export class LogBox {

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
  
}
