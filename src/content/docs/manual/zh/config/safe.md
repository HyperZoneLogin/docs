---
title: "safe.conf"
slug: "manual/zh/config/safe"
---

基础安全模块（`safe`）的配置。

```hocon
# 启用防护
enable=true
# 全局连接频率限制
global-rate-limit {
    max-attempts=80
    window-seconds=10
}
# 同 IP 连接频率限制
ip-rate-limit {
    max-attempts=8
    window-seconds=10
}
# 同 IP 超阈值后的临时冷却
ip-cooldown {
    # 同 IP 临时冷却
    enabled=true
    # 在统计窗口内触发多少次限流后，开始临时封禁
    trigger-attempts=3
    # 统计窗口长度（秒）
    window-seconds=60
    # 触发后的冷却时长（秒）
    cooldown-seconds=300
}
# 自动高峰防护模式
strict-mode {
    # 自动高峰防护模式
    enabled=true
    # 全局连接请求在窗口内达到多少次后进入 严格模式
    trigger-attempts=120
    # 统计窗口（秒）
    window-seconds=15
    # 保持时长（秒）
    recover-after-seconds=90
    # 全局限流
    global-rate-limit {
        max-attempts=30
        window-seconds=10
    }
    # 同 IP 限流
    ip-rate-limit {
        max-attempts=4
        window-seconds=10
    }
}
# 认证失败联动防护
auth-failure {
    # 统一认证失败联动
    enabled=true
    # 同一 IP 在统计窗口内累计多少次认证失败后开始冷却
    trigger-attempts=4
    # 认证失败统计窗口（秒）
    window-seconds=300
    # 触发后的冷却时长（秒）
    cooldown-seconds=600
}
# 用户名基础校验
username {
    # 用户名基础校验
    enable=true
    # 最短长度
    min-length=3
    # 最长长度
    max-length=16
    # 用户名不包含首尾空白
    deny-leading-or-trailing-whitespace=true
    # 允许的用户名正则，默认与 Minecraft 传统用户名规则一致
    pattern="^[A-Za-z0-9_]+$"
}
```
