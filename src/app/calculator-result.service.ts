import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorResultService {
  private currentValue: string = '';
  private firstOperand: number | null = null;
  private operator: string | null = null;
  private waitingForSecondOperand = false;

  getCurrentValue(): string {
    return this.currentValue || '0';
  }

  appendNumber(number: string) {
    // If '.' is pressed and the current value already contains '.', do nothing
    if (number === '.' && this.currentValue.includes('.')) {
      return;
    }

    // Handle case where the value is '0' or an empty string
    if (this.waitingForSecondOperand) {
      this.currentValue = number === '.' ? '0.' : number;
      this.waitingForSecondOperand = false;
    } else {
      if (number === '.' && this.currentValue === '') {
        // If '.' is the first character, prefix with '0'
        this.currentValue = '0.';
      } else {
        // Append the number normally
        this.currentValue = this.currentValue === '0' ? number : this.currentValue + number;
      }
    }
  }

  handleOperator(nextOperator: string) {
    const inputValue = parseFloat(this.currentValue);

    if (this.operator && this.waitingForSecondOperand) {
      this.operator = nextOperator;
      return;
    }

    if (this.firstOperand === null && !isNaN(inputValue)) {
      this.firstOperand = inputValue;
    } else if (this.operator) {
      const result = this.calculate(this.firstOperand!, inputValue, this.operator);
      this.currentValue = String(result);
      this.firstOperand = result;
    }

    this.operator = nextOperator;
    this.waitingForSecondOperand = true;
  }

  calculate(firstOperand: number, secondOperand: number, operator: string): number {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return secondOperand === 0 ? 0 : firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  }

  handleEqual() {
    if (this.operator && this.firstOperand !== null) {
      const secondOperand = parseFloat(this.currentValue);
      const result = this.calculate(this.firstOperand, secondOperand, this.operator);
      this.currentValue = String(result);
      this.firstOperand = null;
      this.operator = null;
      this.waitingForSecondOperand = false;
    }
  }

  clear() {
    this.currentValue = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitingForSecondOperand = false;
  }
}
