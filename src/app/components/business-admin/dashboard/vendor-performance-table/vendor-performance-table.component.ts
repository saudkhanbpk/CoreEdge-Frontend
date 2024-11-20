import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-vendor-performance-table',
  templateUrl: './vendor-performance-table.component.html',
  styleUrls: ['./vendor-performance-table.component.css']
})
export class VendorPerformanceTableComponent {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  startDate: string | null = null;
  endDate: string | null = null;
  dateRange: string = '';
  showPicker: boolean = false;
  ngAfterViewInit(): void {
    const ctx = document.getElementById('vendorSpendingChart') as HTMLCanvasElement;
  
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Star Electronics', 'Ace Tech.', 'Lester Com.', 'IBM Manuf.'],
        datasets: [
          {
            label: 'Spending',
            data: [300, 50, 150, 250],
            backgroundColor: '#4682B4',
            borderRadius: 5,
            barPercentage: 0.6,
          },
          {
            label: 'Vendor',
            data: [],
            backgroundColor: '#CE6D6D',
          }
        ]
      },
      options: {
        responsive: true,
        layout: {
          padding: {
            top: 30 // Creates a gap between the legend and the chart
          }
        },
        plugins: {
          legend: {
            position: 'top',
            align: 'center',
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
              color: '#333',
              font: {
                size: 12,
                family: 'Poppins'
              }
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => `$${context.raw}` // Tooltip formatting with $
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 100,
              callback: (value) => `$${value}`, // Adding $ to Y-axis labels
              color: '#7F7F7F',
              font: {
                size: 12,
                family: 'Poppins'
              }
            },
            grid: {
              color: '#E0E0E0' // Light grey gridlines
            },
            border: {
              display: false
            }
          },
          x: {
            ticks: {
              color: ['#CE6D6D', '#CE6D6D', '#CE6D6D', '#CE6D6D'], // X-axis label color
              font: {
                size: 12,
                family: 'Poppins'
              },
              padding: 10 // Adds a gap between the X-axis labels and the chart
            },
            grid: {
              drawOnChartArea: false, // Removes gridlines on the X-axis
              drawTicks: false
            },
            border: {
              display: false
            }
          }
        }
      }
    });
  }
  
  
  showDatePicker() {
    this.showPicker = true;
  }

  applyDateRange() {
    if (this.startDate && this.endDate) {
      this.dateRange = `${this.startDate} → ${this.endDate}`;
      this.showPicker = false;
    } else {
      alert('Please select both start and end dates');
    }
  }

  cancelDateRange() {
    this.startDate = null;
    this.endDate = null;
    this.dateRange = 'Start date  →  End date';
    this.showPicker = false;
  }
}
