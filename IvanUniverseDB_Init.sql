-- Ivan's Universe 网站数据库初始化脚本
-- 文件名: IvanUniverseDB_Init.sql
-- 描述: 创建IvanUniverseDB数据库和Guestbook表

-- 创建数据库（如果不存在）
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'IvanUniverseDB')
BEGIN
    CREATE DATABASE IvanUniverseDB;
    PRINT '数据库 IvanUniverseDB 创建成功';
END
ELSE
BEGIN
    PRINT '数据库 IvanUniverseDB 已存在';
END
GO

-- 使用IvanUniverseDB数据库
USE IvanUniverseDB;
GO

-- 创建Guestbook表（如果不存在）
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Guestbook' AND xtype='U')
BEGIN
    CREATE TABLE Guestbook (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Nickname NVARCHAR(20) NOT NULL,
        Email NVARCHAR(50) NULL,
        Content NVARCHAR(500) NOT NULL,
        CreateTime DATETIME NOT NULL DEFAULT GETDATE()
    );
    
    -- 添加表注释
    EXEC sp_addextendedproperty 
        @name = N'MS_Description', 
        @value = N'留言板表，存储访客留言信息', 
        @level0type = N'SCHEMA', @level0name = N'dbo', 
        @level1type = N'TABLE', @level1name = N'Guestbook';
    
    -- 添加字段注释
    EXEC sp_addextendedproperty 
        @name = N'MS_Description', 
        @value = N'留言ID，主键，自增', 
        @level0type = N'SCHEMA', @level0name = N'dbo', 
        @level1type = N'TABLE', @level1name = N'Guestbook', 
        @level2type = N'COLUMN', @level2name = N'Id';
        
    EXEC sp_addextendedproperty 
        @name = N'MS_Description', 
        @value = N'访客昵称，非空', 
        @level0type = N'SCHEMA', @level0name = N'dbo', 
        @level1type = N'TABLE', @level1name = N'Guestbook', 
        @level2type = N'COLUMN', @level2name = N'Nickname';
        
    EXEC sp_addextendedproperty 
        @name = N'MS_Description', 
        @value = N'访客邮箱，可为空', 
        @level0type = N'SCHEMA', @level0name = N'dbo', 
        @level1type = N'TABLE', @level1name = N'Guestbook', 
        @level2type = N'COLUMN', @level2name = N'Email';
        
    EXEC sp_addextendedproperty 
        @name = N'MS_Description', 
        @value = N'留言内容，非空', 
        @level0type = N'SCHEMA', @level0name = N'dbo', 
        @level1type = N'TABLE', @level1name = N'Guestbook', 
        @level2type = N'COLUMN', @level2name = N'Content';
        
    EXEC sp_addextendedproperty 
        @name = N'MS_Description', 
        @value = N'留言时间，默认为当前时间', 
        @level0type = N'SCHEMA', @level0name = N'dbo', 
        @level1type = N'TABLE', @level1name = N'Guestbook', 
        @level2type = N'COLUMN', @level2name = N'CreateTime';
    
    PRINT '表 Guestbook 创建成功';
END
ELSE
BEGIN
    PRINT '表 Guestbook 已存在';
END
GO

-- 添加一些示例数据（可选，生产环境可以删除此部分）
-- 注意：在实际部署时，可能需要先删除这部分代码

IF NOT EXISTS (SELECT * FROM Guestbook)
BEGIN
    PRINT '正在插入示例数据...';
    
    INSERT INTO Guestbook (Nickname, Email, Content) VALUES 
    (N'音乐爱好者', N'music@example.com', N'你的音乐分享太棒了！特别是Drake的部分，我也很喜欢他的音乐。希望能听到更多你的分享！'),
    (N'咖啡探索者', NULL, N'咖啡照片拍得真专业，看起来都很好喝！下次有机会一起去探店吧。'),
    (N'电影迷', N'movie@example.com', N'你的影评写得很详细，推荐的电影我都很喜欢。有没有其他类型的电影推荐？'),
    (N'访客', NULL, N'网站设计得很有艺术感，特别是UI风格。请问使用的是什么UI框架？'),
    (N'老同学', N'classmate@example.com', N'好久不见！看到你分享的照片感觉你现在过得很精彩啊！有空联系一下。');
    
    PRINT '示例数据插入成功';
END
ELSE
BEGIN
    PRINT '表中已存在数据，跳过示例数据插入';
END
GO

-- 创建查询留言的存储过程（可选）
IF NOT EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_GetGuestbookMessages')
BEGIN
    EXEC('
    CREATE PROCEDURE sp_GetGuestbookMessages
        @PageNum INT = 1,
        @PageSize INT = 10
    AS
    BEGIN
        SET NOCOUNT ON;
        
        -- 计算要跳过的记录数
        DECLARE @Offset INT = (@PageNum - 1) * @PageSize;
        
        -- 查询分页留言数据
        SELECT 
            Id,
            Nickname,
            Email,
            Content,
            CreateTime
        FROM 
            Guestbook
        ORDER BY 
            CreateTime DESC
        OFFSET @Offset ROWS
        FETCH NEXT @PageSize ROWS ONLY;
        
        -- 获取总记录数
        SELECT COUNT(*) AS TotalCount FROM Guestbook;
    END
    ');
    
    PRINT '存储过程 sp_GetGuestbookMessages 创建成功';
END
ELSE
BEGIN
    PRINT '存储过程 sp_GetGuestbookMessages 已存在';
END
GO

-- 创建添加留言的存储过程（可选）
IF NOT EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_AddGuestbookMessage')
BEGIN
    EXEC('
    CREATE PROCEDURE sp_AddGuestbookMessage
        @Nickname NVARCHAR(20),
        @Email NVARCHAR(50) = NULL,
        @Content NVARCHAR(500)
    AS
    BEGIN
        SET NOCOUNT ON;
        
        -- 检查昵称和内容是否为空
        IF LEN(@Nickname) = 0 OR LEN(@Content) = 0
        BEGIN
            RAISERROR('昵称和内容不能为空', 16, 1);
            RETURN;
        END
        
        -- 插入新留言
        INSERT INTO Guestbook (Nickname, Email, Content)
        VALUES (@Nickname, @Email, @Content);
        
        -- 返回新插入留言的ID
        SELECT SCOPE_IDENTITY() AS NewMessageId;
    END
    ');
    
    PRINT '存储过程 sp_AddGuestbookMessage 创建成功';
END
ELSE
BEGIN
    PRINT '存储过程 sp_AddGuestbookMessage 已存在';
END
GO

PRINT 'IvanUniverseDB 数据库初始化完成！';
GO