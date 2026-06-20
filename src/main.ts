import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })),
    provideCharts(withDefaultRegisterables()), // این خط برای کار کردن لایبرری الزامی است
    provideEchartsCore({ echarts }),
  ],
}).catch((err) => console.error(err));
