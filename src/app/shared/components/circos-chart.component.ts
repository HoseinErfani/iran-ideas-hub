import { Component, Input, OnChanges } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';

@Component({
  selector: 'app-circos-chart',
  standalone: true,
  imports: [NgxEchartsDirective],
  template: `<div echarts [options]="chartOption" class="h-96 w-full"></div>`,
})
export class CircosChartComponent implements OnChanges {
  @Input() nodes: any[] = [];
  @Input() links: any[] = [];
  chartOption: any;
  ngOnChanges() {
    this.chartOption = {
      // تنظیمات عمومی فونت
      textStyle: { fontFamily: 'IRANSans' },

      // شخصی‌سازی Tooltip مدرن
      tooltip: {
        backgroundColor: 'rgba(30, 41, 59, 0.9)',
        borderColor: '#334155',
        textStyle: { color: '#f1f5f9', fontFamily: 'IRANSans' },
        borderWidth: 1,
      },

      series: [
        {
          type: 'graph',
          layout: 'circular',
          symbolSize: 45, // اندازه بزرگتر گره‌ها برای حالت متریال
          roam: true, // امکان زوم و جابجایی
          label: {
            show: true,
            fontFamily: 'IRANSans',
            fontSize: 12,
            fontWeight: 'bold',
            color: '#fff',
          },
          edgeSymbol: ['circle', 'arrow'],
          edgeSymbolSize: [4, 10],
          data: this.nodes.map((n, index) => ({
            name: n.id,
            label: { formatter: n.label },
            itemStyle: {
              color: [
                '#7dd3fc', // Sky Blue
                '#f87171', // Red
                '#4ade80', // Green
                '#fbbf24', // Amber
                '#c084fc', // Purple
                '#fb7185', // Rose
              ][index % 5],
              shadowBlur: 10,
              shadowColor: 'rgba(0,0,0,0.3)',
            },
          })),
          links: this.links.map((l) => ({
            source: l.source,
            target: l.target,
            lineStyle: {
              width: Math.sqrt(l.value) * 0.8, // ضخامت هوشمند
              curveness: 0.3,
              color: '#cbd5e1',
            },
          })),
          emphasis: {
            focus: 'adjacency',
            lineStyle: { width: 6, color: '#f8fafc' },
          },
        },
      ],
    };
  }
}
