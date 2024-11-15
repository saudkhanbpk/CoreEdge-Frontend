import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-vendor-performance-table',
  templateUrl: './vendor-performance-table.component.html',
  styleUrls: ['./vendor-performance-table.component.css']
})
export class VendorPerformanceTableComponent {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  chart: any;

  ngAfterViewInit() {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['United States', 'Canada', 'Mexico', 'Other'],
        datasets: [
          {
            data: [52.1, 22.8, 13.9, 11.2],
            backgroundColor: ['#000000', '#A5C7FF', '#AEE6D8', '#C4D9F9'],
            hoverOffset: 4
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false  // Hide default legend
          }
        },
        layout: {
          padding: {
            left: 20,
            right: 80  // Add space for custom legend
          }
        },
        cutout: '70%',  // Creates the donut shape
      }
    });
  }
}
