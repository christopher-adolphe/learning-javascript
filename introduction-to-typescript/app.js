var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Using type casting
var num1InputElem = document.getElementById('num1');
var num2InputElem = document.getElementById('num2');
var button = document.querySelector('button');
var resultElem = document.getElementById('result');
var add = function (a, b) {
    return a + b;
};
// An alternative to string literal with union type is to use the enum type
var OutputMode;
(function (OutputMode) {
    OutputMode[OutputMode["CONSOLE"] = 0] = "CONSOLE";
    OutputMode[OutputMode["ALERT"] = 1] = "ALERT";
})(OutputMode || (OutputMode = {}));
;
var printAdditionResult = function (a, b, result, printMode) {
    if (printMode === OutputMode.CONSOLE) {
        console.log("Adding ".concat(a, " + ").concat(b, " = "), result);
    }
    else if (printMode === OutputMode.ALERT) {
        alert("Adding ".concat(a, " + ").concat(b, " = ").concat(result));
    }
};
var isDone;
isDone = true;
var results = [];
var index = 0;
button.addEventListener('click', function () {
    var inputValue1 = +num1InputElem.value;
    var inputValue2 = +num2InputElem.value;
    var result = add(inputValue1, inputValue2);
    var data = {
        value: result,
        print: function () {
            return this.value;
        }
    };
    results.push(data);
    printAdditionResult(inputValue1, inputValue2, data.value, OutputMode.ALERT);
    // const returnedResult = results[index].print();
    // index++;
    // console.log('returnedResult: ', returnedResult);
    resultElem.textContent = result.toString();
    console.log(results);
});
// TypeScript forces us to declare the fields of a class before we start using them as properties within the class
var User = /** @class */ (function () {
    function User(name, age) {
        this.name = name;
        this.age = age;
        this.sayHello(this.name);
    }
    User.prototype.sayHello = function (name) {
        console.log("Hello ".concat(name));
    };
    return User;
}());
// A shortcut syntax to avoid declaring the fields is to use access modifiers with the constructor parameters
var User1 = /** @class */ (function () {
    function User1(name, age) {
        this.name = name;
        this.age = age;
    }
    return User1;
}());
var Admin = /** @class */ (function (_super) {
    __extends(Admin, _super);
    function Admin(name, age, permission) {
        return _super.call(this, name, age) || this;
    }
    return Admin;
}(User1));
var user = new User('Sophie', 30);
