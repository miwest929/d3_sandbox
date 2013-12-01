var w = 800;
var h = 600;

//The data for our line
var koch = new KochCurve([
  new Segment(new Point(0.3, 0.3), new Point(0.7, 0.3)),
  new Segment(new Point(0.7, 0.3), new Point(0.7, 0.7)),
  new Segment(new Point(0.7, 0.7), new Point(0.3, 0.7)),
  new Segment(new Point(0.3, 0.7), new Point(0.3, 0.3))
]);
var lineFunction = d3.svg.line()
                         .x(function(d) { return d.x; })
                         .y(function(d) { return d.y; })
                         .interpolate("linear");

var svg = createSVG(w, h);

//The line SVG Path we draw
var lineGraph = svg.append("path")
                   .attr("d", lineFunction(koch.d3Data(w, h)))
                   .attr("stroke", "blue")
                   .attr("stroke-width", 2)
                   .attr("fill", "none");

var iteration = 0;
var nextIteration = function() {
  koch.next();
  svg.selectAll("path")
     .attr("d", lineFunction(koch.d3Data(w, h)));

  console.log("Koch curve iteration #" + iteration);
  iteration += 1;
}

setInterval(nextIteration, 500);
