/**
 * @fileoverview Pie chart.
 * @author NHN Ent.
 *         FE Development Team <dl_javascript@nhnent.com>
 */

'use strict';

var ChartBase = require('./chartBase'),
    Legend = require('../legends/legend'),
    Tooltip = require('../tooltips/tooltip'),
    Series = require('../series/pieChartSeries');

var PieChart = ne.util.defineClass(ChartBase, /** @lends PieChart.prototype */ {
    /**
     * Column chart.
     * @constructs PieChart
     * @extends ChartBase
     * @param {array.<array>} userData chart data
     * @param {object} theme chart theme
     * @param {object} options chart options
     */
    init: function(userData, theme, options) {
        var baseData = this.makeBaseData(userData, theme, options),
            convertData = baseData.convertData,
            bounds = baseData.bounds;

        this.className = 'ne-pie-chart';

        options.tooltip = options.tooltip || {};

        if (!options.tooltip.position) {
            options.tooltip.position = 'center middle';
        }

        ChartBase.call(this, bounds, theme, options);

        this._addComponents(convertData, theme.chart.background, bounds, options);
    },

    /**
     * Add components
     * @param {object} convertData converted data
     * @param {object} chartBackground chart background
     * @param {array.<object>} bounds bounds
     * @param {object} options chart options
     * @private
     */
    _addComponents: function(convertData, chartBackground, bounds, options) {
        if (convertData.joinLegendLabels && (!options.series || !options.series.legendType)) {
            this.addComponent('legend', Legend, {
                joinLegendLabels: convertData.joinLegendLabels,
                legendLabels: convertData.legendLabels,
                chartType: options.chartType
            });
        }

        this.addComponent('tooltip', Tooltip, {
            values: convertData.formattedValues,
            labels: convertData.labels,
            legendLabels: convertData.legendLabels,
            prefix: this.tooltipPrefix
        });

        this.addComponent('series', Series, {
            libType: options.libType,
            chartType: options.chartType,
            tooltipPrefix: this.tooltipPrefix,
            chartBackground: chartBackground,
            data: {
                values: convertData.values,
                formattedValues: convertData.formattedValues,
                legendLabels: convertData.legendLabels,
                chartWidth: bounds.chart.dimension.width
            }
        });
    }
});

module.exports = PieChart;
