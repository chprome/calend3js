var d3 = require('d3'),
    moment = require('./moment.fr');

var MONTHS = [
    moment([2014,0]),
    moment([2014,1]),
    moment([2014,2]),
    moment([2014,3]),
    moment([2014,4]),
    moment([2014,5]),
    moment([2014,6]),
    moment([2014,7]),
    moment([2014,8]),
    moment([2014,9]),
    moment([2014,10]),
    moment([2014,11])
];

var EVENTS = [
    {
        label: 'Fermé',
        from: moment([2014, 0, 1]),
        to: moment([2014, 1, 13])
    },
    {
        label: 'Vendredi, Samedi, Dimanche midi',
        from: moment([2014, 1, 14]),
        to: moment([2014, 3, 12])
    },
    {
        label: '7/7j - midi',
        from: moment([2014, 3, 13]),
        to: moment([2014, 4, 31])
    },
    {
        label: '7/7j - midi & soir',
        from: moment([2014, 5, 1]),
        to: moment([2014, 8, 30])
    },
    {
        label: '7/7j - midi',
        from: moment([2014, 9, 1]),
        to: moment([2014, 9, 31])
    },
    {
        label: 'Vendredi, Samedi, Dimanche midi',
        from: moment([2014, 10, 1]),
        to: moment([2014, 11, 31])
    }
];

function Calend3js(selector) {
    var w = 365*4,
        h = 150,
        monthH = 30,
        eventH = h - monthH;

    function createSvg() {
        return d3.select(this.selector)
                    .append('svg')
                    .attr({
                        'width': w,
                        'height': h
                    });
    }

    function drawWrapper(svg) {
        svg.append('rect')
            .attr({
                'x': 0,
                'y': 0,
                'width': w,
                'height': h,
                'class': 'background'
            });
    }

    function drawMonths(svg) {
        var months = svg.selectAll('months')
            .data(MONTHS)
            .enter()
            .append('g')
            .attr('class','month');

        months.append('rect')
            .attr({
                'x': function(d, i) {
                    return (d.dayOfYear()-1)*w/365;
                },
                'y': 0,
                'width': function(d, i) {
                    return d.daysInMonth()*w/365;
                },
                height: monthH
            });

        months.append('text')
               .text(function(d) {
                    return d.format('MMMM');
               })
               .attr({
                    'text-anchor': 'middle',
                    'x': function(d, i) {
                        return d.dayOfYear()*w/365 + (d.daysInMonth()*w/365 / 2);
                    },
                    'y': monthH/2+5,
                });
    }

    function drawEvents(svg) {
        var events = svg.selectAll('events')
            .data(EVENTS)
            .enter()
            .append('g')
            .attr('class', 'event');

        events.append('rect')
            .attr({
                'x': function(d, i) {
                    return (d.from.dayOfYear()-1)*w/365;
                },
                'y': monthH,
                'width': function(d, i) {
                    return (d.to.dayOfYear()-1)*w/365 - (d.from.dayOfYear()-2)*w/365;
                },
                height: eventH
            });

        // label
        events.append('text')
               .text(function(d) {
                    return d.label;
               })
               .attr({
                    'x': function(d, i) {
                        return d.from.dayOfYear()*w/365 + ((d.to.dayOfYear()-1)*w/365 - (d.from.dayOfYear()-2)*w/365)/2;
                    },
                    'y': monthH+eventH/2+5,
                    'text-anchor': 'middle',
                    'class': 'label'
                });

        // start date
        events.append('text')
               .text(function(d) {
                    return d.from.date();
               })
               .attr({
                    // 'text-anchor': 'middle',
                    'x': function(d, i) {
                        return d.from.dayOfYear()*w/365;
                    },
                    'y': monthH+eventH-5,
                    'class': 'start'
                });        
    }

    function drawToday(svg) {
        var today = moment(),
            x = today.dayOfYear()*w/365;

        svg.append('line')
            .attr({
                'class': 'today',
                'x1': x,
                'y1': monthH,
                'x2': x,
                'y2': monthH + eventH
            });
    }

    this.selector = selector;

    this.render = function() {
        var svg = createSvg.call(this);
        drawWrapper.call(this,svg);
        drawMonths.call(this,svg);
        drawEvents.call(this,svg);
        drawToday.call(this, svg);
    };
}



module.exports = Calend3js;