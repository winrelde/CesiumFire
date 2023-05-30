# Technology Stack

Vue 3 + Vite + Cesium + ElementPlus

## Start
```
npm install
```
```
npm run serve
```
```
npm run build
```
## Annotation
#### 林火蔓延模型采用矢量传播模型，并非元胞自动机；
#### 主要为林火蔓延边界提供动态三维可视化效果；
#### 但目前仅采用Entity.availability设置显隐，也是很多项目采用的方法
#### CZML动态效果存在点不对应的问题，蔓延模型生成的各步长边界的控制点数量不同，难以一一对应
#### 想要实现粒子传播效果，仍在研究...

### blog
[https://blog.csdn.net/djhpa/article/details/130507099](https://blog.csdn.net/djhpa/article/details/130507099?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522168541138016800227472951%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=168541138016800227472951&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v1~rank_v31_ecpm-1-130507099-null-null.142^v88^control_2,239^v2^insert_chatgpt&utm_term=%E6%9E%97%E7%81%AB%E8%94%93%E5%BB%B6%E5%8F%AF%E8%A7%86%E5%8C%96%E2%80%94%E2%80%94Cesium%E5%AE%9E%E7%8E%B0&spm=1018.2226.3001.4187)
