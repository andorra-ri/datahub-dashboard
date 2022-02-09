/* eslint-disable object-curly-newline */
export default {
  chart: { type: 'donut' },
  plotOptions: {
    pie: {
      offsetY: 20,
      donut: {
        size: '85',
        labels: {
          show: 'true',
          name: {
            show: true,
            fontSize: '0.9em',
            fontFamily: 'Nunito Sans, sans-serif',
            offsetY: -10,
          },
          value: {
            show: true,
            fontSize: '1.5em',
            fontFamily: 'Nunito Sans, sans-serif',
            offsetY: -5,
            formatter: value => Math.round(value * 100) / 100,
          },
          total: {
            show: true,
            label: 'Total',
            color: '#000',
            formatter: w => {
              const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
              return Math.round(total * 100) / 100;
            },
          },
        },
      },
    },
  },
};
