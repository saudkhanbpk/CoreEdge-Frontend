import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-spend-by-supplier',
  templateUrl: './spend-by-supplier.component.html',
  styleUrls: ['./spend-by-supplier.component.css']
})
export class SpendBySupplierComponent {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  startDate: string | null = null;
  endDate: string | null = null;
  dateRange: string = '';
  showPicker: boolean = false;
  @ViewChild('barChart') barChart!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    const ctx = this.barChart.nativeElement.getContext('2d');
    if (ctx) {
      const chartConfig: ChartConfiguration = {
        type: 'bar',
        data: {
          labels: [
            'Ace Technologies',
            'Star Computers',
            'Retro Maniacs',
            'Asphalt Solutions',
            'Uptown Technologies',
          ],
          datasets: [
            {
              label: 'Supplier', // First legend
              data: [200, 80, 120, 250, 60],
              backgroundColor: '#5684AE', // Supplier bar color
              borderRadius: 5,
              barThickness: 20,
            }
          ],
        },
        options: {
          indexAxis: 'y', // Horizontal bar chart
          responsive: true,
          plugins: {
            legend: {
              display: true, // Enable the legend
              labels: {
                font: {
                  family: 'Poppins', // Font family
                  size: 14,
                },
                color: '#5A7F9D', // Legend label color
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: '#CE6D6D', // Spending axis color
                font: {
                  family: 'Poppins', // Font family
                  size: 12,
                },
                stepSize: 50,
              },
            },
            y: {
              ticks: {
                color: '#5684AE', // Supplier names color
                font: {
                  family: 'Poppins', // Font family
                  size: 12,
                },
              },
            },
          },
        },
      };

      new Chart(ctx, chartConfig);
    }
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
