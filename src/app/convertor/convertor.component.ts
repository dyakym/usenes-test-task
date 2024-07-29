import { Component } from '@angular/core';

@Component({
  selector: 'app-convertor',
  templateUrl: './convertor.component.html',
  styleUrls: ['./convertor.component.scss']
})

export class ConvertorComponent {
  allCurrencies: string[] = [];
  mainCurencies: string[] = ['USD', 'EUR', 'UAH'];
  conversionRate: number = 41;

  currencyOne: string = 'USD';
  currencyTwo: string = 'UAH';

  numOne: number = 1;
  numTwo: number = 0;


  onNumChange(currency: string): void {
    if(currency === 'one') {
      this.numTwo = parseFloat((this.numOne * this.conversionRate).toFixed(2));
    }
    if(currency === 'two') {
      this.numOne = parseFloat((this.numTwo / this.conversionRate).toFixed(2));
    }
  }

  async onCurrencyChange(currency: string): Promise<void> {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/41f5e39f284511f6be5e7a4c/pair/${this.currencyOne}/${this.currencyTwo}`);
      const data = await response.json();
      this.conversionRate = data.conversion_rate;
      this.onNumChange(currency);
    } catch (error) {
      console.log(error);
    }
  }

  async getAllCurencies(): Promise<void> {
    try {
      const responce = await fetch('https://v6.exchangerate-api.com/v6/41f5e39f284511f6be5e7a4c/latest/USD');
      const data = await responce.json();
      const curObj = data.conversion_rates;
      this.allCurrencies = Object.keys(curObj);
    } catch (error) {
      console.log(error);
    }
  }

  onListClick(currency: string, pos: string): void {
    if(pos === 'one') {
      this.currencyOne = currency;
    }
    if(pos === 'two') {
      this.currencyTwo = currency;
    }

    this.onCurrencyChange(pos)
  }

  ngOnInit(): void {
    this.getAllCurencies();
    this.onCurrencyChange('one');
  }
}
