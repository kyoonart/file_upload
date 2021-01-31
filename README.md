# 前端大文件上传 + 断点续传解决方案

前端

- vue + element 界面展示
- Blob#slice 实现文件切片
- FileReader + spark-md5 + web-worker 生成文件 hash
- xhr 发送 formData

服务端

- nodejs
- multiparty 处理 formData
- node stream 流的概念

```fs.createReadStream('/path/to/source').pipe(fs.createWriteStream('/path/to/dest'));```

细节:文件的上传进度

- 包括整个文件的上传进度
- 单个切片的上传进度
- 单个切片的进度可以监听 xhr 的 xhr.upload.onprogress = onProgress;
- 然后利用 vue 的计算属性 根据每个切片的大小\*单个切片 size 求和 即可算出整体上传进度

断点续传

- 1：前端使用 localStorage 记录已上传的切片 hash
- 2：服务端保存已上传的切片 hash，前端每次上传前向服务端获取已上传的切片
  第一种是前端的解决方案，第二种是服务端，而前端方案有一个缺陷，如果换了个浏览器就失去了记忆的效,踩坑记录---所以需要使用服务端方案
- 3：需要保存所有的 xhr 对象，上传切片时删除已经成功的 xhr 对象，暂停时把剩下的没有上传的 xhr.abort()掉 暂停 http 请求

秒传

- 所谓的文件秒传，即在服务端已经存在了上传的资源，所以当用户再次上传时会直接提示上传成功
  文件秒传需要依赖整个文件的 hash，即在上传前，先计算出文件 hash，并把 hash 发送给服务端进行验证，由于 hash 的唯一性，所以一旦服务端能找到 hash 相同的文件，则直接返回上传成功的信息
- 文件秒传其实就是障眼法 没有真正的上传文件，只是检查了文件是否在服务端存在

# start

```
npm install
```

```
npm run start
```
