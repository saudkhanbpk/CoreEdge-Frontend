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
            data: [300, 50, 150, 250, 100],
            backgroundColor: '#4682B4',
            borderRadius: 5,
            barPercentage: 0.6, // Adjust bar thickness
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            align: 'center',
          
            labels: {
              usePointStyle: true, // Circular legend markers
              pointStyleWidth: 10,
              color: '#333',
              font: {
                size: 12,
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `$${context.raw}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 100,
              color: '#7F7F7F', // Grey color for Y-axis labels
              font: {
                size: 12,
                family:'poppins'
              }
            },
            grid: {
              color: '#E0E0E0', // Light grey gridlines
            },
            border: {
              display: false // Removes the border line along the Y-axis
            }
          },
          x: {
            ticks: {
              color: ['#CE6D6D', '#CE6D6D', '#CE6D6D', '#CE6D6D'], // Red for Genghis K, grey for others
              font: {
                size: 12,
                family:'poppins'
              }
            },
            grid: {
              drawOnChartArea: false, // Removes gridlines on the chart area
              drawTicks: false // Removes small tick marks below labels
            },
            border: {
              display: false // Removes the border line along the X-axis
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
