// Ivan's Universe 网站后端API服务器
// 用于连接SQL Server数据库并提供留言板API

const express = require('express');
const cors = require('cors');
const sql = require('mssql');

const app = express();
const port = process.env.PORT || 5000;

// 中间件
app.use(cors());
app.use(express.json());

// SQL Server连接配置
const config = {
  user: 'your_username',          // 替换为你的SQL Server用户名
  password: 'your_password',      // 替换为你的SQL Server密码
  server: 'localhost',           // 替换为你的SQL Server地址
  database: 'IvanUniverseDB',    // 数据库名
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false,               // 如果使用Windows身份验证，设置为false
    trustServerCertificate: true  // 更改为true以避免自签名证书错误
  }
};

// 如果使用Windows身份验证，可以使用以下配置
/*
const config = {
  server: 'localhost',           // 替换为你的SQL Server地址
  database: 'IvanUniverseDB',    // 数据库名
  authentication: 'windows',     // 使用Windows身份验证
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};
*/

// 数据库连接池
let pool;

// 初始化数据库连接
const initDb = async () => {
  try {
    pool = await sql.connect(config);
    console.log('已连接到SQL Server数据库');
  } catch (error) {
    console.error('数据库连接失败:', error);
    process.exit(1);
  }
};

// 获取留言列表API
app.get('/api/guestbook', async (req, res) => {
  try {
    const pageNum = parseInt(req.query.pageNum) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    
    // 使用存储过程查询分页数据
    const result = await pool.request()
      .input('PageNum', sql.Int, pageNum)
      .input('PageSize', sql.Int, pageSize)
      .execute('sp_GetGuestbookMessages');
    
    // 结果集分为两部分：留言数据和总记录数
    const messages = result.recordsets[0];
    const totalCount = result.recordsets[1][0].TotalCount;
    
    res.json({
      success: true,
      data: {
        messages,
        pagination: {
          pageNum,
          pageSize,
          totalCount,
          totalPages: Math.ceil(totalCount / pageSize)
        }
      }
    });
  } catch (error) {
    console.error('获取留言列表失败:', error);
    res.status(500).json({
      success: false,
      message: '获取留言列表失败，请稍后重试'
    });
  }
});

// 添加留言API
app.post('/api/guestbook', async (req, res) => {
  try {
    const { nickname, email, content } = req.body;
    
    // 基本验证
    if (!nickname || !content) {
      return res.status(400).json({
        success: false,
        message: '昵称和内容不能为空'
      });
    }
    
    if (nickname.length < 1 || nickname.length > 20) {
      return res.status(400).json({
        success: false,
        message: '昵称长度应在1-20个字符之间'
      });
    }
    
    if (content.length > 500) {
      return res.status(400).json({
        success: false,
        message: '留言内容不能超过500个字符'
      });
    }
    
    // 使用存储过程添加留言
    const result = await pool.request()
      .input('Nickname', sql.NVarChar, nickname)
      .input('Email', sql.NVarChar, email || null)
      .input('Content', sql.NVarChar, content)
      .execute('sp_AddGuestbookMessage');
    
    res.json({
      success: true,
      message: '留言发布成功',
      data: {
        id: result.recordset[0].NewMessageId
      }
    });
  } catch (error) {
    console.error('添加留言失败:', error);
    res.status(500).json({
      success: false,
      message: '留言提交失败，请稍后重试'
    });
  }
});

// 健康检查端点
app.get('/api/health', (req, res) => {
  res.json({ status: 'API服务器运行正常' });
});

// 启动服务器
const startServer = async () => {
  await initDb();
  
  app.listen(port, () => {
    console.log(`API服务器运行在 http://localhost:${port}`);
    console.log(`健康检查: http://localhost:${port}/api/health`);
    console.log('留言API端点:');
    console.log(`  GET /api/guestbook - 获取留言列表`);
    console.log(`  POST /api/guestbook - 添加新留言`);
  });
};

// 优雅关闭
process.on('SIGINT', async () => {
  console.log('正在关闭API服务器...');
  if (pool) {
    await pool.close();
    console.log('数据库连接已关闭');
  }
  process.exit(0);
});

// 启动服务器
startServer().catch(error => {
  console.error('启动服务器失败:', error);
  process.exit(1);
});