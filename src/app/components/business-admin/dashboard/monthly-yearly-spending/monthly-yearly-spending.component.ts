import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-monthly-yearly-spending',
  templateUrl: './monthly-yearly-spending.component.html',
  styleUrls: ['./monthly-yearly-spending.component.css']
})
export class MonthlyYearlySpendingComponent {
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
    const ctx: any = document.getElementById('barChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Spending',
            data: [1160, 1220, 2150, 2100, 4230, 3234, 2543, 1434, 4234, 4544, 7223, 2656],
            backgroundColor: '#5684AE',
            borderRadius: 5,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            grid: {
              color: '#E5E5E5',
            },
            border: {
              display: false
            },
            ticks: {
              color: '#CE6D6D',
              font: {
                family: 'Poppins',
                size: 12
              }
            }
          },
          y: {
            grid: {
              display: false
            },
            border: {
              display: false
            },
            ticks: {
              color: '#5A7F9D',
              font: {
                family: 'Poppins',
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
