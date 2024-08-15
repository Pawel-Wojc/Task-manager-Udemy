import { Component, Output, EventEmitter, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentInput } from '../investment-input.model';
import { InvestmenService } from '../investment.service';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {

  constructor (private investmenService: InvestmenService) {}
  //@Output() calculate = new EventEmitter<InvestmentInput>();
  //calculate = output<InvestmentInput>();
  initialInvestment = signal('2');
  annualInvestment = signal('3');
  expectedReturn = signal('5');
  duration = signal('10');

  onSubmit() {
    this.investmenService.calculateInvestmentResults({
      initialInvestment: +this.initialInvestment(),
      annualInvestment: +this.annualInvestment(),
      expectedReturn: +this.expectedReturn(),
      duration: +this.duration()
    })
    
  }

}
