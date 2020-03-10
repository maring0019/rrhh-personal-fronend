import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-color-picker',
    templateUrl: './color-picker.html',
    styleUrls: ['./color-picker.scss']
})
export class ColorPickerComponent {
    @Input() label: string;
    @Input() color: string;
    @Input() editable: Boolean = true;
    @Input() size: 'lg' | 'sm' | 'md'  = 'md';
    @Output() selectionChange: EventEmitter<string> = new EventEmitter<string>();

    public show = false;
    public defaultColors: string[] = [
        '#ffffff',
        '#000105',
        '#3e6158',
        '#3f7a89',
        '#96c582',
        '#b7d5c4',
        '#bcd6e7',
        '#7c90c1',
        '#9d8594',
        '#dad0d8',
        '#4b4fce',
        '#4e0a77',
        '#a367b5',
        '#ee3e6d',
        '#d63d62',
        '#c6a670',
        '#f46600',
        '#cf0500',
        '#efabbd',
        '#8e0622',
        '#f0b89a',
        '#f0ca68',
        '#62382f',
        '#c97545',
        '#c1800b'
    ];

    constructor() {
    }

    /**
     * Change color from default colors
     * @param {string} color
     */
    public changeColor(color: string): void {
        this.color = color;
        this.selectionChange.emit(this.color);
        this.show = false;
    }


    /**
     * Change color from input
     * @param {string} color
     */
    public changeColorManual(color: string): void {
        this.color = this.isValid(color)? color: '';
        this.selectionChange.emit(this.color);
    }

    /**
     * Change status of visibility to color picker
     */
    public toggleColors(): void {
        this.show = !this.show;
    }

    
    /**
     * Validate hex format color
     * @param {string} color 
     */
    private isValid(color: string){
        const isValid = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
        return isValid;
    }
}
