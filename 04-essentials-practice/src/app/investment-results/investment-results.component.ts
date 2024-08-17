import { CurrencyPipe } from '@angular/common';
import { Component, input, Input,  } from '@angular/core';
import { InvestmenService } from '../investment.service';

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css'
})
export class InvestmentResultsComponent {

  constructor (private investmenService: InvestmenService) {}

  // @Input () results?: {
  //   year: number;
  //   interest: number;
  //   valueEndOfYear: number;
  //   annualInvestment: number;
  //   totalInterest: number;
  //   totalAmountInvested: number
  // }[]
get results() {
  return this.investmenService.resultsData();
}
 

  //warning, when we accesing this value, the signal is an object, so it will by results ()
  // not like with @Input results just

  
  

}
