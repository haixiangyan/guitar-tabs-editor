export default {
  getPointCoordinates(point, config) {
    return {
      x: config.origin.x + config.axisOffset.x * point.x,
      y: config.origin.y + config.axisOffset.y * point.y
    }
  },
  getTextCoordinates(point, config) {
    return {
      x: config.origin.x + config.axisOffset.x * point.x,
      y: config.origin.y + config.axisOffset.y * point.y + config.textYAxisOffset
    }
  },
  getCrossCoordinates(point, config) {
    return {
      leftLine: {
        x1: config.origin.x + config.axisOffset.x * point.x - config.crossOffset,
        y1: config.origin.y + config.axisOffset.y * point.y - config.crossOffset,
        x2: config.origin.x + config.axisOffset.x * point.x + config.crossOffset,
        y2: config.origin.y + config.axisOffset.y * point.y + config.crossOffset,
      },
      rightLine: {
        x1: config.origin.x + config.axisOffset.x * point.x + config.crossOffset,
        y1: config.origin.y + config.axisOffset.y * point.y - config.crossOffset,
        x2: config.origin.x + config.axisOffset.x * point.x - config.crossOffset,
        y2: config.origin.y + config.axisOffset.y * point.y + config.crossOffset,
      }
    }
  },
  getMiddleCoordinates(pointA, pointB) {
    return {
      x: (pointA.x + pointB.x) / 2,
      y: (pointA.y + pointB.y) / 2
    }
  },
}