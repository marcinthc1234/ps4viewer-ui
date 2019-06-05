
export class TypeHelp {

    // Returns if a value is a string
    static isString (value) {
        return typeof value === 'string' || value instanceof String;
    }
    
    // Returns if a value is really a number
    static isNumber (value) {
        return typeof value === 'number' && isFinite(value);
    }

    // Returns if a value is an array
    static isArray (value) {
        return value && typeof value === 'object' && value.constructor === Array;
    }

    // Returns if a value is a function
    static isFunction (value) {
        return typeof value === 'function';
    }

    // Returns if a value is an object
    static isObject (value) {
        return value && typeof value === 'object' && value.constructor === Object;
    }
    
    // Returns if a value is null
    static isNull (value) {
        return value === null;
    }
    
    // Returns if a value is undefined
    static isUndefined (value) {
        return typeof value === 'undefined';
    }
    
    // Returns if a value is a boolean
    static isBoolean (value) {
        return typeof value === 'boolean';
    }
    
    // Returns if a value is a regexp
    static isRegExp (value) {
        return value && typeof value === 'object' && value.constructor === RegExp;
    }
    
    // Returns if value is an error object
    static isError (value) {
        return value instanceof Error && typeof value.message !== 'undefined';
    }
    
    // Returns if value is a date object
    static isDate (value) {
        return value instanceof Date;
    }
    
    // Returns if a Symbol
    static isSymbol (value) {
        return typeof value === 'symbol';
    }

}
