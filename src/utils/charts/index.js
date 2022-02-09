/* eslint-disable object-curly-newline */
import mergeDeep from '../merge-deep';

import Global from './global';
import Line from './line';
import Column from './column';
import Donut from './donut';
import Heatmap from './heatmap';
import Area from './area';
import SingleColumn from './single-column';

export default {
  line: mergeDeep(Global, Line),
  column: mergeDeep(Global, Column),
  donut: mergeDeep(Global, Donut),
  heatmap: mergeDeep(Global, Heatmap),
  area: mergeDeep(Global, Area),
  singleColumn: mergeDeep(Global, SingleColumn),
};
