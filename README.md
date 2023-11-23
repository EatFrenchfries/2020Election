This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## 作品說明

The F2E 2020總統即時開票全台地圖

## 使用技術
```
- ReactJS
- NextJS
- Redux
- Redux-Saga
- Recharts
- Scss
- Axios
```

## 系統說明

### 環境建置

#### nvm 14.15.0
node 14.15.0

```
npm install -g yarn@1.22.19
```

#### 專案運行方式

```
yarn install
// 開發階段
yarn dev
// build
yarn build
```

開啟瀏覽器 http://localhost:8080

## 資料夾說明

```
- pages  // Next.js page 對應 route
- containers 
- components  // 可重複使用的組件
- store  // redux store
- public  // 靜態物件
- utils
- client // api endpoints
```