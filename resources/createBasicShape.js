function generateTorus(x, y, z, c1, c2, c3, radius1, radius2, segments1, segments2, rotationX, rotationY, rotationZ) {
  var vertices = [];
  var colors = [];

  for (var i = 0; i <= segments1; i++) {
      var u = (2 * Math.PI * i) / segments1;

      for (var j = 0; j <= segments2; j++) {
          var v = (2 * Math.PI * j) / segments2;

          // Calculate vertex position relative to torus's center
          var torusCenterX = x + ((radius1 + radius2 * Math.cos(v)) * Math.cos(u));
          var torusCenterY = y + ((radius1 + radius2 * Math.cos(v)) * Math.sin(u));
          var torusCenterZ = z + (radius2 * Math.sin(v));

          // Apply rotations relative to the torus's center
          var rotatedX = torusCenterX - x;
          var rotatedY = torusCenterY - y;
          var rotatedZ = torusCenterZ - z;

          // Rotate around X axis
          var tempY = rotatedY;
          rotatedY = tempY * Math.cos(rotationX) - rotatedZ * Math.sin(rotationX);
          rotatedZ = tempY * Math.sin(rotationX) + rotatedZ * Math.cos(rotationX);

          // Rotate around Y axis
          var tempX = rotatedX;
          rotatedX = tempX * Math.cos(rotationY) - rotatedZ * Math.sin(rotationY);
          rotatedZ = -tempX * Math.sin(rotationY) + rotatedZ * Math.cos(rotationY);

          // Rotate around Z axis
          var tempX2 = rotatedX;
          rotatedX = tempX2 * Math.cos(rotationZ) - rotatedY * Math.sin(rotationZ);
          rotatedY = tempX2 * Math.sin(rotationZ) + rotatedY * Math.cos(rotationZ);

          // Translate the vertex back to its original position relative to the torus's center
          rotatedX += x;
          rotatedY += y;
          rotatedZ += z;

          vertices.push(rotatedX, rotatedY, rotatedZ);
        
          colors.push(c1,c2,c3);
      }
  }

  var faces = [];
  for (var i = 0; i < segments1; i++) {
      for (var j = 0; j < segments2; j++) {
          var index = i * (segments2 + 1) + j;
          var nextIndex = index + segments2 + 1;

          faces.push(index, nextIndex, index + 1);
          faces.push(nextIndex, nextIndex + 1, index + 1);
      }
  }

  return { vertices: vertices, colors: colors, faces: faces };
}
function generateElipticParabloid(x, y, z, c1, c2, c3, a, b, c, segments, rotationX, rotationY, rotationZ) {
    var vertices = [];
    var colors = [];
  
    for (var i = 0; i <= segments; i++) {
        var u = -Math.PI + (2 * Math.PI * i) / segments;
  
        for (var j = 0; j <= segments; j++) {
            var v = (2 * j) / segments;
  
            var xCoord = x + (a * v * Math.cos(u));
            var yCoord = y + (b * v * Math.sin(u));
            var zCoord = z + (c * Math.pow(v, 2));
  
            // Apply rotations
            var rotatedX = xCoord - x;
            var rotatedY = yCoord - y;
            var rotatedZ = zCoord - z;
  
            // Rotate around X axis
            var tempY = rotatedY;
            rotatedY = tempY * Math.cos(rotationX) + rotatedZ * Math.sin(rotationX);
            rotatedZ = -tempY * Math.sin(rotationX) + rotatedZ * Math.cos(rotationX);
  
            // Rotate around Y axis
            var tempX = rotatedX;
            rotatedX = tempX * Math.cos(rotationY) - rotatedZ * Math.sin(rotationY);
            rotatedZ = tempX * Math.sin(rotationY) + rotatedZ * Math.cos(rotationY);
  
            // Rotate around Z axis
            var tempX2 = rotatedX;
            rotatedX = tempX2 * Math.cos(rotationZ) + rotatedY * Math.sin(rotationZ);
            rotatedY = -tempX2 * Math.sin(rotationZ) + rotatedY * Math.cos(rotationZ);
  
            // Translate the vertex back to its original position
            rotatedX += x;
            rotatedY += y;
            rotatedZ += z;
  
            vertices.push(rotatedX, rotatedY, rotatedZ);
  
            colors.push(c1, c2, c3);
        }
    }
  
    var faces = [];
    for (var i = 0; i < segments; i++) {
        for (var j = 0; j < segments; j++) {
            var index = i * (segments + 1) + j;
            var nextIndex = index + segments + 1;
  
            faces.push(index, nextIndex, index + 1);
            faces.push(nextIndex, nextIndex + 1, index + 1);
        }
    }
  
    return { vertices: vertices, colors: colors, faces: faces };
}




