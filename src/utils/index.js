export default {
    map: (obj) => {
        return (value) => obj[value] || value;
    },
    strPad(str, length, pad) {
        str = str.toString();
        pad = pad === undefined ? '0' : pad;
        let l = str.length;
        if (l < length) {
            str = new Array(length - l + 1).join(pad) + str;
        }
        return str;
    },
    formatTime(timestamp) {
        if (!timestamp) return;
        if (typeof timestamp === 'string') {
            timestamp = timestamp.replace('+0800', '').replace(/-/g, '/').replace('T', ' ');
        }
        let date = new Date(timestamp),
            strPad = this.strPad;
        let Y = date.getFullYear(),
            M = strPad(date.getMonth() + 1, 2),
            D = strPad(date.getDate(), 2),
            h = strPad(date.getHours(), 2),
            m = strPad(date.getMinutes(), 2),
            s = strPad(date.getSeconds(), 2);
        return [Y, M, D].join('-') + ' ' + [h, m, s].join(':');
    },
    namePostfix() {
        let date = this.formatTime(new Date().getTime());
        return date.replace(/(:|-| )/g, '');
    },
    debounce(fn, wait = 50, immediate = false) {
        let timer, ctx, args;
        const later = () =>
            setTimeout(() => {
                timer = null;
                if (!immediate) {
                    fn.apply(ctx, args);
                    ctx = args = null;
                }
            }, wait);
        return function (...params) {
            if (!timer) {
                timer = later();
                if (immediate) {
                    fn.apply(this, params);
                } else {
                    ctx = this;
                    args = params;
                }
            } else {
                clearTimeout(timer);
                timer = later();
            }
        };
    },
    sortBy(data, key) {
        let resData = [];
        let newData = {};
        if (!Array.isArray(data)) {
            return [];
        }
        data.map((item) => {
            if (!newData[item[key]]) {
                newData[item[key]] = [item];
            } else {
                newData[item[key]].push(item);
            }
        });
        Object.keys(newData)
            .sort()
            .forEach((key) => {
                resData.push(...newData[key]);
            });
        return resData;
    },
    pluck(array, key) {
        return array.map((item) => item[key]);
    },
    isString(data) {
        return this.getType(data) === 'String';
    },
    getType(data) {
        let reg = /^\[object ([a-zA-Z]+)\]$/;
        return Object.prototype.toString.call(data).match(reg)[1];
    },
    /**
     * 数组转对象
     * @param {*} ary [{a: "haha"}, {a: "en"}]
     * @param {*} key a
     * @return {a: [{a: "en"}]}
     */
    toObject(ary, key) {
        let obj = {};
        ary.forEach((item) => {
            obj[item[key]] = item;
        });
        return obj;
    },
    param(data) {
        return encodeURI(this.ctrlQuery(data));
    },

    ctrlQuery(data, key = '') {
        let str = [];
        if (Array.isArray(data)) {
            data.forEach((item, index) => {
                str.push(`${this.ctrlQuery(item, `${key}[${index}]`)}`);
            });
        } else if (typeof data === 'object') {
            for (let attr in data) {
                let item = `${this.ctrlQuery(data[attr], key ? `${key}[${attr}]` : attr)}`;
                str.push(item);
            }
        } else {
            return `${key}=${data}`;
        }
        return str.join('&');
    },
    formatItems(obj) {
        return _.map(obj, (value, key) => {
            if (key === '') {
                return;
            }
            return {
                itemNo: key,
                itemName: key,
                value,
            };
        });
    },
    trim(value) {
        let reg = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        return value == null ? '' : (value + '').replace(reg, '');
    },
    mapService(value) {
        let obj = {
            Krds: 'krds',
            Kpg: 'postgresql',
        };
        return obj[value];
    },
};

export function deepCopy(obj) {
    let newObj;
    if (Array.isArray(obj)) {
        newObj = [];
        obj.forEach((item) => {
            newObj.push(deepCopy(item));
        });
        return newObj;
    } else if (obj != null && typeof obj === 'object') {
        newObj = {};
        Object.keys(obj).forEach((key) => {
            newObj[key] = deepCopy(obj[key]);
        });
        return newObj;
    } else {
        return obj;
    }
}
