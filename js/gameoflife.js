var WIDTH = 800;
var HEIGHT = 600;
var COLS = 50;
var ROWS = 50;
var CELL_WIDTH = (WIDTH / ROWS);
var CELL_HEIGHT = (HEIGHT / COLS);

var xs = d3.scale.linear().domain([0, ROWS]).range([0, ROWS * CELL_WIDTH]);
var ys = d3.scale.linear().domain([0, COLS]).range([0, COLS * CELL_HEIGHT]);
var svg = createSVG(WIDTH, HEIGHT);

var paintBoard = function(width, height, states) {
  svg.selectAll("rect")
    .data(function() { return toGrid(states, ROWS, COLS); })
    .enter().append("svg:rect")
    .attr("stroke", "none")
    .attr("x", function(d) { return xs(d.x); })
    .attr("y", function(d) { return ys(d.y); })
    .attr("fill", function(d) { return d.state ? "black": "white"})
    .attr("width", CELL_WIDTH)
    .attr("height", CELL_HEIGHT);
}

var initialState = function(rowCnt, colCnt) {
  newStates = [];

  d3.range(rowCnt).forEach(function(x) {
    newStates[x] = new Array();
    d3.range(colCnt).forEach(function(y) {
      newStates[x][y] = Math.random() > 0.8 ? true : false;
    });
  });

  return newStates;
}

var toGrid = function(states, rowCnt, colCnt) {
  var grid = [];

  for(x = 0; x < rowCnt; x++) {
    for(y = 0; y < colCnt; y++) {
      grid.push({"x": x, "y": y, "state": states[x][y]});
    }
  }

  return grid;
}

var countOfLiveNeighbors = function(prevStates, x, y) {
  var isNeighbor = function(offsetX, offsetY) {
    if (prevStates[x+offsetX] === undefined || prevStates[x+offsetX][y+offsetY] === undefined) {
      return 0;
    }
    else if (prevStates[x+offsetX][y+offsetY]) {
      return 1;
    }
    else {
      return 0;
    }
  }

  return (isNeighbor(1, 1) + isNeighbor(1, 0) +
  isNeighbor(1, -1) +
  isNeighbor(0, 1) +
  isNeighbor(0, -1) +
  isNeighbor(-1, 1) +
  isNeighbor(-1, 0) +
  isNeighbor(-1, -1));
}

var nextGeneration = function(states) {
  newStates = Array();
  d3.range(ROWS).forEach(function(x) {
    newStates[x] = Array();
    d3.range(COLS).forEach(function(y) {
      liveNeighbors = countOfLiveNeighbors(states, x, y);
      console.log(liveNeighbors);
      if (states[x][y]) {
        newStates[x][y] = true;
        if(countOfLiveNeighbors(states, x, y) < 2 ||
           countOfLiveNeighbors(states, x, y) > 3) {
          console.log("TURNED OFF!!");
          newStates[x][y] = false;
        }
      }
      else {
        newStates[x][y] = (countOfLiveNeighbors(states, x, y) === 3 ? true : false);
      }
    });
  });

  return newStates;
}

var states = initialState(ROWS, COLS);
paintBoard(WIDTH, HEIGHT, states);

var animate = function() {
  states = nextGeneration(states);

  d3.selectAll("rect")
    .data( toGrid(states, ROWS, COLS) )
    .transition()
    .attr("fill", function(d) { return d.state ? "black" : "white" })
    .delay(1000)
    .duration(0);
}

setInterval("animate()", 100);
