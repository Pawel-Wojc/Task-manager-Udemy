import {
  afterNextRender,
  afterRender,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  output,
  viewChild,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from '../../../shared/control/control.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
})
export class NewTicketComponent implements OnInit, AfterViewInit {
  @ViewChild('form') form?: ElementRef<HTMLFormElement>;
  //private form = viewChild<ElementRef<HTMLFormElement>>('form');

  add = output<{ title: string; request: string }>();

  constructor() {
    afterRender(() => {
      console.log('After render');
    });
    afterNextRender(() => {
      console.log('After next render');
    });
  }

  ngOnInit() {
    console.log('On init');
    console.log(this.form?.nativeElement);
  }

  ngAfterViewInit() {
    console.log('After view init');
    console.log(this.form?.nativeElement);
  }

  onSubmit(title: string, request: string) {
    console.log(title);
    console.log(request);
    this.add.emit({ title, request });
    this.form?.nativeElement.reset();
  }
}