function generateCurvedTriangle(x, y, z, c1, c2, c3, radius1, radius2, segments1, segments2) {
    var vertices = [];
    var colors = [];
  
    for (var i = 0; i <= segments1; i++) {
        var u = (2 * Math.PI * i) / segments1;
  
        for (var j = 0; j <= segments2; j++) {
            var v = (2 * Math.PI * j) / segments2;
  
            var xCoord = x + ((radius1 + radius2 * Math.cos(u)) * Math.cos(v));
            var yCoord = y + ((radius1 + radius2 * Math.sin(u)) * Math.sin(u));
            var zCoord = z + (radius2 * Math.sin(v));
  
            vertices.push(xCoord, yCoord, zCoord);
  
            colors.push(c1,c2,c3);
        }
    }
  
    var faces = [];
    for (var i = 0; i < segments1; i++) {
        for (var j = 0; j < segments2; j++) {
            var index = i * (segments2 + 1) + j;
            var nextIndex = index + segments2 + 1;
  
            faces.push(index, nextIndex, index + 1);
            faces.push(nextIndex, nextIndex + 1, index + 1);
        }
    }
  
    return { vertices: vertices, colors: colors, faces: faces };
}


function generateSphere(x, y, z, c1, c2, c3, radius, segments) {
    var vertices = [];
    var colors = [];

    var ball_color = [
        [c1,c2,c3]
    ];
  
    for (var i = 0; i <= segments; i++) {
        var latAngle = Math.PI * (-0.5 + (i / segments));
        var sinLat = Math.sin(latAngle);
        var cosLat = Math.cos(latAngle);
  
        for (var j = 0; j <= segments; j++) {
            var lonAngle = 2 * Math.PI * (j / segments);
            var sinLon = Math.sin(lonAngle);
            var cosLon = Math.cos(lonAngle);
  
            var xCoord = cosLon * cosLat;
            var yCoord = sinLon * cosLat;
            var zCoord = sinLat;
  
            var vertexX = x + radius * xCoord;
            var vertexY = y + radius * yCoord;
            var vertexZ = z + radius * zCoord;
  
            vertices.push(vertexX, vertexY, vertexZ -0.5);
  
            var colorIndex = j % ball_color.length;
            colors = colors.concat(ball_color[colorIndex]);
        }
    }
  
    var ball_faces = [];
    for (var i = 0; i < segments; i++) {
        for (var j = 0; j < segments; j++) {
            var index = i * (segments + 1) + j;
            var nextIndex = index + segments + 1;
  
            ball_faces.push(index, nextIndex, index + 1);
            ball_faces.push(nextIndex, nextIndex + 1, index + 1);
        }
    }
  
    return { vertices: vertices, colors: colors, faces: ball_faces };
  }
  
  function generateTube(x, y, z, c1, c2, c3, height, bottomRadius, topRadius, segments) {
    var angle_increment = (2 * Math.PI) / segments;
    var vertices = [];
    var colors = [];
    var faces = [];
  
    for (var i = 0; i < segments; i++) {
        var angle1 = i * angle_increment;
        var angle2 = (i + 1) * angle_increment;
  
        // Bottom vertices
        vertices.push(x + bottomRadius * Math.cos(angle1), y, z + bottomRadius * Math.sin(angle1));
        vertices.push(x + bottomRadius * Math.cos(angle2), y, z + bottomRadius * Math.sin(angle2));
  
        // Top vertices
        vertices.push(x + topRadius * Math.cos(angle1), y + height, z + topRadius * Math.sin(angle1));
        vertices.push(x + topRadius * Math.cos(angle2), y + height, z + topRadius * Math.sin(angle2));
  
        // Colors for all vertices
        colors.push(c1,c2,c3);
        colors.push(c1,c2,c3);
        colors.push(c1,c2,c3);
        colors.push(c1,c2,c3);
  
        // Faces for this segment
        var baseIndex = i * 4;
        faces.push(baseIndex, baseIndex + 1, baseIndex + 2); // Triangle 1
        faces.push(baseIndex + 1, baseIndex + 3, baseIndex + 2); // Triangle 2
    }
  
    // Closing faces for top and bottom circles
    for (var i = 0; i < segments - 1; i++) {
        // Bottom circle
        faces.push(i * 4, (i + 1) * 4, vertices.length / 3 - 2);
        // Top circle
        faces.push(i * 4 + 2, (i + 1) * 4 + 2, vertices.length / 3 - 1);
    }
  
    // Close the last segment with the first one
    faces.push((segments - 1) * 4, 0, vertices.length / 3 - 2);
    faces.push((segments - 1) * 4 + 2, 2, vertices.length / 3 - 1);
  
    return { vertices: vertices, colors: colors, faces: faces };
  }

  
  function generateEllipsoid(x, y, z, a, b, c, c1, c2, c3, segments) {
    var vertices = [];
    var colors = [];
  
    for (var i = 0; i <= segments; i++) {
      var u = -Math.PI + (2 * Math.PI * i) / segments;
  
      for (var j = 0; j <= segments; j++) {
        var v = -Math.PI + (2 * Math.PI * j) / segments;
  
        var xCoord = x + (a * Math.cos(v) * Math.cos(u));
        var yCoord = y + (b * Math.cos(v) * Math.sin(u));
        var zCoord = z + (c * Math.sin(v));
  
        vertices.push(xCoord, yCoord, zCoord);
  
        colors.push(c1,c2,c3);
      }
    }
  
    var faces = [];
    for (var i = 0; i < segments; i++) {
      for (var j = 0; j < segments; j++) {
        var index = i * (segments + 1) + j;
        var nextIndex = index + segments + 1;
  
        faces.push(index, nextIndex, index + 1);
        faces.push(nextIndex, nextIndex + 1, index + 1);
      }
    }
  
    return { vertices: vertices, colors: colors, faces: faces };
  }
  
  function generateWorld(width, length, height) {
    var vertices = [];
    var colors = [];
    var faces = [];
    var worldColors = [20/255, 203/255, 1/255];


    var halfWidth = width / 2;
    var halfLength = length / 2;
    var halfHeight = height / 2;

    vertices = [
        // Front face
        -halfWidth,  halfHeight,  halfLength,
        -halfWidth, -halfHeight,  halfLength,
         halfWidth, -halfHeight,  halfLength,
         halfWidth,  halfHeight,  halfLength,

        // Back face
        -halfWidth,  halfHeight, -halfLength,
        -halfWidth, -halfHeight, -halfLength,
         halfWidth, -halfHeight, -halfLength,
         halfWidth,  halfHeight, -halfLength 
    ];

    colors = [
        worldColors[0], worldColors[1], worldColors[2], 
        worldColors[0], worldColors[1], worldColors[2], 
        worldColors[0], worldColors[1], worldColors[2], 
        worldColors[0], worldColors[1], worldColors[2], 
        worldColors[0], worldColors[1], worldColors[2], 
        worldColors[0], worldColors[1], worldColors[2], 
        worldColors[0], worldColors[1], worldColors[2], 
        worldColors[0], worldColors[1], worldColors[2]  
    ];

    faces = [
        0, 1, 2, 0, 2, 3, 
        4, 5, 6, 4, 6, 7, 
        0, 4, 7, 0, 7, 3, 
        1, 5, 6, 1, 6, 2, 
        0, 1, 5, 0, 5, 4,
        3, 2, 6, 3, 6, 7  
    ];

    return { vertices: vertices, colors: colors, faces: faces };
}

    function generateCube(x, y, z, c1, c2, c3, width, length, height) {
        var vertices = [];
        var colors = [];
        var faces = [];
        var blockColors = [c1,c2,c3];
        var halfWidth = width / 2;
        var halfLength = length / 2;
        var halfHeight = height / 2;
    
        vertices = [
            // Front face
            x + -halfWidth, y +  halfHeight, z + halfLength,
            x + -halfWidth, y + -halfHeight, z + halfLength,
            x +  halfWidth, y + -halfHeight, z + halfLength,
            x +  halfWidth, y +  halfHeight, z + halfLength,
    
            // Back face
            x + -halfWidth, y + halfHeight, z + -halfLength,
            x + -halfWidth, y + -halfHeight, z + -halfLength,
            x +  halfWidth, y + -halfHeight, z + -halfLength,
            x +  halfWidth, y + halfHeight, z + -halfLength 
        ];
    
        colors = [
            blockColors[0], blockColors[1], blockColors[2], 
            blockColors[0], blockColors[1], blockColors[2], 
            blockColors[0], blockColors[1], blockColors[2], 
            blockColors[0], blockColors[1], blockColors[2], 
            blockColors[0], blockColors[1], blockColors[2], 
            blockColors[0], blockColors[1], blockColors[2], 
            blockColors[0], blockColors[1], blockColors[2], 
            blockColors[0], blockColors[1], blockColors[2]  
        ];
    
        faces = [
            0, 1, 2, 0, 2, 3, 
            4, 5, 6, 4, 6, 7, 
            0, 4, 7, 0, 7, 3, 
            1, 5, 6, 1, 6, 2, 
            0, 1, 5, 0, 5, 4,
            3, 2, 6, 3, 6, 7  
        ];
    
        return { vertices: vertices, colors: colors, faces: faces };
    }

    function generateCurveMeat(x,y,z,c1,c2,c3, height, bottomRadius, topRadius, segments) {
        
        var vertices = [];
        var colors = [];
        var faces = [];
      
        for (var i = 0; i < segments; i+= 0.15) {
          var angle = i + (2 * Math.PI) / segments;
      
          vertices.push(x + bottomRadius, y, z + bottomRadius );
          vertices.push(x + bottomRadius * Math.cos(angle), y, z + bottomRadius * Math.sin(angle));
      
          vertices.push(x + topRadius, y + height, z + topRadius );
          vertices.push(x + topRadius * Math.cos(angle), y + height, z + topRadius * Math.sin(angle));
      
          colors.push(c1, c2, c3);
          colors.push(c1, c2, c3);
          colors.push(c1, c2, c3);
          colors.push(c1, c2, c3);
      
          var baseIndex = i * 4;
          faces.push(baseIndex, baseIndex + 1, baseIndex + 4); // Triangle 1
          faces.push(baseIndex, baseIndex + 2, baseIndex + 6); // Triangle 2
      }
    
  
      for (var i = 0; i < segments - 1; i++) {
          faces.push(i * 4, (i + 1) * 4, vertices.length / 3 - 2);
          faces.push(i * 4 + 2, (i + 1) * 4 + 2, vertices.length / 3 - 1);
      }
    
      faces.push((segments - 1) * 4, 0, vertices.length / 3 - 2);
      faces.push((segments - 1) * 4 + 2, 2, vertices.length / 3 - 1);
      
        return { vertices: vertices, colors: colors, faces: faces };
      }
      
       
      function generateBspline(points, degree, numSegments) {
        var n = points.length - 1;
        var knots = [];
        for (var i = 0; i <= n + degree; i++) {
            if (i < degree)
                knots.push(0);
            else if (i > n)
                knots.push(n - degree + 2);
            else
                knots.push(i - degree + 1);
        }
    
        var step = (n + 1) / numSegments;
    
        var resultPoints = [];
        for (var t = 0; t <= n - degree + 1; t += step) {
            var point = [0, 0, 0];
            for (var i = 0; i <= n; i++) {
                var basis = calculateBasis(i, degree, t, knots);
                point[0] += points[i][0] * basis;
                point[1] += points[i][1] * basis;
                point[2] += points[i][2] * basis;
            }
            resultPoints.push(point);
        }
        return resultPoints;
    }

    
