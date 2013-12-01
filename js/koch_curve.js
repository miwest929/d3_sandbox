var KochCurve = function() {
  var Segment = function(start, end) {
    this.startPt = start;
    this.endPt = end;
  };

  var Point = function(x, y) {
    this.x = x;
    this.y = y;

    this.add = function(pt) {
      return (new Point(this.x + pt.x, this.y + pt.y));
    }

    this.sub = function(pt) {
      return (new Point(this.x - pt.x, this.y - pt.y));
    }

    this.mul = function(multiplier) {
      return (new Point(this.x * multiplier, this.y * multiplier));
    }

    this.div = function(divisor) {
      return (new Point(this.x / divisor, this.y / divisor));
    }
  }

  this.segments = [new Segment(new Point(0, 0.5), new Point(1.0, 0.5))];

  this.next = function() {
    if (this.segments.length >= 5000) {
      console.log("Koch curve has " + this.segments.length + " segments. Further iterations will be no-ops.");
      return;
    }

    var newSegments = [];
    for(segmentIndex in this.segments) {
      var currSegment = this.segments[segmentIndex];
      var pt1 = currSegment.startPt.mul(2).add(currSegment.endPt).div(3);
      var pt3 = currSegment.endPt.mul(2).add(currSegment.startPt).div(3);

      // pt2 = pt1 + R(pt3 − pt1).
      var multiplierPt = pt3.sub(pt1);

      // If you want next point facing down instead. Use +60 degrees (+1.04719 radians).
      var rotatedPt = new Point(
        Math.cos(-1.04719) * multiplierPt.x + -Math.sin(-1.04719) * multiplierPt.y,
        Math.sin(-1.04719) * multiplierPt.x + Math.cos(-1.04719) * multiplierPt.y
      );
      var pt2 = pt1.add(rotatedPt);

      newSegments.push(new Segment(currSegment.startPt, pt1));
      newSegments.push(new Segment(pt1, pt2));
      newSegments.push(new Segment(pt2, pt3));
      newSegments.push(new Segment(pt3, currSegment.endPt));
    }

    this.segments = newSegments;
  };

  this.d3Data = function(xScale, yScale) {
    var data = [];
    for(segmentIndex in this.segments) {
      var currSegment = this.segments[segmentIndex];

      data.push({"x": currSegment.startPt.x * xScale, "y": currSegment.startPt.y * yScale});
      data.push({"x": currSegment.endPt.x * xScale, "y": currSegment.endPt.y * yScale});
    }

    return data;
  };
};
