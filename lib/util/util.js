/*
 * utility api
 * @module   util/util
 * @author   genify(caijf@corp.netease.com)
 */
var util = require('util');
/**
 * generator md5 for content
 * @param  {String} content - content
 * @return {String} md5 hash value
 */
exports.md5 = function(content){
    return require('crypto').createHash('md5').update(content).digest('hex');
};
/**
 * generator number between min and max
 * @param  {Number} min - min value, contain this value
 * @param  {Number} max - max value, not contain this value
 * @return {Number} random value
 */
exports.rand = function(min,max){
    return Math.floor(Math.random()*(max-min)+min);
};
/**
 * generator an increment number
 * @return {Number} increment number
 */
exports.increment = (function(){
    var seed = +new Date;
    return function(){
        return seed++;
    };
})();
/**
 * merge all object
 * @param  {Object} arg - object to be merged
 * @return {Object} union properties with all object
 */
exports.merge = function(){
    var ret = {},
        args = [].slice.call(arguments,0);
    args.forEach(function(item){
        var keys = Object.keys(item||{});
        keys.forEach(function(key){
            ret[key] = item[key];
        });
    });
    return ret;
};
/**
 * fetch value from config with template
 * @param  {Object} template - object template
 * @param  {Object} config   - value config
 * @return {Object} object after merge
 */
exports.fetch = function(template,config){
    config = config||{};
    template = template||{};
    var ret = {},
        keys = Object.keys(template);
    keys.forEach(function(key){
        var value = config[key];
        ret[key] = value==null?template[key]:value;
    });
    return ret;
};
/**
 * formatted time string
 * @param  {String} format - time format
 * @param  {Date}   time   - time object
 * @return {String} time string after formatted
 */
exports.getFormatTime = (function(){
    var _doFormat = function(number){
        number = parseInt(number)||0;
        return (number<10?'0':'')+number;
    };
    return function(format,time){
        time = time||new Date();
        return util.format(
            format,time.getFullYear(),
            _doFormat(time.getMonth()+1),
            _doFormat(time.getDate()),
            _doFormat(time.getHours()),
            _doFormat(time.getMinutes()),
            _doFormat(time.getSeconds()),
            time.getMilliseconds()
        );
    };
})();
/**
 * whether function parameter
 * @param  {Variable} func - function object
 * @return {Boolean}  whether function type
 */
exports.isFunction = function(func){
    return Object.prototype.toString.call(func).toLowerCase()=='[object function]';
};
/**
 *  concat multiple array
 *  @param  {Array}    list   - list to be merged
 *  @param  {Function} filter - filter to return item key value
 *  @return {Array}    array merged after filter repeat item
 */
exports.concat = function(){
    // check filter
    var len = arguments.length-1,
        filter = arguments[len];
    if (!this.isFunction(filter)){
        len = arguments.length;
        filter = null;
    }
    // merge list
    var ret = [],test = {};
    for(var i= 0,it,key;i<len;i++){
        it = arguments[i];
        // check array
        if (!util.isArray(it)){
            ret.push(it);
            continue;
        }
        // do merge
        it.forEach(function(item){
            if (!filter){
                ret.push(item);
            }else{
                key = filter(item);
                if (!test[key]){
                    ret.push(item);
                    test[key] = !0;
                }
            }
        })
    }
    return ret;
};