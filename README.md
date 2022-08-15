# npm 설정

```jsx
npm init --yes
npm i express
npm i nodemon --save-dev
```

# package 설정

```jsx
"type": "module"
"start": "nodemon app"
```

# express 설정

```jsx
import express from "express";
import fs from "fs";
import fsAsync from "fs/promises";
import {} from "express-async-errors";
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

const corsOptions = {
  origin: ['http://localhost:3000'],
  optionsSuccessStatus: 200, // for options request
  credentials: true, // Access-Control-Allow-Credentials: true
};

app.use(express.json()); // body 수신용
app.use(cookieParser()); // cookie 수신용
app.use(morgan('common')); // api 사용 로그 출력용
app.use(cors(corsOptions)); // 특정 url 허용
app.use(helmet()); // 보안 설정
```
