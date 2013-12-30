var createSVG = function(width, height) {
 return d3.select('body')
          .append('svg')
          .attr('width', width)
          .attr('height', height);
}
