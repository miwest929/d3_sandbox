//var dataset = [ 5, 10, 15, 20, 25 ];
var dataset = [];
for (i=0; i<30; i++) {
  dataset.push( Math.floor((Math.random()*20)+1) );
}

var w = 500;
var h = 100;
var barPadding = 1;
var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
      return i * (w / dataset.length); // Bar width of 20 + 1 for paddin
    })
    .attr("y", function(d) {
      return h - (d * 4);
    })
    .attr("width", w / dataset.length - barPadding)
    .attr("height", function(d) {
      return d * 4;
    })
    .attr("fill", function(d) {
      return "rgb(0, 0, " + (d * 10) + ")";
    });

svg.selectAll("text")
   .data(dataset)
   .enter()
   .append("text")
   .text(function(d) {
     return d;
   })
   .attr("x", function(d, i) {
     return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;  // +5
   })
   .attr("y", function(d) {
     return h - (d * 4) + 14;              // +15
   })
   .attr("font-family", "sans-serif")
   .attr("font-size", "11px")
   .attr("fill", "white")
   .attr("text-anchor", "middle");
