import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[remove-component-tag]'
})
export class RemoveComponentTagDirective {
  constructor(private el: ElementRef) {

    let element = el.nativeElement;
    let children = el.nativeElement.childNodes;

    setTimeout(()=>{
      let reversedChildren = [];
      children.forEach(child => {
        reversedChildren.unshift(child);
      });
      reversedChildren.forEach(child => {
        element.parentNode.insertBefore(child, element.nextSibling);
      });
      element.remove(element);
    }, 0);

  }
}
