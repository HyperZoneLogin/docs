---
title: Yggdrasil 条目配置文件
---

每个 Yggdrasil 服务都需要一个对应的条目配置文件，你需要将它们统一放到插件数据目录的`entry`目录下。注意`example`目录中的配置文件不会被读取。配置文件结构见下。配置在激活`auth-yggd`模块时有效。

```hocon
# 入口ID（不区分大小写），用于内部识别
id=Example
# 别称，用于内容显示
name=Unnamed
# 验证服务配置
yggdrasil {
    # hasJoined 验证 URL
    # 在hasJoined URL后面还需要添加参数 "?username={username}&serverId={serverId}{ip}" 进行验证请求
    # 链接样例参见hyperzonelogin/auth-yggd/littleskin.conf文件
    url=""
    # UUID透传
    pass-yggdrasil-uuid-to-profile-resolve=true
    # 验证请求超时时间（毫秒）
    timeout=10000
    # 重试次数
    retry=0
    # 重试请求延迟（毫秒）
    retry-delay=0
    # ⚠️代理设置
    proxy {
        # 设置代理类型
        # DIRECT - 直接连接、或没有代理
        # HTTP - 表示高级协议(如HTTP或FTP)的代理
        # SOCKS - 表示一个SOCKS (V4或V5)代理
        type=DIRECT
        # 代理服务器地址
        hostname="127.0.0.1"
        # 代理服务器端口
        port=1080
        # 代理鉴权用户名，留空则不进行鉴权
        username=""
        # 代理鉴权密码
        password=""
    }
}
```
