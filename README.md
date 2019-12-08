# Midway + uim

### 开发
- 安装依赖
```
cnpm install
```
- 启动前端
```
cd client && npm run start 
```
- 启动后端
```
cd service && npm run local
```

### 打包
> 打包成功后会在项目目录生成dist文件夹，里面包含前端代码和后端代码
```
npm run build
```
### 部署
> 确认已经安装了pm2，没安装的安装pm2    
- 安装pm2
```
cnpm install pm2 -g
```

- 安装项目依赖
```
cnpm install --production
```

- 使用pm2启动项目
```
pm2 start pm2.yaml
```

### 其他配置
- [环境变量](https://eggjs.org/zh-cn/basics/env.html)   
在 pm2.yaml 中配置  
- [启动参数传递](https://midwayjs.org/midway/guide.html#%E5%90%AF%E5%8A%A8%E5%8F%82%E6%95%B0%E4%BC%A0%E9%80%92)
- [pm2使用总结](https://www.jianshu.com/p/d9d419aab3d7)
