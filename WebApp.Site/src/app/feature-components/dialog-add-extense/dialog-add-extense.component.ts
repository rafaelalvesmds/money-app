import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog-add-extense',
  templateUrl: './dialog-add-extense.component.html',
  styleUrls: ['./dialog-add-extense.component.css']
})
export class DialogAddExtenseComponent {

  @Input() visible: boolean = false;
  @Output() onHideEmit = new EventEmitter<any>();

  onHide() {
    this.onHideEmit.emit(false)
  }
}
