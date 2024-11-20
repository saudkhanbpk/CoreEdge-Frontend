import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-inventory-demand',
  templateUrl: './inventory-demand.component.html',
  styleUrls: ['./inventory-demand.component.css']
})
export class InventoryDemandComponent {
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
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov' , 'Dec'],
        datasets: [
          {
            label: 'Requests',
            data: [1160, 1220, 2150, 2100, 4230, 3234, 2543, 1434,4234,4544,7223,2656], // Example data
            backgroundColor: '#5684AE', // Blue color for bars
            borderRadius: 5, // Rounded corners
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false // Hide the legend
          }
        },
        scales: {
          x: {
            grid: {
              color: '#E5E5E5', // Light gray grid lines
            },
            border: {
              display: false // Remove the bottom border line
            },
            ticks: {
              color: '#5A7F9D', // Pinkish color for x-axis labels
              font: {
                family: 'Poppins', // Apply Poppins font
                size: 12
              }
            }
          },
          y: {
            grid: {
              display: false // Hide the horizontal grid lines
            },
            border: {
              display: false // Remove the left border line
            },
            ticks: {
              color: '#CE6D6D', // Pinkish color for x-axis labels
              font: {
                family: 'Poppins', // Apply Poppins font
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
