function evaluateBezierCurve(startPoint, controlPoint1, controlPoint2, endPoint, t) {
    var x = (1 - t) * (1 - t) * (1 - t) * startPoint[0] +
            3 * (1 - t) * (1 - t) * t * controlPoint1[0] +
            3 * (1 - t) * t * t * controlPoint2[0] +
            t * t * t * endPoint[0];
    
    var y = (1 - t) * (1 - t) * (1 - t) * startPoint[1] +
            3 * (1 - t) * (1 - t) * t * controlPoint1[1] +
            3 * (1 - t) * t * t * controlPoint2[1] +
            t * t * t * endPoint[1];
            
    return [x, y];
}
