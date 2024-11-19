import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-requests-chart',
  templateUrl: './requests-chart.component.html',
  styleUrls: ['./requests-chart.component.css']
})
export class RequestsChartComponent {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  startDate: string | null = null;
  endDate: string | null = null;
  dateRange: string = '';
  showPicker: boolean = false;
  ngAfterViewInit(): void {
    this.createChart();
  }

  createChart() {
    const ctx = document.getElementById('donutChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Approved', 'Rejected', 'Pending'],
        datasets: [
          {
            label: 'Total Requests',
            data: [123, 123, 123],
            backgroundColor: ['#88c057', '#f56968', '#5e99c9'], // Green, Red, Blue
            borderWidth: 2,
            hoverOffset: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            enabled: true,
            callbacks: {
              label: (tooltipItem:any) => {
                const percentage = (
                  (tooltipItem.raw as number) /
                  369
                ).toFixed(2);
                return `${tooltipItem.label}: ${percentage}%`;
              }
            }
          },
          legend: {
            display: false
          }
        },
        cutout: '70%' // Creates the donut shape
      },
      plugins: [
        {
          id: 'centerTextPlugin',
          beforeDraw: function (chart) {
            const width = chart.width!;
            const height = chart.height!;
            const ctx = chart.ctx!;
            ctx.restore();
            const fontSize = (height / 120).toFixed(2);
            ctx.font = `${fontSize}em Poppins`;
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#000';

            const text = '4764';
            const textX = Math.round((width - ctx.measureText(text).width) / 2);
            const textY = height / 2 - 10;

            ctx.fillText(text, textX, textY);

            ctx.font = '16px Poppins';
            ctx.fillText('Total Requests', textX, textY + 30);
            ctx.save();
          }
        }
      ]
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
