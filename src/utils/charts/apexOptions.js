/* eslint-disable object-curly-newline */
import mergeDeep from '../mergeDeep';
import apexGlobalOptions from './apexGlobalOptions';
import apexLineOptions from './apexLineOptions';
import apexColumnOptions from './apexColumnOptions';
import apexDonutOptions from './apexDonutOptions';
import apexHeatmapOptions from './apexHeatmapOptions';
import apexAreaOptions from './apexAreaOptions';
import apexSingleColumnOptions from './apexSingleColumnOptions';

const apexOptions = {
	line: mergeDeep(apexGlobalOptions, apexLineOptions),
	column: mergeDeep(apexGlobalOptions, apexColumnOptions),
	donut: mergeDeep(apexGlobalOptions, apexDonutOptions),
	heatmap: mergeDeep(apexGlobalOptions, apexHeatmapOptions),
	area: mergeDeep(apexGlobalOptions, apexAreaOptions),
	singleColumn: mergeDeep(apexGlobalOptions, apexSingleColumnOptions),
};

export { apexOptions, mergeDeep };
