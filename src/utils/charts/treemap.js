/* eslint-disable object-curly-newline */
export default {
  colors: ['#317bbc'], // Apparently not accepting css variable
  chart: {
    toolbar: { show: false },
  },
  plotOptions: {
    treemap: {
      enableShades: true,
    },
  },
  tooltip: {
    y: {
      formatter: val => `${parseFloat(val.toFixed(2)).toLocaleString()}%`,
    },
  },
};
