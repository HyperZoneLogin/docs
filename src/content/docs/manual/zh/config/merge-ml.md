---
title: "data-merge/multilogin.conf"
---

Multilogin 插件数据迁移配置文件。在`data-merge`模块激活时有效。

```hocon
# 源数据库配置
source {
    # ❇️源库类型，支持 H2DB 或 MYSQL
    type=H2DB
    # H2 配置
    h2 {
        # ⚠️可选：直接指定 JDBC URL。留空时按 path + parameters 生成
        jdbc-url=""
        # ❇️H2 文件路径（相对于插件数据目录）
        path="data-merge/multilogin"
        # ⚠️H2 JDBC 附加参数
        parameters="MODE=MySQL"
        # H2 用户名
        username=root
        # H2 密码
        password=root
    }
    # MySQL 配置
    mysql {
        # ❇️MySQL 地址
        host="127.0.0.1"
        # ❇️MySQL 端口
        port=3306
        # 数据库名
        database="mixed_login"
        # ❇️用户名
        username=root
        # ❇️密码
        password=password
        # ⚠️JDBC 参数
        parameters="useSSL=false&serverTimezone=UTC&characterEncoding=utf8"
    }
}
# 源表名配置
tables {
    # ⚠️旧库 UserDataTableV3 的表名
    user-data-table="multilogin_user_data_v3"
    # ⚠️旧库 InGameProfileTableV3 的表名
    in-game-profile-table="multilogin_in_game_profile_v3"
}
# ❇️service_id 到 entryId 的映射，键为旧库的服务 ID，值为新库的服务 ID；未配置时默认使用 ml_{serviceId}
service-id-mapping {
    "1"=mojang
}
# Floodgate 服务 ID。此服务中的用户数据将会被迁移至 HyperZoneLogin 的 Floodgate 数据表中。
floodgate-service-ids=[]
```

## 服务ID映射配置

`service-id-mapping`配置部分将决定 Multilogin 中的旧用户数据与 HyperZoneLogin 中的 Yggdrasil 服务的对应关系。

此部分需要按照两个插件的具体配置手动填写键值对，其中键名为 Multilogin 中 Yggdrasil 服务的数字ID，而键值为 HyperZoneLogin 中 Yggdrasil 服务的入口ID。

例如，Multilogin 和 HyperzoneLogin 中关于 Littleskin 的条目配置文件分别如下：

```yaml title=multilogin/services/littleskin.yml
id: 2 # Multilogin 的服务数字ID

name: 'LittleSkin'
serviceType: BLESSING_SKIN
yggdrasilAuth:
  blessingSkin:
    apiRoot: 'https://littleskin.cn/api/yggdrasil'
```

```hocon title=hyperzonelogin/auth-yggd/littleskin.conf
id=littleskin # Hyperzonelogin 的服务入口ID
name="Little Skin"
yggdrasil {
    url="https://littleskin.cn/api/yggdrasil/sessionserver/session/minecraft/hasJoined?username={username}&serverId={serverId}{ip}"
    pass-yggdrasil-uuid-to-profile-resolve=true
    timeout=10000
    retry=0
    retry-delay=0
    proxy {
        ...
    }
}
```

那么你应当在`service-id-mapping`中添加这样一个键值对：

```hocon title=hyperzonelogin/data-merge/multilogin.conf
...
service-id-mapping {
    "2"=littleskin
}
```
