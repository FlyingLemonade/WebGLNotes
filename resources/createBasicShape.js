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
  