/* eslint-disable object-curly-newline */
export default {
	colors: ['#461ea3', '#a28ed1', '#d2d2d2'],
	dataLabels: {
		enabled: false,
		enabledOnSeries: true,
		textAnchor: 'middle',
		style: {
			fontSize: '10px',
			fontFamily: 'Nunito Sans, sans-serif',
			colors: ['#a28ed1', '#461ea3', '#888'],
		},
	},
	chart: {
		toolbar: {
			show: true,
			tools: {
				download: false,
				zoom: false,
				zoomin: true,
				zoomout: true,
				pan: true,
				reset: false,
			},
		},
	},
	legend: {
		show: true,
		showForSingleSeries: false,
		position: 'top',
		horizontalAlign: 'left',
		fontSize: '12px',
		fontFamily: 'Nunito Sans, sans-serif',
		markers: { width: 9, height: 9, radius: 2 },
		itemMargin: { horizontal: 0, vertical: 5 },
		onItemClick: { toggleDataSeries: true },
		onItemHover: { highlightDataSeries: true },
	},
	xaxis: {
		type: 'categories',
		labels: {
			show: true,
			rotate: 0,
			offsetY: 0,
			style: { colors: '#bcc6d3', fontSize: '10px', fontFamily: 'Nunito Sans, sans-serif' },
		},
		axisBorder: { show: false },
		axisTicks: { show: false },
	},
	yaxis: {
		show: true,
		labels: {
			show: true,
			style: { color: '#bcc6d3', fontSize: '10px', fontFamily: 'Nunito Sans, sans-serif' },
		},
	},
	tooltip: {
		enabled: true,
		intersect: false,
		shared: true,
		theme: 'dark',
		style: { fontSize: '12px', fontFamily: 'Nunito Sans, sans-serif' },
		x: { show: false },
		y: { formatter: value => Math.round(value * 100) / 100 },
		marker: { show: false },
	},
	grid: {
		show: true,
		borderColor: '#e7e9f1',
		position: 'back',
		xaxis: {
			lines: { 	show: false },
		},
		yaxis: {
			lines: { show: true },
		},
	},
	states: {
		hover: { filter: { type: 'none', value: 0 } },
	},
};
