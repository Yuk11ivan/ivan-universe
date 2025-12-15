# GitHub Pages 部署指南

## 准备工作

1. **确保您有GitHub账号**
   - 如果没有，请先注册GitHub账号

2. **安装Git**
   - 下载并安装Git: https://git-scm.com/downloads

## 部署步骤

### 第一步：创建GitHub仓库

1. 登录GitHub账号
2. 点击右上角"+" → "New repository"
3. 填写仓库信息：
   - **Repository name**: `ivan-universe` (推荐使用此名称)
   - **Description**: "Ivan's Universe - 个人品牌展示网站"
   - **Public** (选择公开仓库)
   - **Initialize this repository with a README** (勾选)
4. 点击"Create repository"

### 第二步：本地Git初始化

```bash
# 进入项目目录
cd d:/个人网站成品/ivan-universe-stable

# 初始化Git仓库
git init

# 添加远程仓库地址（将YOUR_USERNAME替换为您的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/ivan-universe.git

# 添加所有文件到暂存区
git add .

# 提交更改
git commit -m "Initial commit: Ivan's Universe personal website"

# 推送到GitHub
git branch -M main
git push -u origin main
```

### 第三步：启用GitHub Pages

1. 在GitHub仓库页面，点击"Settings"标签
2. 在左侧菜单找到"Pages"
3. 在"Source"部分选择：
   - **GitHub Actions** (推荐)
   - 或者选择"Deploy from a branch" → "main" → "/ (root)"
4. 点击"Save"

### 第四步：配置GitHub Actions（自动）

项目已经配置了GitHub Actions工作流文件：
- 文件位置：`.github/workflows/deploy.yml`
- 当您推送代码到main分支时，会自动构建并部署

### 第五步：访问您的网站

部署完成后，您的网站将在以下地址访问：
```
https://YOUR_USERNAME.github.io/ivan-universe/
```

**注意**：首次部署可能需要几分钟时间生效。

## 自定义域名（可选）

如果您想使用自定义域名：

1. 在GitHub Pages设置中，在"Custom domain"字段输入您的域名
2. 在您的域名DNS设置中添加CNAME记录：
   ```
   Type: CNAME
   Name: www (或@)
   Value: YOUR_USERNAME.github.io
   ```
3. 在项目根目录创建`CNAME`文件，内容为您的域名

## 常见问题

### 1. 部署失败
- 检查GitHub Actions日志查看错误信息
- 确保所有依赖正确安装
- 确认`package.json`中的脚本配置正确

### 2. 图片不显示
- 检查图片路径是否正确
- 确保所有图片文件已提交到GitHub
- 确认GitHub Pages的base路径配置

### 3. 样式丢失
- 检查`vite.config.ts`中的base配置
- 确认Tailwind CSS构建正常

### 4. 更新网站内容
```bash
# 修改代码后
git add .
git commit -m "Update website content"
git push origin main
```

## 技术说明

- **构建工具**: Vite
- **部署方式**: GitHub Pages + GitHub Actions
- **访问地址**: https://YOUR_USERNAME.github.io/ivan-universe/
- **自动部署**: 每次推送到main分支时自动部署

## 联系方式

如有部署问题，请联系：
- 邮箱：320673961@qq.com
- GitHub Issues: 在仓库页面创建Issue