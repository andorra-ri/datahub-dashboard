/* eslint-disable object-curly-newline */
export default {
	stroke: {
		show: true,
		curve: 'smooth', // smooth - straight
		lineCap: 'butt', // butt - square - round
		width: 2,
		dashArray: 0,
	},
	yaxis: {
		labels: {
			formatter: val => (val >= 1000 ? `${Math.round(val) / 1000}k` : Math.round(val)),
		},
	},
};
