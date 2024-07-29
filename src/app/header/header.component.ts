import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  usdCurrency: number = 0;
  euroCurrency: number = 0;

  async getCurrency(currency: string) : Promise<void> {
    try {
      const responce = await fetch(`https://v6.exchangerate-api.com/v6/41f5e39f284511f6be5e7a4c/latest/${currency}`);
      const data = await responce.json();

      if(currency === 'USD') {
        this.usdCurrency = parseFloat((data.conversion_rates.UAH).toFixed(2));
      }
      if(currency === 'EUR') {
        this.euroCurrency = parseFloat((data.conversion_rates.UAH).toFixed(2));
      }
    } catch (error) {
      console.log(error);
    }
  }

  ngOnInit(): void {
    this.getCurrency('USD');
    this.getCurrency('EUR');
  }
}
