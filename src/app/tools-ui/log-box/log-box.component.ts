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

  append(data: string) {
    this.text += data;
    this.scrollToBottom();
  }

  appendLine(data: string) {
    if (this.text == '') {
      this.append(data);
    } else {
      this.append("\n" + data);
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
