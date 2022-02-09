export default {
  colors: ['#461ea3', '#a28ed1', '#2e146c', '#8d68e3', '#411c97', '#6d3ddb', '#8d68e3', '#5324c2', '#cebef3', '#d2d2d2'],
  chart: {
    stacked: true,
    stackType: '100%',
    toolbar: { show: false },
  },
  plotOptions: {
    bar: {
      horizontal: true,
      columnWidth: undefined,
    },
  },
  stroke: {
    width: 1,
    colors: ['#fff'],
  },
  xaxis: {
    labels: { show: false },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: { labels: { show: false } },
  tooltip: {
    followCursor: true,
    x: { show: false },
    y: { formatter: val => `${val}%` },
  },
  fill: { opacity: 1 },
  legend: {
    position: 'bottom',
    horizontalAlign: 'left',
  },
};
