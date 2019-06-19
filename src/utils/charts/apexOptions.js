/* eslint-disable object-curly-newline */
import mergeDeep from '../mergeDeep';
import apexGlobalOptions from './apexGlobalOptions';
import apexLineOptions from './apexLineOptions';
import apexColumnOptions from './apexColumnOptions';
import apexDonutOptions from './apexDonutOptions';
import apexHeatmapOptions from './apexHeatmapOptions';

const apexOptions = {
	line: mergeDeep(apexGlobalOptions, apexLineOptions),
	column: mergeDeep(apexGlobalOptions, apexColumnOptions),
	donut: mergeDeep(apexGlobalOptions, apexDonutOptions),
	heatmap: mergeDeep(apexGlobalOptions, apexHeatmapOptions),
};

export { apexOptions, mergeDeep };