function calculateBasis(i, degree, t, knots) {
    if (degree == 0) {
        if (knots[i] <= t && t < knots[i + 1]) return 1;
        else return 0;
    }

    var denom1 = knots[i + degree] - knots[i];
    var denom2 = knots[i + degree + 1] - knots[i + 1];
    var basis1 = 0, basis2 = 0;

    if (denom1 !== 0)
        basis1 = ((t - knots[i]) / denom1) * calculateBasis(i, degree - 1, t, knots);
    if (denom2 !== 0)
        basis2 = ((knots[i + degree + 1] - t) / denom2) * calculateBasis(i + 1, degree - 1, t, knots);

    return basis1 + basis2;
}

    
function generateTailCurve(x, y, z, a, b, c, c1, c2, c3, rotationX, rotationY, rotationZ) {
    var vertices = [];
    var colors = [];
  
    for (var i = 0.2; i <= 4; i += 0.2) {
  
            var xCoord = i
            var yCoord = Math.pow((i-2), 3)/3 + 1;
            var zCoord = 0;
  
            // Apply rotations
            var rotatedX = xCoord - x;
            var rotatedY = yCoord - y;
            var rotatedZ = zCoord - z;
  
            // Rotate around X axis
            var tempY = rotatedY;
            rotatedY = tempY * Math.cos(rotationX) + rotatedZ * Math.sin(rotationX);
            rotatedZ = -tempY * Math.sin(rotationX) + rotatedZ * Math.cos(rotationX);
  
            // Rotate around Y axis
            var tempX = rotatedX;
            rotatedX = tempX * Math.cos(rotationY) - rotatedZ * Math.sin(rotationY);
            rotatedZ = tempX * Math.sin(rotationY) + rotatedZ * Math.cos(rotationY);
  
            // Rotate around Z axis
            var tempX2 = rotatedX;
            rotatedX = tempX2 * Math.cos(rotationZ) + rotatedY * Math.sin(rotationZ);
            rotatedY = -tempX2 * Math.sin(rotationZ) + rotatedY * Math.cos(rotationZ);
  
            // Translate the vertex back to its original position
            rotatedX += x;
            rotatedY += y;
            rotatedZ += z;

            rotatedX += a;
            rotatedY += b;
            rotatedZ += c;
  
            vertices.push(rotatedX, rotatedY, rotatedZ);
  
            colors.push(c1, c2, c3);
        
    }

    for (var i = 3.8; i >= 0; i -= 0.2) {
  
        var xCoord = i
        var yCoord = Math.pow((i-2), 3)/3 + 1;
        var zCoord = 0;

        // Apply rotations
        var rotatedX = xCoord - x;
        var rotatedY = yCoord - y;
        var rotatedZ = zCoord - z;

        // Rotate around X axis
        var tempY = rotatedY;
        rotatedY = tempY * Math.cos(rotationX) + rotatedZ * Math.sin(rotationX);
        rotatedZ = -tempY * Math.sin(rotationX) + rotatedZ * Math.cos(rotationX);

        // Rotate around Y axis
        var tempX = rotatedX;
        rotatedX = tempX * Math.cos(rotationY) - rotatedZ * Math.sin(rotationY);
        rotatedZ = tempX * Math.sin(rotationY) + rotatedZ * Math.cos(rotationY);

        // Rotate around Z axis
        var tempX2 = rotatedX;
        rotatedX = tempX2 * Math.cos(rotationZ) + rotatedY * Math.sin(rotationZ);
        rotatedY = -tempX2 * Math.sin(rotationZ) + rotatedY * Math.cos(rotationZ);

        // Translate the vertex back to its original position
        rotatedX += x;
        rotatedY += y;
        rotatedZ += z;

        rotatedX += a;
        rotatedY -= 3.2;
        rotatedZ -= -6.3;

        vertices.push(rotatedX, rotatedY, rotatedZ);

        colors.push(c1, c2, c3);
    
}

    var faces = [];
    segments = 37;
    for (var i = 0; i < segments; i++) {
            faces.push(i, i+1, segments-i);
            faces.push(i+1, segments-i, segments-i-1);
    }
  
    return { vertices: vertices, colors: colors, faces: faces };
}

