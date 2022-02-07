import { Component, Input, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [],
})
export class DonaComponent implements OnInit {
  @Input() titulo: string = 'Sin titulo';

  @Input() dataD: number[] = [350, 450, 100];

  @Input('labels') doughnutChartLabels: string[] = [
    'label 1',
    'label 2',
    'label 3',
  ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: [350, 450, 100],
        backgroundColor: ['#6857E6', '#009FEE', '#F02059'],
      },
    ],
  };

  constructor() {}

  ngOnInit(): void {}
}
