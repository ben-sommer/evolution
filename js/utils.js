const baseSlice = (array, start, end) => {
    var index = -1,
        length = array.length;

    if (start < 0) {
        start = -start > length ? 0 : (length + start);
    }
    end = end > length ? length : end;
    if (end < 0) {
        end += length;
    }
    length = start > end ? 0 : ((end - start) >>> 0);
    start >>>= 0;

    var result = Array(length);
    while (++index < length) {
        result[index] = array[index + start];
    }
    return result;
}

export const chunk = (array, size, guard) => {
    if ((guard ? isIterateeCall(array, size, guard) : size === undefined)) {
        size = 1;
    } else {
        size = Math.max(parseInt(size), 0);
    }
    var length = array == null ? 0 : array.length;
    if (!length || size < 1) {
        return [];
    }
    var index = 0,
        resIndex = 0,
        result = Array(Math.ceil(length / size));

    while (index < length) {
        result[resIndex++] = baseSlice(array, index, (index += size));
    }
    return result;
};

export const arrayEquals = (array1, array2) => {
    // if the other array is a falsy value, return
    if (!array1 || !array2)
        return false;

    // compare lengths - can save a lot of time 
    if (array1.length != array2.length)
        return false;

    for (var i = 0, l = array1.length; i < l; i++) {
        // Check if we have nested arrays
        if (array1[i] instanceof Array && array2[i] instanceof Array) {
            // recurse into the nested arrays
            if (!array1[i].equals(array2[i]))
                return false;
        } else if (array1[i] != array2[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
};

const randomGaussian = function (mean, sd) {
    var y1, y2, x1, x2, w;
    do {
        x1 = Math.random()*2 - 1;
        x2 = Math.random()*2 - 1;
        w = x1 * x1 + x2 * x2;
    } while (w >= 1);
    w = Math.sqrt(-2 * Math.log(w) / w);
    y1 = x1 * w;
    y2 = x2 * w;

    var m = mean || 0;
    var s = sd || 1;
    return y1 * s + m;
};

export const mutate = x => {
    if (Math.random() < 0.1) {
        let offset = randomGaussian() * 0.5;
        let newx = x + offset;
        return newx;
    } else {
        return x;
    }
};