
/* Circle vs Circle
 * INPUT: two circles specified by position and radius:
 *  c1 = {x:, y:, r:}, c2 = {x:, y:, r:}
 * RETURN VALUE:
 *  false if c1 and c2 do not intersect
 *  true if c1 and c2 do intersect
 */
function circleCircle(c1, c2) {
    //TODO
    var distx = (c1.x + c1.r) - (c2.x + c2.r);
    var disty = (c1.y + c1.r) - (c2.y + c2.r);

    var dist = Math.sqrt(distx * distx + disty * disty);

    if (dis < (c1.r + c2.r))
        return true;

    return false;
}

/* Rectangle vs Rectangle
 * INPUT: rectangles specified by their minimum and maximum extents:
 *  r = {min:{x:, y:}, max:{x:, y:}}
 * RETURN VALUE:
 *  false if r1 and r2 do not intersect
 *  true if r1 and r2 do intersect
 */
function rectangleRectangle(r1, r2) {
    //TODO
    var oneLefttwo = r1.max.x < r2.min.x;
    var oneRighttwo = r1.min.x > r2.max.x;
    var oneAbovetwo = r1.min.y > r2.max.y;
    var oneBelowtwo = r1.max.y < r2.min.y;

    if (!(oneLefttwo || oneRighttwo || oneAbovetwo || oneBelowtwo))
        return true

    return false;
}

/* Convex vs Convex
 * INPUT: convex polygons as lists of vertices in CCW order
 *  p = [{x:,y:}, ..., {x:, y:}]
 * RETURN VALUE:
 *  false if p1 and p2 do not intersect
 *  true if p1 and p2 do intersect
 */
function convexConvex(p1, p2) {
    //TODO
    var result = false;
    var length = p1.length;

    for (var i = 0; i < length ; i++) {
        var a1 = p1[i];
        var a2 = p1[(i + 1) % length];
        var inter = LinePoly(a1, a2, p2);
        result.points.concat(inter.points);
    }

    if (result.points.length > 0)
        return true;

    return false;
}


/* Rav vs Circle
 * INPUT: ray specified as a start and end point, circle as above.
 *  ray = {start:{x:, y:}, end:{x:, y:}}
 * RETURN VALUE:
 *  null if no intersection
 *  {t:} if intersection
 *    -- NOTE: 0.0 <= t <= 1.0 gives the position of the first intersection
 */
function rayCircle(r, c) {
    //TODO

    var m = start.x + start.y - c.x - c.y;
    var n = end.x + end.y - c.x - c.y;
    var o = m - n;
    var a = o.x * o.x + o.y * o.y;
    var b = 2 * (o.x * m.x + o.y * m.y);
    var c = m.x * m.x + m.y * m.y - (c.r * c.r);
    var delta = b * b - 4 * a * c;

    if (delta < 0) {
        return null;
    }
    else{
    delta = math.sqrt(delta);
    var t1 = (-b - delta) / (2 * a);
    var t2 = (-b + delta) / (2 * a);
    if(t1>=0&&t1<1)
    {
        return t1;
    }
    if(t2>=0&&t2<1)
    {
        return t2;
    }

}

/* Rav vs Rectangle
 * INPUT: ray as above, rectangle as above.
 * RETURN VALUE:
 *  null if no intersection
 *  {t:} if intersection
 *    -- NOTE: 0.0 <= t <= 1.0 gives the position of the first intersection
 */
function rayRectangle(r, b) {
    //TODO
    var minX = r.start.x;
    var maxX = r.end.x;

    if (r.start.x > r.end.x) {
        minX = r.end.x;
        maxX = r.start.x;
    }
    if (maxX > b.max.x) {
        maxX = b.max.x;
    }
    if (minX < b.min.x) {
        minX = b.min.x;
    }
    if (minX > maxX) {
        return null;
    }
    var minY = r.start.y;                //Checking the Y values as well..
    var maxY = r.end.y;
    var dx = r.end.x - r.start.x;
    if (Math.abs(dx) > 0.0000001) {
        var a = (r.start.y - r.end.y) / dx;
        var b = r.end.y - a * r.start.x;
        minY = a * minX + b;
        maxy = a * maxX + b;
    }
    if (minY > maxY) {
        var tmp = maxY;
        maxY = minY;
        minY = tmp;
    }
    //considering Y projections
    if (maxY > b.max.y) {
        maxY = b.max.y;
    }
    if (minY < b.min.y) {
        minY = b.min.y;
    }

    if (minY > maxY)      //projections do not intersect
    {
        return null;
    }                     //min:x,y  max:x,y  -->b
    
    return a;   

}

/* Rav vs Convex
 * INPUT: ray as above, convex polygon as above.
 * RETURN VALUE:
 *  null if no intersection
 *  {t:} if intersection
 *    -- NOTE: 0.0 <= t <= 1.0 gives the position of the first intersection
 */
function rayConvex(r, p) {
    //TODO
    var res = null;
    var len = p.length;
    var ds = r.end - r.start;
    var t;
   
    if(Math.abs(ds)<0)
    {
        return null;
    }
    else
    {
        for(var i =0;i<len;i++)
        {
            var pt1 = p[i];
            var pt2 = p[(i+1)%len];

            var inter = LineLine(r.start,r.end,pt1,pt2);
            res.appPoints(inter.p);
        }

        for(var j =0;j<res.length;j++)
        {
            if(res[j]!=0)
            {
                var t = (res[j] - r.start )/ds;
                if(t>=0&&t<1)
                    return t;
            }
        }
    }

    return null;
}

    
function LinePoly(a1, a2, points) {
    var result = false;
    var length = points.length;

    for (var i = 0; i < length ; i++) {
        var b1 = points[i];
        var b2 = points[(i + 1) % length];
        var inter = LineLine(a1, a2, b1, b2);
        result.appPoints(inter.points);
    }

    if (result.points.length > 0)
        result = true;

    return result;

}

function LineLine(a1, a2, b1, b2) {
    var result;

    var ua_t = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x);
    var ub_t = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x);
    var u_b = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);

    if (u_b != 0) {
        var ua = ua_t / u_b;
        var ub = ub_t / u_b;

        if (0 <= ua && ua <= 1 && 0 <= ub && ub <= 1) {
            result = true;
            result.points.push(
                new Point2D(
                    a1.x + ua * (a2.x - a1.x),
                    a1.y + ua * (a2.y - a1.y)
                )
            );
        } else {
            result = false;
        }
    } else {
        if (ua_t == 0 || ub_t == 0) {
            result = true;
        } else {
            result = false;
        }
    }

    return result;
}

function appPoints(points)
{
    return this.points.concat(points);
}

module.exports = {
    circleCircle: circleCircle,
    rectangleRectangle: rectangleRectangle,
    convexConvex: convexConvex,
    rayCircle: rayCircle,
    rayRectangle: rayRectangle,
    rayConvex: rayConvex
};




