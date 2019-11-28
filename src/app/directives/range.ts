import { Directive, Input, ViewContainerRef, TemplateRef } from '@angular/core';

@Directive({
      selector: '[dateRange]'
  })
  export class RangeDirective {
      _range: number[];
    
      @Input()
      set dateRange( value ) {
          this.vcr.clear();
          this._range = this.generateDateRange(value[0], value[1] );
          this._range.forEach(val => {
              this.vcr.createEmbeddedView(this.tpl, {
                  $implicit: val
              });
          });
      }
  
    constructor( private vcr : ViewContainerRef, private tpl : TemplateRef<any> ) {}
  
    

    private generateDateRange(startDate:Date, endDate:Date) {   
        let range = [];
        while (startDate.getTime() <= endDate.getTime()) {
            const tomorrow = this.addOneDay(startDate);
            if ( tomorrow.getMonth() != startDate.getMonth()){
                let dayNumber = startDate.getDate();
                while (dayNumber < 31){
                    range.push(null);
                    dayNumber +=1;
                }
            }
            range.push(startDate);
            startDate = tomorrow;
        }
        return range;
    }

    private addOneDay(date:Date){
        let tomorrow = new Date(date);
        return new Date(tomorrow.setDate(tomorrow.getDate() + 1 ));
    }

    /**
     * Sample number range generator
     * @param start valor inicial del rango
     * @param end valor final del rango
     */
    private generateRange(start, end) {   
        return Array.from({length: (end - start)}, (v, k) => k + start);
    }
  
}