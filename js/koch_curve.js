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

  this.rotate = function(radian) {
    return (new Point(
      Math.cos(radian) * this.x + -Math.sin(radian) * this.y,
      Math.sin(radian) * this.x + Math.cos(radian) * this.y
    ));
  }
}

var KochCurve = function(initialSegments) {
  if (typeof(initialSegments) === 'undefined') {
    this.segments = [new Segment(new Point(0, 0.5), new Point(1.0, 0.5))];
  }
  else {
    this.segments = initialSegments;
  }

  this.prev = function() {
    var newSegments = [];

    if (this.segments.length <= 4) {
      return;
    }

    for(segmentIndex = 0; segmentIndex < this.segments.length; segmentIndex += 4) {
      var firstSegment = this.segments[segmentIndex];
      var fourthSegment = this.segments[segmentIndex+3];

      if (fourthSegment === undefined) {
        newSegments.push(firstSegment);
      }
      else {
        newSegments.push(new Segment(firstSegment.startPt, fourthSegment.endPt));
      }
    }

    this.segments = newSegments;
  }

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
      var pt2 = pt3.sub(pt1).rotate(1.04719).add(pt1);

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
