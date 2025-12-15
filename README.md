# Ivan's Universe 个人网站

## 项目介绍

Ivan's Universe 是一个现代化的个人品牌展示网站，展示Ivan Wang的兴趣爱好、作品及社交信息。网站包含音乐、个人照片、咖啡、影视四大类兴趣内容的展示，以及访客留言互动功能。

## 功能特点

- **音乐分享**：展示Drake和The Weeknd的音乐内容
- **个人照片**：展示生活照、兴趣相关照片等
- **咖啡爱好者**：展示咖啡相关图片和品鉴感受
- **影视爱好者**：展示电影海报、观影截图和个人影评
- **留言板**：支持访客留言，数据保存至SQL Server数据库
- **响应式设计**：适配桌面端、平板端和移动端

## 技术栈

- **前端框架**：React 18 + TypeScript
- **UI组件库**：shadcn/ui (Radix UI)
- **样式框架**：Tailwind CSS
- **路由管理**：React Router
- **状态管理**：React Hooks
- **数据库**：SQL Server (用于留言数据存储)
- **构建工具**：Vite

## Magic UI、Aceternity UI和Cult UI的使用

本项目采用Magic UI、Aceternity UI和Cult UI的设计理念，实现现代简约、交互丝滑的视觉效果：

1. **Magic UI**：全局布局、配色、基础组件
   - 使用渐变背景和深色系配色
   - 卡片hover动效
   - 极简设计风格

2. **Aceternity UI**：按钮、卡片、提示框的交互动效
   - 缩放+阴影动效
   - 成功提示动画
   - 进度条/评分组件

3. **Cult UI**：表单、标签、极简卡片
   - 极简表单样式
   - 标签化展示
   - 简约卡片布局

## 项目结构

```
ivan-universe/
├── public/                  # 静态资源
├── src/
│   ├── assets/              # 图片资源
│   │   ├── coffee/          # 咖啡相关图片
│   │   ├── drake/           # Drake相关图片
│   │   ├── movies/          # 影视相关图片
│   │   ├── photos/          # 个人照片
│   │   └── weeknd/          # The Weeknd相关图片
│   ├── components/          # 通用组件
│   │   ├── Layout.tsx       # 页面布局组件
│   │   └── ui/              # UI组件库
│   ├── hooks/               # 自定义Hooks
│   ├── lib/                 # 工具函数
│   ├── pages/               # 页面组件
│   │   ├── Home.tsx         # 首页
│   │   ├── Music.tsx        # 音乐页面
│   │   ├── PersonalPhotos.tsx  # 个人照片页面
│   │   ├── Coffee.tsx       # 咖啡页面
│   │   ├── Movies.tsx       # 影视页面
│   │   └── Guestbook.tsx    # 留言板页面
│   ├── types/               # 类型定义
│   ├── App.tsx              # 应用主组件
│   ├── main.tsx             # 应用入口
│   └── index.css            # 全局样式
├── components.json           # shadcn/ui配置
├── package.json              # 项目依赖
├── tailwind.config.js       # Tailwind配置
├── tsconfig.json            # TypeScript配置
└── vite.config.ts           # Vite配置
```

## 安装与运行

### 前置要求

- Node.js 18+ 
- npm 或 yarn
- SQL Server 2019+ (用于留言功能)

### 安装依赖

```bash
npm install
```

### 开发环境运行

```bash
npm run dev
```

项目将在 http://localhost:3000 启动

### 生产环境构建

```bash
npm run build
```

构建后的文件将生成在 `dist` 目录中

## 留言功能配置

### 数据库设置

1. **创建数据库**：在SQL Server中创建名为 `IvanUniverseDB` 的数据库

2. **创建数据表**：执行以下SQL脚本创建 `Guestbook` 表：

```sql
-- IvanUniverseDB_Init.sql
USE IvanUniverseDB;
GO

-- 创建Guestbook表
CREATE TABLE Guestbook (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nickname NVARCHAR(20) NOT NULL,
    Email NVARCHAR(50) NULL,
    Content NVARCHAR(500) NOT NULL,
    CreateTime DATETIME NOT NULL DEFAULT GETDATE()
);
GO
```

3. **配置连接字符串**：在项目中修改数据库连接配置

```javascript
// src/lib/db.js (示例)
const config = {
  server: 'localhost',         // SQL Server地址
  database: 'IvanUniverseDB',  // 数据库名
  authentication: 'windows',   // 或 'sql' 使用SQL Server身份验证
  options: {
    encrypt: false,
    enableArithAbort: true
  }
};

// 如果使用SQL Server身份验证
// const config = {
//   server: 'localhost',
//   database: 'IvanUniverseDB',
//   authentication: 'sql',
//   user: 'your_username',
//   password: 'your_password',
//   options: {
//     encrypt: false,
//     enableArithAbort: true
//   }
// };
```

### 后端API设置

目前项目使用模拟数据展示留言功能。要连接真实的SQL Server数据库，您需要：

1. 创建一个后端API服务（如Node.js + Express）
2. 实现以下API端点：
   - `GET /api/guestbook` - 获取留言列表（支持分页）
   - `POST /api/guestbook` - 提交新留言
3. 在前端调用这些API替换当前的数据模拟

## 自定义配置

### 修改图片路径

图片路径在各页面组件中定义，如需修改图片文件夹位置，请更新对应的import路径：

```javascript
// 示例：修改音乐页面图片路径
import drake1 from '@/assets/drake/3889FC0D27F521B8ABDF80238DBCCF1B.png';
```

### 自定义配色方案

在 `tailwind.config.js` 中修改主题色彩：

```javascript
theme: {
  extend: {
    colors: {
      // 自定义颜色
      "magic-purple": "#8B5CF6",
      "magic-gray": "#1E293B",
      "coffee-brown": "#936F47",
      "music-red": "#D14343",
      "movie-blue": "#165DFF",
    }
  }
}
```

## 部署

### 使用CloudStudio部署

1. 在集成菜单中登录CloudStudio
2. 构建项目：`npm run build`
3. 将 `dist` 目录上传到服务器
4. 配置Web服务器（如Nginx）托管静态文件

### 使用其他云服务

可以将项目部署到任何支持静态文件托管的云服务，如：
- Vercel
- Netlify
- GitHub Pages
- 阿里云OSS
- 腾讯云COS

## 注意事项

1. **图片资源**：确保所有图片文件都已正确放置在 `src/assets` 对应的目录中
2. **响应式适配**：项目已适配多种屏幕尺寸，但建议在不同设备上测试
3. **浏览器兼容性**：项目支持现代浏览器，如需兼容旧版浏览器，可能需要添加polyfills
4. **性能优化**：生产构建会自动进行代码分割和资源优化

## 联系信息

如有问题或建议，请联系：
- 邮箱：320673961@qq.com
- Instagram：yuk11andre
- 抖音：宇酱

## 许可证

本项目仅供个人使用，不得用于商业用途。