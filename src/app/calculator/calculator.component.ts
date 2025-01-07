import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CalculatorResultService } from '../calculator-result.service';

@Component({
  selector: 'app-calculator',
  imports: [CommonModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
  constructor(public calculatorService: CalculatorResultService) { }

  onButtonClick(value: string) {
    if (value === 'all-clear') {
      this.calculatorService.clear();
    } else if (['+', '-', '*', '/'].includes(value)) {
      this.calculatorService.handleOperator(value);
    } else if (value === '=') {
      this.calculatorService.handleEqual();
    } else {
      this.calculatorService.appendNumber(value);
    }
  }
}
