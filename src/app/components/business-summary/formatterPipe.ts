// Core modules imports
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "thousandSuff",
})
export class ThousandSuffixesPipe implements PipeTransform {
  /* Function to transform numbers in K , M */
  transform(input: any, args?: any): any {
    var expression,
      rounded,
      suffixes = ["K", "M", "G", "T", "P", "E"];
    if (Number.isNaN(input)) {
      return null;
    }
    if (input < 1000) {
      return input;
    }
    expression = Math.floor(Math.log(input) / Math.log(1000));
    return (
      (input / Math.pow(1000, expression)).toFixed(args) +
      suffixes[expression - 1]
    );
  }
}
