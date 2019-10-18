function Observer ( obj, property ) {
    var _this = this;
    var value = obj[property];
    this.observers = [];

    this.Observe = function ( notifyCallback ) {
        _this.observers.push( notifyCallback );
    }

    Object.defineProperty( obj, property, {
        set: function ( val ) {
            _this.value = val;
            for ( var i = 0;i < _this.observers.length;i++ ) {
                _this.observers[i]( val );
            }
        },
        get: function () {
            return _this.value;
        }
    });
}

// Get empty review container

// Build review HTML string and populate with default

// Write review container to DOM
