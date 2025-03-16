import { Component, Input, input, InputSignal, OnInit } from '@angular/core';
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
  isCelsius: InputSignal<boolean | undefined> = input<boolean>();
  foreCastList = { list: [] };
  @Input('foreCastList') set updateForeCastListInput(val: { list: never[] }) {
    this.foreCastList = val;
    this.updateTempAndWind();
  }
  loaded = true;
  iconUrl = 'https://openweathermap.org/img/wn/50n@2x.png';
  temperatureChartOptions: Highcharts.Options = {};
  windSpeedChartOptions: Highcharts.Options = {};
  constructor() {}

  ngOnInit() {}
  getTemperatureClass(): { [key: string]: boolean } {
    const temp = this.currentWeather()?.main?.temp;
    const isCelsius = this.isCelsius();

    if (temp === undefined) {
      return {}; // Return empty object if temperature is not available.
    }

    let temperatureInCelsius = temp;

    if (!isCelsius) {
      // Convert Fahrenheit to Celsius
      temperatureInCelsius = ((temp - 32) * 5) / 9;
    }

    return {
      blue: temperatureInCelsius < 5,
      yellow: 5 <= temperatureInCelsius && temperatureInCelsius < 15,
      orange: 15 <= temperatureInCelsius && temperatureInCelsius < 25,
      red: temperatureInCelsius >= 25,
    };
  }
  updateTempAndWind() {
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
            return Highcharts.dateFormat('%e %b', this.value as unknown as any);
          },
        },
      },
      yAxis: {
        title: {
          text: `Temperature (${this.isCelsius() ? '°C' : '°F'})`,
        },
      },
      tooltip: {
        xDateFormat: '%e %b %Y %H:%M',
        valueSuffix: `${this.isCelsius() ? ' °C' : ' °F'}`,
      },
      series: [
        {
          name: 'Temperature',
          // data: this.foreCastList()?.list.map((item: any) => ({
          //   x: new Date(item.dt_txt).getTime(),
          //   y: item.main.temp,
          // })),
          data: this.foreCastList?.list.map((item: any) => ({
            x: new Date(item.dt_txt).getTime(),
            y: item.main.temp,
          })) as unknown as any,
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
            return Highcharts.dateFormat('%e %b', this.value as unknown as any);
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
          // data: this.foreCastList()?.list.map((item: any) => ({
          //   x: new Date(item.dt_txt).getTime(),
          //   y: item.wind.speed,
          // })),
          data: this.foreCastList?.list.map((item: any) => ({
            x: new Date(item.dt_txt).getTime(),
            y: item.wind.speed,
          })) as unknown as any,
          type: 'line',
        },
      ],
    };
  }
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
