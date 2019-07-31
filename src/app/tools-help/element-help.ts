export class ElementHelp {

    static scrollTo(element: HTMLElement) {
        setTimeout(function(){ 
            element.scrollIntoView({behavior:"smooth"});
        }, 50);
    }

}