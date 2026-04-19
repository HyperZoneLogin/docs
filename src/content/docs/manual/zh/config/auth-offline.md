---
title: auth-offline.conf
---

离线登陆验证模块配置文件。在模块`auth-offline`激活时有效。

```hocon
# 离线认证主要设置
main {
    # 密码规则
    password {
        # 最短密码长度
        min-length=6
        # 最长密码长度
        max-length=64
        # 禁止密码含用户名
        deny-name-in-password=true
    }
    # 登录保护
    login {
        # 输错多少次锁定登录
        max-attempts=5
        # 锁定冷却时间（秒）
        block-seconds=300
    }
    # 邮箱与找回
    email {
        # 启用邮箱命令
        enabled=true
        # 恢复码投递模式：LOG 或 SMTP
        delivery-mode=LOG
        # 恢复码长度
        recovery-code-length=6
        # 恢复码有效期（分钟）
        recovery-code-expire-minutes=15
        # 请求恢复邮件冷却（秒）
        recovery-cooldown-seconds=120
        # 单个恢复码允许输错次数
        max-code-verify-attempts=3
        # 恢复码校验成功后，允许修改密码的时间窗口（分钟）
        reset-password-window-minutes=10
        # 恢复邮件模板与 SMTP 配置
        smtp {
            # 邮件显示的服务器名称
            server-name=HyperZoneLogin
            # ❇️SMTP 服务器地址
            host="smtp.example.com"
            # ❇️SMTP 端口
            port=587
            # 是否启用 SMTP 认证
            auth=true
            # ❇️SMTP 用户名
            username="noreply@example.com"
            # ❇️SMTP 密码或应用专用密码
            password=change-me
            # 是否启用 STARTTLS
            start-tls=true
            # ❇️是否直接使用 SSL
            ssl=false
            # 连接超时（毫秒）
            connection-timeout-millis=10000
            # 读取超时（毫秒）
            read-timeout-millis=10000
            # 写入超时（毫秒）
            write-timeout-millis=10000
            # ❇️发件人邮箱
            from-address="noreply@example.com"
            # ❇️发件人名称
            from-name=HyperZoneLogin
            # ❇️恢复邮件主题，支持占位符：%server%、%player%
            recovery-subject="[%server%] 账号密码找回验证码"
            # ❇️恢复邮件正文，支持占位符：%server%、%player%、%email%、%code%、%minutes%。使用 \n 表示换行
            recovery-body="你好，%player%。\\n\\n你在 %server% 请求了离线账号密码找回。\\n验证码：%code%\\n有效期：%minutes% 分钟\\n\\n如果不是你本人操作，请忽略这封邮件。"
        }
    }
    # 提示
    prompt {
        # 首次进入邮箱找回提示
        show-recovery-hint=true
    }
    # 会话自动登录
    session {
        # 短期会话自动登录
        enabled=false
        # 会话有效期（分钟）
        expire-minutes=30
        # 会话与玩家 IP 绑定
        bind-ip=true
        # 注册成功后立刻签发会话
        issue-on-register=true
    }
    # ⚠️透传离线 UUID
    pass-offline-uuid-to-profile-resolve=true
    # TOTP 二步验证
    totp {
        # 启用 TOTP（二步验证功能）
        enabled=true
        # 在验证器 App 中显示的名称
        issuer=HyperZoneLogin
        # 待确认 TOTP 密钥的有效期（分钟）
        pending-expire-minutes=10
        # 允许 短期会话 跳过二次验证
        allow-session-bypass=false
    }
}
# ⚠️玩家正离线形态匹配设置
match {
    # 是否允许进行匹配
    enable=true
    # UUID匹配设定
    uuid-match {
        # 是否允许全0的UUID(Zalith) 匹配为离线
        zero=true
        # 是否允许默认uuid生成方法 匹配为离线
        offline=true
        # 关于PCL2启动器匹配的细节设定
        pcl2 {
            # PCL2的UUID匹配
            enable=true
            # PCL2的UUID进行哈希计算匹配
            hash=true
            # PCL2的苗条模型UUID匹配
            slim=true
        }
    }
    # Host匹配设定
    host-match {
        start=[
            offline,
            o-
        ]
    }
}
```
