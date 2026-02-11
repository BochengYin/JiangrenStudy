# Express 起步任务

## 1) 安装依赖

```bash
npm install
```

## 2) 启动服务

```bash
npm run dev
```

或

```bash
npm run start
```

服务默认运行在 `http://localhost:3000`。

## 3) 接口说明（用于练习 req.params / req.query / req.body）

### GET `/`

返回服务状态 JSON。

### GET `/users/:id`

示例：

```text
GET http://localhost:3000/users/42?role=student&active=false
```

返回 `req.params.id` 与 `req.query`。

### POST `/messages`

示例：

```text
POST http://localhost:3000/messages
Content-Type: application/json
```

请求体：

```json
{
  "title": "hello",
  "content": "from postman"
}
```

返回 `req.body`。
