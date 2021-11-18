class Component{
    private width: number;
    private height: number;

    // constructor(width: number, height: number) {
    //     this.width = width;
    //     this.height = height;
    // }

    // display(): void{
    //    console.log('displaying');
    // }
}

interface Widget extends Component{
   hide(): void;
}

class Button extends Component{
    hide(): void {
        console.log('hiding');
    }
}

let w: Widget = new Button();
console.log(w);
// w.display();
// w.hide();