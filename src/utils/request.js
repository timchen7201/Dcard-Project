import axios from "axios";
const baseURL = "https://ptx.transportdata.tw/MOTC/v2/Tourism";
const request = axios.create({ baseURL: baseURL });
export default request;
