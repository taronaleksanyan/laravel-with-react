import axios from "axios";
import { Redirect } from "react-router-dom";


export default function sendRequest(
    url,
    method = "get",
    data,
    withHeaders = true,
    headers
) {
    let obj = {
        method: method,
        url: url
    };
    if (data !== undefined && data !== {}) {
        obj["data"] = data;
    }
    if (withHeaders) {
        if (headers !== undefined) {
            obj["headers"] = headers;
        } else {
            obj["headers"] = {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            };
        }
    }

    return axios(obj);
}
