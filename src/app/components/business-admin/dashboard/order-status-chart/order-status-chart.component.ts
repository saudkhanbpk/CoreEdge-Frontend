import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-order-status-chart',
  templateUrl: './order-status-chart.component.html',
  styleUrls: ['./order-status-chart.component.css']
})
export class OrderStatusChartComponent {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  chart: any;

  ngAfterViewInit() {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Pending', 'Approved', 'Rejected', 'Fulfilled'],
        datasets: [
          {
            data: [20, 45, 15, 30],  // Replace with your actual data
            backgroundColor: ['#000000', '#A5C7FF', '#C4D9F9', '#AEE6D8'],
            borderRadius: 10,  // Rounded corners
            borderSkipped: false  // Ensure full rounded bars
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#999999',
              font: {
                size: 15,
                weight:500,
                family:'poppins'
              }
            }
          },
          y: {
            display: false,  // Hide y-axis for a cleaner look
            beginAtZero: true
          }
        },
        layout: {
          padding: 20  // Add padding for better spacing
        }
      }
    });
  }
}
