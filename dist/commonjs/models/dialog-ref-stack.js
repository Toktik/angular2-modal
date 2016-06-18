"use strict";
/**
 * A dumb stack implementation over an array.
 */
var DialogRefStack = (function () {
    function DialogRefStack() {
        this._stack = [];
    }
    DialogRefStack.prototype.push = function (dialogRef) {
        var idx = this._stack.indexOf(dialogRef);
        if (idx === -1)
            this._stack.push(dialogRef);
    };
    /**
     * Push a DialogRef into the stack and manage it so when it's done
     * it will automatically kick itself out of the stack.
     * @param dialogRef
     */
    DialogRefStack.prototype.pushManaged = function (dialogRef) {
        var _this = this;
        this.push(dialogRef);
        dialogRef.result
            .then(function () { return _this.remove(dialogRef); })
            .catch(function () { return _this.remove(dialogRef); });
        // we don't "pop" because we can't know for sure that our instance is the last.
        // In a user event world it will be the last, but since modals can close programmatically
        // we can't tell.
    };
    DialogRefStack.prototype.pop = function () {
        this._stack.pop();
    };
    /**
     * Remove a DialogRef from the stack.
     * @param dialogRef
     */
    DialogRefStack.prototype.remove = function (dialogRef) {
        var idx = this._stack.indexOf(dialogRef);
        if (idx > -1)
            this._stack.splice(idx, 1);
    };
    DialogRefStack.prototype.removeAll = function () {
        this._stack.forEach(function (dialogRef) {
            dialogRef.close();
        });
    };
    DialogRefStack.prototype.index = function (index) {
        return this._stack[index];
    };
    DialogRefStack.prototype.indexOf = function (dialogRef) {
        return this._stack.indexOf(dialogRef);
    };
    Object.defineProperty(DialogRefStack.prototype, "length", {
        get: function () {
            return this._stack.length;
        },
        enumerable: true,
        configurable: true
    });
    return DialogRefStack;
}());
exports.DialogRefStack = DialogRefStack;
//# sourceMappingURL=dialog-ref-stack.js.map