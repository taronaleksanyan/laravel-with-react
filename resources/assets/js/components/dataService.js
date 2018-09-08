import axios from "axios";

let defaultHeader = {
    Authorization: `Bearer ${localStorage.getItem("token")}`
};

export default function sendRequest(
    url,
    method = "get",
    data,
    withHeaders = true,
    headers = defaultHeader
) {
    let obj = {
        method: method,
        url: url
    };
    if (data !== undefined && data !== {}) {
        obj["data"] = data;
    }
    if (headers !== undefined && withHeaders === true) {
        obj["headers"] = headers;
    }
    return axios(obj);
}
