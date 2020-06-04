"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var axios_1 = __importDefault(require("axios"));
function LoginForm(props) {
    var _a = react_1.useState({
        emailerr: "",
        passworderr: "",
    }), error = _a[0], setError = _a[1];
    var _b = react_1.useState(''), email = _b[0], setEmail = _b[1];
    var _c = react_1.useState(''), password = _c[0], setPassword = _c[1];
    var handlechange = function (e) {
        if (e.target.name === 'email')
            setEmail(e.target.value);
        else
            setPassword(e.target.value);
    };
    var validate = function () {
        var emailerr = "";
        var passworderr = "";
        var len_pass = password.length;
        if (!email.includes("@") || !email.includes(".")) {
            if (!email) {
                emailerr = "EMAIL CANNOT BE LEFT BLANK";
            }
            else {
                emailerr = "INVALID EMAIL";
            }
        }
        if (len_pass < 6) {
            passworderr = "PASSWORD SHOULD HAVE MINIMUM 6 CHARACTERS";
        }
        if (emailerr || passworderr) {
            setError(__assign(__assign({}, error), { emailerr: emailerr, passworderr: passworderr }));
            return false;
        }
        return true;
    };
    var handlesubmit = function (e) {
        e.preventDefault();
        var isvalid = validate();
        if (isvalid) {
            axios_1.default.post('/login', { email: email, password: password })
                .then(function (res) {
                localStorage.setItem("auth-token", JSON.stringify(res.data.token));
                props.history.push('/home');
            })
                .catch(function (err) {
                window.alert(err.response.data);
            });
            initialise();
        }
    };
    var initialise = function () {
        console.log(email, password);
        setEmail('');
        setPassword('');
        setError(__assign(__assign({}, error), { emailerr: "", passworderr: "" }));
    };
    return (<div>
            <h2 style={{ marginLeft: 1178, paddingTop: 120, marginBottom: 0 }}>LOGIN</h2>
            <section>
                <form onSubmit={handlesubmit}>                    
                    <div>
                        <input name="email" placeholder="Email" value={email} onChange={handlechange}/>
                        <p style={{ fontSize: 10, color: "red" }}><b>{error.emailerr}</b></p>
                    </div> 

                    <div>
                        <input type="password" name="password" placeholder="Password" value={password} onChange={handlechange}/>
                        <p style={{ fontSize: 10, color: "red" }}><b>{error.passworderr}</b></p>
                    </div>

                    <div>
                        <button type='submit'>LOGIN</button>   
                        <button onClick={function () { window.location.href = '/register'; }}>REGISTER</button>
                    </div>
                </form>
            </section>
        </div>);
}
exports.default = LoginForm;
