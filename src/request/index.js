const request = ({
        url,
        method = "post",
        data,
        headers = {},
        onProgress = (e) => e,
        requestList,
    }) =>
    new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.upload.onprogress = onProgress;
        xhr.open(method, url);
        Object.keys(headers).forEach((key) =>
            xhr.setRequestHeader(key, headers[key])
        );
        xhr.send(data);
        xhr.onload = (e) => {
            // 将请求成功的 xhr 从列表中删除
            if (requestList) {
                const xhrIndex = requestList.findIndex((item) => item === xhr);
                requestList.splice(xhrIndex, 1);
            }
            resolve({
                data: e.target.response,
            });
        };
        // 把所有的xhr对象存起来
        requestList ? .push(xhr);
    });
export default request;