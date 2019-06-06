import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-log-box',
  templateUrl: './log-box.component.html',
  styleUrls: ['./log-box.component.css']
})
export class LogBoxComponent implements OnInit {

  @ViewChild("textarea") textArea: ElementRef;
  text: string = '';

  constructor() { }

  ngOnInit() {
    
  }
  
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  append(text: string) {
    this.text += text;
  }

  appendLine(text: string) {
    if (this.text == '') {
      this.append(text);
    } else {
      this.append("\n" + text);
    }
  }

  private scrollToBottom() {
    this.textArea.nativeElement.scrollTop = this.textArea.nativeElement.scrollHeight;
  }

  reset() {
    this.text = "";
  }

  getWidth(): number {
    return this.textArea.nativeElement.offsetWidth;
  }

}
