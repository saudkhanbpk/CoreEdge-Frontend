import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-employee-expenditures',
  templateUrl: './employee-expenditures.component.html',
  styleUrls: ['./employee-expenditures.component.css']
})
export class EmployeeExpendituresComponent {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  startDate: string | null = null;
  endDate: string | null = null;
  dateRange: string = '';
  showPicker: boolean = false;
 
    ngOnInit(): void {
    this.createBarChart();
  }

  createBarChart(): void {
    const ctx = document.getElementById('spendBarChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'Procurement',
          'IT',
          'Finance',
          'Operations',
          'Customer Support',
          'R&D',
          'Logistics & Supply Chain',
          'Maintenance & Repairs'
        ],
        datasets: [
          {
            label: 'Spend Percentage',
            data: [20, 15, 10, 25, 5, 10, 10, 5], // Example data (percentages)
            backgroundColor: '#4682B4', // Custom bar color
            borderColor: '#4682B4', // Same color for borders
            borderRadius: 5,
            barPercentage: 0.6,
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = context.label || '';
                const value = context.raw || 0;
                return `${label}: ${value}%`;
              }
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            grid: {
              drawOnChartArea: false, // Disable gridlines on the chart area
              drawTicks: true // Keep tick marks visible
            },
            ticks: {
              font: {
                family: 'Poppins', // Set font family to Poppins
                size: 12
              }
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: '#e0e0e0', // Light gray gridlines
              lineWidth: 1, // Set gridline thickness to 1
              drawOnChartArea: true, // Keep grid lines drawn on the chart area
              drawTicks: true // Keep tick marks visible
            },
            ticks: {
              font: {
                family: 'Poppins', // Set font family to Poppins
                size: 12
              }
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
