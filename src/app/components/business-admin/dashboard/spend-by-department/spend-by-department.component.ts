import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-spend-by-department',
  templateUrl: './spend-by-department.component.html',
  styleUrls: ['./spend-by-department.component.css']
})
export class SpendByDepartmentComponent {
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
            data: [20, 15, 10, 25, 5, 10, 10, 5], 
            backgroundColor: '#4682B4', 
            borderColor: '#4682B4', 
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
              drawOnChartArea: false, 
              drawTicks: true
            },
            ticks: {
              font: {
                family: 'Poppins', 
                size: 12
              },
              color: '#CE6D6D'  // Set the color of the x-axis labels (department names)
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: '#e0e0e0', 
              lineWidth: 1, 
              drawOnChartArea: true, 
              drawTicks: true 
            },
            ticks: {
              font: {
                family: 'Poppins', 
                size: 12
              },
              color: '#5A7F9D'  // Set the color of the y-axis numbers
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
