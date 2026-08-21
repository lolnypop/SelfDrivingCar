function toRadian(degree) {
    const radian = degree * Math.PI/180;
    return radian;
}

// linear interpolation
function lerp(A, B, t) {
    return A + (B-A) * t;
}