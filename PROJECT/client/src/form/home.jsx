"use strict";
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
var Home = function (props) {
    var _a = react_1.useState([]), json = _a[0], setJson = _a[1];
    react_1.useEffect(function () {
        axios_1.default.get('/getuser', { headers: { 'auth-token': "" + JSON.parse(localStorage.getItem('auth-token')) } })
            .then(function (res) {
            setJson(res.data);
            console.log(res.data);
        })
            .catch(function (err) {
            window.alert(JSON.stringify(err.response.data));
        });
    }, []);
    return (<div>
            <p>{JSON.stringify(json)}</p>
            <button onClick={function () {
        localStorage.clear();
        props.history.push('/login');
    }}>LOGOUT</button>
        </div>);
};
exports.default = Home;
