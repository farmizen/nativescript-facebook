"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var login_button_common_1 = require("./login-button.common");
var loginManager = require("./../login-manager");
var LoginButton = (function (_super) {
    __extends(LoginButton, _super);
    function LoginButton() {
        var _this = _super.call(this) || this;
        _this.nativeView = new FBSDKLoginButton();
        _this._localDelegate = LoginButtonDelegate.new();
        return _this;
    }
    LoginButton.prototype.onLoaded = function () {
        _super.prototype.onLoaded.call(this);
        this.nativeView.delegate = this._localDelegate;
    };
    LoginButton.prototype.onUnloaded = function () {
        _super.prototype.onUnloaded.call(this);
        this.nativeView.delegate = undefined;
    };
    return LoginButton;
}(login_button_common_1.LoginButtonBase));
exports.LoginButton = LoginButton;
var LoginButtonDelegate = (function (_super) {
    __extends(LoginButtonDelegate, _super);
    function LoginButtonDelegate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoginButtonDelegate.prototype.loginButtonDidCompleteWithResultError = function (loginButton, result, error) {
        if (loginManager.onLoginCallback) {
            loginManager.onLoginCallback(result, error);
        }
    };
    LoginButtonDelegate.prototype.loginButtonDidLogOut = function (loginButton) {
        if (loginManager.onLogoutCallback) {
            loginManager.onLogoutCallback();
        }
    };
    LoginButtonDelegate.prototype.loginButtonWillLogin = function (loginButton) {
        return true;
    };
    LoginButtonDelegate.ObjCProtocols = [FBSDKLoginButtonDelegate];
    return LoginButtonDelegate;
}(NSObject));
