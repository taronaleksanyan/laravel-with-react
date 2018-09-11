import axios from "axios";

let defaultHeader = {
    Authorization: `Bearer ${localStorage.getItem("token")}`
};

let expObj = {
    sendRequest: function (
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
    },
    edit:  function (url,data) {
        alert('edit');
        return axios.put(url, data);
    }
    
};

export default expObj;
