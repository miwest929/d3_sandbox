var w = 800;
var h = 600;

var triangle = [
  new Segment(new Point(0.3, 0.7), new Point(0.7, 0.7)),
  new Segment(new Point(0.7, 0.7), new Point(0.5, 0.3)),
  new Segment(new Point(0.5, 0.3), new Point(0.3, 0.7)),
];

var polygon = [
  new Segment(new Point(0.3, 0.7), new Point(0.7, 0.7)),
  new Segment(new Point(0.7, 0.7), new Point(0.6, 0.5)),
  new Segment(new Point(0.6, 0.5), new Point(0.9, 0.5)),
  new Segment(new Point(0.9, 0.5), new Point(0.9, 0.8)),
  new Segment(new Point(0.9, 0.8), new Point(0.3, 0.7)),
];

//The data for our line
var koch = new KochCurve(triangle);
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
var iterDir = 1;
var nextIteration = function() {
  if(iterDir == 1 && iteration <= 10) {
    koch.next();
  }
  else if (iterDir == -1 && iteration > 0) {
    koch.prev();
  }
  else if (iterDir == 1) {
    iterDir = -iterDir;
    koch.prev();
  }
  else if (iterDir == -1) {
    iterDir = -iterDir;
    koch.next();
  }

  iteration += iterDir;

  svg.selectAll("path")
     .attr("d", lineFunction(koch.d3Data(w, h)));

  console.log("Koch curve iteration #" + iteration);
}

setInterval(nextIteration, 100);
