var code = "class Vertex\n  attr_reader :label, :edges\n\n  def initialize(label)\n    @label = label\n    @edges = []\n  end\n\n\n  def add(vertex, weight)\n    raise \"Error: Not a Vertex object\" unless vertex.is_a?(Vertex)\n\n\n    @edges << Edge.new(self, vertex, weight)\n  end\nend\n\nclass Edge\n  attr_reader :start, :end, :weight\n\n  def initialize(start, end, weight)\n    @start = start\n    @end = end\n    @weight = weight\n  end\nend\n\nmap = [\n  [2,3,1,0],\n  [0,5,0,3],\n  [1,2,3,0],\n  [2,2,0,5]\n]\n\nmap.each_with_index do |row|\n  row.each do |weight|\n\n  end\nend";

var dataset = code.split("\n");
var maxLineLen = dataset[0].length;
for (i = 1; i < dataset.length; i++) {
  if (dataset[i].length > maxLineLen)
    maxLineLen = dataset[i].length;
}

var w = 800;
var h = 600;
var svg = d3.select('body')
            .append('svg')
            .attr('width', w)
            .attr('height', h);

String.prototype.findFirstNot = function(ch) {
  for (i = 0; i < this.length; i++) {
    if (this[i] != ch)
      return i;
  }

  return 0;
}

svg.selectAll('rect')
   .data(dataset)
   .enter()
   .append('rect')
   .attr('x', function(d, i) {
     return d.findFirstNot(' ') * (w / maxLineLen);
   })
   .attr('y', function(d, i) {
     return i * (h / dataset.length);
   })
   .attr('width', function(d, i) {
     return (d.length - d.findFirstNot(' ')) * (w / maxLineLen);
   })
   .attr('height', function(d, i) {
     return (h / dataset.length);
   })
   .attr('fill', function(d) {
     return "rgb(0, 128, 128)";
   });

/*
class Edge
  attr_reader :start, :end, :weight

  def initialize(start, end, weight)
    @start = start
    @end = end
    @weight = weight
  end
end

map = [
  [2,3,1,0],
  [0,5,0,3],
  [1,2,3,0],
  [2,2,0,5]
]

map.each_with_index do |row|
  row.each do |weight|

  end
end"
*/


