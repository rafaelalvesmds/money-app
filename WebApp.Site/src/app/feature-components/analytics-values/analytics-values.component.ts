import { Component, HostListener, Input, OnInit } from '@angular/core';

interface Card {
  title: string;
  value: string;
  icon: string;
  bgColor: string;
  textColor?: string;
  changeValue?: string;
  changeText?: string;
  colorChangeValue: string;
}

@Component({
  selector: 'app-analytics-values',
  templateUrl: './analytics-values.component.html',
  styleUrls: ['./analytics-values.component.css']
})
export class AnalyticsValuesComponent implements OnInit {

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth = window.innerWidth;
  }

  @Input() cards: Card[] = [];

  screenWidth!: number;

}