function generateTomTail(controlPoints, segments,zOffset, thickness) {
    var vertices = [];
    var colors = [];
  
    var Color = [[128/255, 128/255, 128/255]];

    for (var i = 0; i <= segments; i++) {
      var t = i / segments;
      var x = Math.pow(1 - t, 3) * controlPoints[0][0] + 3 * Math.pow(1 - t, 2) * t * controlPoints[1][0] + 3 * (1 - t) * Math.pow(t, 2) * controlPoints[2][0] + Math.pow(t, 3) * controlPoints[3][0];
      var y = Math.pow(1 - t, 3) * controlPoints[0][1] + 3 * Math.pow(1 - t, 2) * t * controlPoints[1][1] + 3 * (1 - t) * Math.pow(t, 2) * controlPoints[2][1] + Math.pow(t, 3) * controlPoints[3][1];
      var z = Math.pow(1 - t, 3) * controlPoints[0][2] + 3 * Math.pow(1 - t, 2) * t * controlPoints[1][2] + 3 * (1 - t) * Math.pow(t, 2) * controlPoints[2][2] + Math.pow(t, 3) * controlPoints[3][2];
  
      vertices.push(x - thickness, y - thickness, z + zOffset);
      vertices.push(x + thickness, y - thickness, z + zOffset);
      vertices.push(x, y + thickness, z + zOffset);
  
      for (var j = 0; j <= segments; j++) {
        var colorIndex = j % Color.length;
        colors = colors.concat(Color[colorIndex]);
      }
    }
  
    var faces = [];
    for (var i = 0; i < segments; i++) {
      var index = i * 3;
      faces.push(index, index + 1, index + 2); // create triangles for each vertex
    }
  
    return { vertices: vertices, colors: colors, faces: faces };
  }