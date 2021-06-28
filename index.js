var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var randomNumber = function (gender) {
    var num = Math.floor(Math.random() * 9);
    switch (gender) {
        case 'male':
            if (num % 2 === 0) {
                num += 1;
            }
            break;
        case 'female':
            if (num % 2 !== 0) {
                num += 1;
            }
            break;
        default:
            break;
    }
    return num;
};
var randomDate = function () {
    var year = new Date().getFullYear();
    var start = new Date(year - 100, 1, 1);
    var end = new Date(year + 100, 1, 1);
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};
var padZero = function (i) { return (i < 10 ? "0" + i : "" + i); };
var generateSerial = function (gender) {
    return '' +
        randomNumber(gender) +
        ('' + randomNumber(gender)) +
        ('' + randomNumber(gender));
};
var luhn = function (str) {
    var v = 0;
    var sum = 0;
    str += '';
    for (var i = 0, l = str.length; i < l; i++) {
        v = str[i];
        v *= 2 - (i % 2);
        if (v > 9) {
            v -= 9;
        }
        sum += v;
    }
    return Math.ceil(sum / 10) * 10 - sum;
};
/**
 * Generate Swedish Swedish Personal Identity Number.
 *
 * @param  {object} date
 * @param  {object} options
 *
 * @return {string}
 */
var gen = function (date, options) {
    if (options === void 0) { options = {}; }
    var y = 0;
    var m = 0;
    var d = 0;
    if (!(date instanceof Date)) {
        options = date;
        date = randomDate();
    }
    y = date.getFullYear();
    m = date.getMonth() + 1;
    d = date.getDate();
    options = __assign(__assign({}, options), { gender: '', format: 'long' });
    var c = '';
    y = "" + padZero(y);
    if (y.length > 2) {
        c = y.slice(0, 2);
        y = y.slice(2, 4);
    }
    var serial = generateSerial(options.gender || '');
    while (serial === '000') {
        serial = generateSerial(options.gender || '');
    }
    var pin = "" + y + padZero(m) + padZero(d) + serial;
    var full = "" + c + pin + luhn(pin);
    if (options.format === 'long') {
        return full;
    }
    var sep = '+';
    if (new Date().getFullYear() - parseInt(full.slice(0, 4), 10) < 100) {
        sep = '-';
    }
    return "" + full.slice(2, 4) + full.slice(4, 6) + full.slice(6, 8) + sep + full.slice(8);
};

// ---- magic

console.log(gen(new Date('1993', '11', '22')))
