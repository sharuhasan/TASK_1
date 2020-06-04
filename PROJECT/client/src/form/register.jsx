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
function RegisterForm(props) {
    var _a = react_1.useState({
        nameerr: " ",
        emailerr: "",
        passworderr: "",
        confirmpassworderr: "",
        numbererr: ""
    }), error = _a[0], setError = _a[1];
    var _b = react_1.useState(''), number = _b[0], setNum = _b[1];
    var _c = react_1.useState(''), email = _c[0], setEmail = _c[1];
    var _d = react_1.useState(''), name = _d[0], setName = _d[1];
    var _e = react_1.useState(''), password = _e[0], setPassword = _e[1];
    var _f = react_1.useState(''), confirmpassword = _f[0], setConfirmpassword = _f[1];
    var _g = react_1.useState(''), state = _g[0], setstate = _g[1];
    var handlechange = function (e) {
        if (e.target.name === 'name')
            setName(e.target.value);
        else if (e.target.name === 'email')
            setEmail(e.target.value);
        else if (e.target.name === 'password')
            setPassword(e.target.value);
        else if (e.target.name === 'confirmpassword')
            setConfirmpassword(e.target.value);
        else if (e.target.name === 'number')
            setNum(e.target.value);
        else
            setstate(e.target.value);
    };
    var validate = function () {
        var nameerr = "";
        var emailerr = "";
        var passworderr = "";
        var confirmpassworderr = "";
        var numbererr = "";
        var len_confirmpass = confirmpassword.length;
        var len_pass = password.length;
        if (!name) {
            nameerr = "NAME CANNOT BE LEFT BLANK";
        }
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
        if (password) {
            if (len_confirmpass < 6) {
                confirmpassworderr = "PASSWORD SHOULD HAVE MINIMUM 6 CHARACTERS";
            }
            else if (confirmpassword !== password) {
                confirmpassworderr = "BOTH PASSWORDS DOESN'T MATCH ";
            }
        }
        if (number.length !== 10) {
            numbererr = "MOBILE NUMBER SHOULD HAVE EXACTLY 10 DIGITS";
        }
        if (nameerr || numbererr || emailerr || passworderr || confirmpassworderr) {
            setError(__assign(__assign({}, error), { nameerr: nameerr, emailerr: emailerr, passworderr: passworderr, confirmpassworderr: confirmpassworderr, numbererr: numbererr }));
            return false;
        }
        return true;
    };
    var handlesubmit = function (e) {
        e.preventDefault();
        var isvalid = validate();
        if (isvalid) {
            axios_1.default.post('/register', { name: name, email: email, password: password, confirmpassword: confirmpassword, number: number, state: state })
                .then(function (res) {
                props.history.push('/login');
            })
                .catch(function (err) {
                window.alert(JSON.stringify(err.response.data));
            });
            initialise();
        }
    };
    var initialise = function () {
        console.log(name, email, password, confirmpassword, state, number);
        setName('');
        setEmail('');
        setPassword('');
        setConfirmpassword('');
        setNum('');
        setError(__assign(__assign({}, error), { nameerr: "", emailerr: "", passworderr: "", confirmpassworderr: "", numbererr: "" }));
    };
    return (<div>
            <h2 style={{ marginLeft: 1178, paddingTop: 120, marginBottom: 0 }}>REGISTRATION</h2>
            
            <section>
                <form onSubmit={handlesubmit}>                    
                    
                    <div>
                        <input name="name" placeholder="Name" value={name} onChange={handlechange}/>
                        <p style={{ fontSize: 10, color: "red" }}><b>{error.nameerr}</b></p>
                    </div>

                    <div>
                        <input name="email" placeholder="Email" value={email} onChange={handlechange}/>
                        <p style={{ fontSize: 10, color: "red" }}><b>{error.emailerr}</b></p>
                    </div> 

                    <div>
                        <input type="password" name="password" placeholder="Password" value={password} onChange={handlechange}/>
                        <p style={{ fontSize: 10, color: "red" }}><b>{error.passworderr}</b></p>
                    </div>

                    <div>
                        <input type="password" name="confirmpassword" placeholder="Confirm Password" value={confirmpassword} onChange={handlechange}/>
                        <p style={{ fontSize: 10, color: "red" }}><b>{error.confirmpassworderr}</b></p>
                    </div>

                    <div>
                        <input name="number" placeholder="Enter Mobile Number" value={number} onChange={handlechange}/>
                        <p style={{ fontSize: 10, color: "red" }}><b>{error.numbererr}</b></p>
                    </div>


                    <div>
                    <select onChange={handlechange}>

                        <option>SELECT-STATE</option>
                        <option value='Tamil Nadu'>Tamil Nadu</option>
                        <option value='Karnataka'>Karnataka</option>                    
                        <option value='Kerala'>Kerala</option>
                        <option value='Andhra Pradesh'>Andhra Pradesh</option>
                        <option value='Arunachal Pradesh'>Arunachal Pradesh</option>
                        <option value='Assam'>Assam</option>
                        <option value='Bihar'>Bihar</option>
                        <option value='Chhatisgarh'>Chhatisgarh</option>
                        <option value='Goa'>Goa</option>
                        <option value='Gujarat'>Gujarat</option>
                        <option value='Haryana'>Haryana</option>
                        <option value='Himachal Pradesh'>Himachal Pradesh</option>
                        <option value='Jharkhand'>Jharkhand</option>
                        <option value='Karnataka'>Karnataka </option>
                        <option value='Kerala'>Kerala</option>
                        <option value='Madhya Pradesh'>Madhya Pradesh </option>
                        <option value='Maharashtra '>Maharashtra </option>
                        <option value='Manipur'>Manipur</option>
                        <option value='Meghalaya'>Meghalaya</option>
                        <option value='Mizoram'>Mizoram</option>
                        <option value='Nagaland'>Nagaland</option>
                        <option value='Odisha '>Odisha </option>
                        <option value='Punjab'>Punjab</option>
                        <option value='Rajasthan'>Rajasthan</option>
                        <option value='Sikkim'>Sikkim</option>
                        <option value='Telangana'>Telangana</option>
                        <option value='Tripura'>Tripura</option>
                        <option value='Uttarakhand'>Uttarakhand</option>
                        <option value='Uttar Pradesh'>Uttar Pradesh</option>
                        <option value='West Bengal'>West Bengal</option>

                    </select>
                    </div>
                    <div>
                        <button type='submit'>REGISTER</button>   
                        <button onClick={function () { window.location.href = '/login'; }}>LOGIN</button>
                    </div>
                </form>
            </section>

        

        </div>);
}
exports.default = RegisterForm;
