import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'calendar',
  standalone: false,
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {

  date: Date = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

  @Output() dateSelected = new EventEmitter<any>()



  ngOnInit(): void {
    this.emitDate()
  }

  emitDate() {
    this.dateSelected.emit(this.date)
  }

  convertDateToText(dateString: string): string {
    const dateObj = new Date(dateString);

    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();

    return `${monthNames[month]} ${year - 1}`;
  }

  onChangeMonth(action: 'next' | 'before') {
    if (action == 'next')
      this.date.setMonth(this.date.getMonth() + 1)

    if (action == 'before')
      this.date.setMonth(this.date.getMonth() - 1)

    this.emitDate();
  }
}
