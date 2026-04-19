---
title: core.conf
---

插件核心配置文件，包括数据库、模块、等待区设置、调试输出等配置。

```hocon
# 数据库
database {
    # ❇️数据库类型
    # 支持的值: SQLITE, MYSQL, MARIADB
    type=SQLITE
    # SQLite 数据库配置
    sqlite {
        # 数据库文件路径（相对于插件数据目录）
        path="data/hyperzone_login.db"
    }
    # MySQL 数据库配置
    mysql {
        # ❇️地址
        host=localhost
        # ❇️端口
        port=3306
        # 库名
        database="hyperzone_login"
        # ❇️用户名
        username=root
        # ❇️密码
        password=password
        # ⚠️额外的连接参数
        parameters="useSSL=false&serverTimezone=UTC&characterEncoding=utf8"
        # ⚠️JDBC 驱动类（通常不需要修改）
        driver-class-name="com.mysql.cj.jdbc.Driver"
    }
    # MariaDB 数据库配置
    mariadb {
        # ❇️地址
        host=localhost
        # ❇️端口
        port=3306
        # 库名
        database="hyperzone_login"
        # ❇️用户名
        username=root
        # ❇️密码
        password=password
        # ⚠️额外的连接参数
        parameters="useSSL=false&characterEncoding=utf8"
        # ⚠️JDBC 驱动类（通常不需要修改）
        driver-class-name="org.mariadb.jdbc.Driver"
    }
    # ⚠️数据库表前缀（随意修改可能导致无法读取数据）
    table-prefix="hz_"
    # ⚠️连接池配置（影响数据库连接性能）
    pool {
        # ⚠️最大连接数
        maximum-pool-size=10
        # ⚠️最小空闲连接数
        minimum-idle=2
        # ⚠️连接超时时间（毫秒）
        connection-timeout=30000
        # ⚠️空闲连接超时时间（毫秒）
        idle-timeout=600000
        # ⚠️连接最大生命周期（毫秒）
        max-lifetime=1800000
    }
}
# UUID映射
remap {
    # ⚠️未开启对应渠道UUID透传时的生成前缀，如果填OfflinePlayer则为行业标准离线生成法
    prefix=HyperZone
}
# 杂项
misc {
    # ⚠️不给服务器发送 CHAT_SESSION_UPDATE包
    kill-chat-session=true
}
# Debug
debug {
    # 日志调试开关；建议统一放在此分支下配置
    log {
        # 通用 debug 日志
        general=false
        # Floodgate / OutPre 预登录链路追踪日志
        out-pre-trace=false
        # ProfileSkin 相关调试日志
        profile-skin=false
        # 后端等待区兼容链路调试日志
        backend-compat=false
        # Netty / GameProfile 重写链路调试日志
        network-rewrite=false
        # Yggdrasil 认证链路调试日志
        yggdrasil-auth=false
    }
    # 慢测试模式相关配置
    slow-test {
        # 开启后，外部模块直接调用 overVerify 将被忽略，只有等待区 /over 才会真正完成 overVerify
        enabled=false
    }
}
# ❇️模块开关
modules {
    # Floodgate 认证；仅在已安装 floodgate 时生效
    auth-floodgate=true
    # 离线认证
    auth-offline=true
    # Yggdrasil 认证
    auth-yggd=true
    # 安全防护
    safe=true
    # 皮肤缓存
    profile-skin=true
    # 数据迁移
    data-merge=false
}
# 等待区服务器
v-server {
    # 登录服实现模式：backend 或 outpre。推荐 outpre 模式，若有问题请使用backend模式。
    mode=outpre
    # ❇️认证完成后默认进入的服务器
    post-auth-default-server=play
    # 记住认证时收到的服务器跳转请求
    remember-requested-server-during-auth=true
    backend {
        # 使用的真实认证等待服 Velocity 服务器名
        fallback-auth-server=lobby
        # 等待区 UpsertPlayerInfo/TabList 兼容过滤补偿
        enable-player-info-compensation=true
        # 档案补偿同步
        enable-profile-compensation=true
        # 在线热改 name（风险较低，默认开启）
        enable-name-hot-change=true
        # 在线热改 UUID（高风险，默认关闭）
        enable-uuid-hot-change=false
    }
    outpre {
        # 认证服的逻辑名，仅用于日志/状态标识；不需要在 Velocity 的 servers 中注册。
        # 如果使用 ViaVersion，你需要在 Velocity 的 servers 中添加注册条目，如 outpre-auth = "127.0.0.1:30066"，但不需要将其配置到 try 队列。
        auth-label=outpre-auth
        # ❇️认证服的直连地址
        auth-host="127.0.0.1"
        # ❇️认证服的直连端口
        auth-port=30066
        # 转接给认证服时，在连接握手中对后端暴露的 Host；留空时使用 authHost
        presented-host=""
        # 转接给认证服时，在连接握手中对后端暴露的 Port；<=0 时使用 authPort
        presented-port=-1
        # 转接给认证服时，在连接握手中对后端暴露的玩家源 IP；留空时使用玩家真实 IP
        presented-player-ip=""
    }
}
# 消息
messages {
    # 默认语言；当未启用客户端语言检测，或客户端语言没有对应语言文件时使用
    default-locale="zh_cn"
    # 消息缺失时的回退语言；建议始终保留 en_us 或 zh_cn 之一
    fallback-locale="en_us"
    # 优先尝试读取客户端语言
    use-client-locale=true
}
```
