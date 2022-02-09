/* eslint-disable object-curly-newline */
export default {
  yaxis: {
    labels: {
      formatter: val => (val >= 1000 ? `${Math.round(val) / 1000}k` : Math.round(val)),
    },
  },
  plotOptions: {
    bar: {
      columnWidth: '50%',
      distributed: false,
    },
  },
};
