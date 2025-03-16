import { Component, computed, input, InputSignal, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.scss'],
  standalone: false,
})
export class WeatherDisplayComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  name = '';
  country = '';
  currentWeather: Weather | any = input<Weather>();
  foreCastList: InputSignal<any | undefined> = input<any>();
  loaded = true;
  iconUrl = 'https://openweathermap.org/img/wn/50n@2x.png';
  temperatureData = this.foreCastList()?.list.map((item: any) => ({
    x: new Date(item.dt_txt).getTime(),
    y: item.main.temp,
  }));

  windSpeedData = this.foreCastList()?.list.map((item: any) => ({
    x: new Date(item.dt_txt).getTime(),
    y: item.wind.speed,
  }));

  temperatureChartOptions: Highcharts.Options = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Temperature Forecast',
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Time',
      },
      labels: {
        format: '{value:%Y-%m-%d %H:%M}',
      },
    },
    yAxis: {
      title: {
        text: 'Temperature (°C)',
      },
    },
    tooltip: {
      xDateFormat: '%Y-%m-%d %H:%M',
      valueSuffix: ' °C',
    },
    series: [
      {
        name: 'Temperature',
        data: this.foreCastList()?.list.map((item: any) => ({
          x: new Date(item.dt_txt).getTime(),
          y: item.main.temp,
        })),
        type: 'line',
      },
    ],
  };

  windSpeedChartOptions: Highcharts.Options = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Wind Speed Forecast',
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Time',
      },
      labels: {
        format: '{value:%Y-%m-%d %H:%M}',
      },
    },
    yAxis: {
      title: {
        text: 'Wind Speed (m/s)',
      },
    },
    tooltip: {
      xDateFormat: '%Y-%m-%d %H:%M',
      valueSuffix: ' m/s',
    },
    series: [
      {
        name: 'Wind Speed',
        data: this.foreCastList()?.list.map((item: any) => ({
          x: new Date(item.dt_txt).getTime(),
          y: item.wind.speed,
        })),
        type: 'line',
      },
    ],
  };

  constructor() {
    setTimeout(() => {
      this.temperatureChartOptions = {
        chart: {
          type: 'line',
        },
        title: {
          text: 'Temperature Forecast',
        },
        xAxis: {
          type: 'datetime',
          title: {
            text: 'Time',
          },
          labels: {
            formatter: function () {
              return Highcharts.dateFormat(
                '%e %b',
                this.value as unknown as any
              );
            },
          },
        },
        yAxis: {
          title: {
            text: 'Temperature (°C)',
          },
        },
        tooltip: {
          xDateFormat: '%e %b %Y %H:%M',
          valueSuffix: ' °C',
        },
        series: [
          {
            name: 'Temperature',
            data: this.foreCastList()?.list.map((item: any) => ({
              x: new Date(item.dt_txt).getTime(),
              y: item.main.temp,
            })),
            type: 'line',
          },
        ],
      };
      this.windSpeedChartOptions = {
        chart: {
          type: 'line',
        },
        title: {
          text: 'Wind Speed Forecast',
        },
        xAxis: {
          type: 'datetime',
          title: {
            text: 'Time',
          },
          labels: {
            formatter: function () {
              return Highcharts.dateFormat(
                '%e %b',
                this.value as unknown as any
              );
            },
          },
        },
        yAxis: {
          title: {
            text: 'Wind Speed (m/s)',
          },
        },
        tooltip: {
          xDateFormat: '%e %b %Y %H:%M',
          valueSuffix: ' m/s',
        },
        series: [
          {
            name: 'Wind Speed',
            data: this.foreCastList()?.list.map((item: any) => ({
              x: new Date(item.dt_txt).getTime(),
              y: item.wind.speed,
            })),
            type: 'line',
          },
        ],
      };
    }, 3000);
  }

  ngOnInit() {}
  convertTimestampToDayMonth(timestamp: number) {
    const date = new Date(timestamp * 1000); // Multiply by 1000 as JavaScript uses milliseconds
    const day = date.getDate();
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const monthIndex = date.getMonth();
    const monthName = monthNames[monthIndex];
    return `${day}-${monthName}`;
  }
}

interface Weather {
  coord: {};
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: { speed: number; deg: number };
  clouds: { all: number };
  rain?: {};
  snow?: {};
  dt: number;
  sys: {};
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
