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
