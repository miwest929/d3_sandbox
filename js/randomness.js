var w = 800;
var h = 600;

var randomN = function(n, low, high) {
  var data = [];
  for(i = 0; i < n; i++) {
    var rnd = Math.floor(Math.random()*Math.random()*(high-low+1)+low);
    data.push(rnd - 50);
  }

  return data;
};

var xdata = randomN(5000, 0, 100);
var ydata = randomN(5000, 0, 100);

var x = d3.scale.linear()
          .domain([-50, 50]) // data
          .range([0, w]); // pixel 

var y = d3.scale.linear()
          .domain([-50, 50])
          .range([h, 0]);

var chart = d3.select('body')
              .append('svg:svg')
              .attr('width', w)
              .attr('height', h)
              .attr('class', 'chart');

var main = chart.append('g')
                .attr('width', w)
                .attr('height', h)
                .attr('class', 'main');

var xAxis = d3.svg.axis()
              .scale(x)
              .orient('bottom');

var yAxis = d3.svg.axis()
              .scale(y)
              .orient('left');

main.append('g')
    .attr('transform', 'translate(0,0)')
    .attr('class', 'main axis date')
    .call(yAxis);

var g = main.append('svg:g');
g.selectAll('scatter-dots')
 .data(ydata)
 .enter()
 .append('svg:circle')
 .attr('cy', function(d) { return y(d); })
 .attr('cx', function(d, i) { return x(xdata[i]); })
 .attr('r', 4)
 .style('opacity', 0.6);

