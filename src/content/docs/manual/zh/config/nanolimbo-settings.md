---
title: 内置 NanoLimbo 配置文件
---

此文件内容与[NanoLimbo](https://github.com/Nan1t/NanoLimbo)的配置文件一致。

```yaml
# 内置服务器的地址和端口。将ip设为空即可使用任意公开地址。
bind:
  ip: "localhost"
  port: 30066

# 服务器可接受的最大玩家数量。
# 要移除玩家上限，将本项设为-1。
maxPlayers: 100

# 服务器列表中的信息。
ping:
  description: "<gradient:blue:white>NanoLimbo"
  version: "<gradient:blue:white>NanoLimbo"
  # 指定客户端Ping服务端时返回的协议版本号。
  # 默认为-1，此时返回客户端所对应的协议版本。
  # 详见https://zh.minecraft.wiki/w/%E5%8D%8F%E8%AE%AE%E7%89%88%E6%9C%AC#%E5%8D%8F%E8%AE%AE%E7%89%88%E6%9C%AC%E5%88%97%E8%A1%A8
  protocol: -1

# 可用维度：OVERWORLD（主世界）, THE_NETHER（下界）, THE_END（末地）
dimension: THE_END

# 是否在玩家列表中显示玩家名。
# 对于1.16.5的客户端，为防止崩溃，即便此处禁用也会发送玩家列表。
playerList:
  enable: true
  username: "NanoLimbo"

# 是否在玩家列表显示页眉和页脚。
# 仅适用于1.8+客户端
headerAndFooter:
  enable: true
  header: "<white>Welcome!"
  footer: "<gradient:blue:white>NanoLimbo"

# 设置玩家的游戏模式。
# 0 - 生存
# 1 - 创造（隐藏生命值和饥饿值）
# 2 - 冒险
# 3 - 旁观（隐藏所有底部UI）
# 旁观者模式仅适用于1.8+客户端
gameMode: 3

# 移除“不安全聊天信息”的弹窗。
# 仅适用于1.20.5+客户端
secureProfile: false

# F3调试界面显示的服务端名称。
# 仅适用于1.13+客户端
brandName:
  enable: true
  content: "<gradient:blue:white>NanoLimbo"

# 玩家加入服务器时发送的消息。
joinMessage:
  enable: true
  text: "<white>Welcome to the <gradient:blue:white>NanoLimbo<white>!"

# 玩家加入服务器时显示的BOSS栏。
# 仅适用于1.9+客户端
bossBar:
  enable: true
  text: "<white>Welcome to the <gradient:blue:white>NanoLimbo<white>!"
  health: 1.0
  # 可用颜色：PINK, BLUE, RED, GREEN, YELLOW, PURPLE, WHITE
  color: BLUE
  # 可用样式：SOLID, DASHES_6, DASHES_10, DASHES_12, DASHES_20
  division: SOLID

# 玩家加入服务器时显示的标题和副标题。
# 仅适用于1.8+客户端
title:
  enable: true
  # 若仅需副标题，请将此项留空
  title: "<white><b>Welcome!"
  # 若仅需标题，请将此项留空
  subtitle: "<gradient:blue:white>NanoLimbo"
  # 淡入时长，以游戏刻为单位（1秒=20游戏刻）
  fadeIn: 10
  # 持续显示时长，以游戏刻为单位
  stay: 100
  # 淡出时长，以游戏刻为单位
  fadeOut: 10

# ❇️玩家信息转发协议支持。
# 可用类型：
#  - NONE
#  - LEGACY
#  - MODERN
#  - BUNGEE_GUARD
# 如果你不使用MODERN类型，不要设置`secret`。
#
# `secret`和`tokens`都接受'@'前缀。 prefix to load the value from an
# 该前缀允许你从外部文件读取数值（路径是和当前目录的相对路径）。
# 如果你需要避免将密钥写入本文件，可使用此前缀：如Docker密钥或SOPS。
# 例如：
#   secret: '@secret.txt'
#   tokens: '@tokens.txt'        # 一行一个token，允许'#'前缀注释
#   tokens:
#     - 'inline-token'
#     - '@extra-tokens.txt'      # 可以同时直接写入密钥和通过文件读取密钥
infoForwarding:
  type: NONE
  secret: "<YOUR_SECRET_HERE>"
  tokens:
  - "<BUNGEE_GUARD_TOKEN>"

# 连接超时时长，单位为毫秒
readTimeout: 30000

# 在连接时记录玩家的IP地址。
# 如需保护隐私或遵循GDPR规范，将此项设为false即可从日志隐藏IP地址（以"<redacted>"显示）
logPlayersIp: true

# 定义日志级别。生产环境建议使用级别2。
# 日志级别说明：
# 0 - 只显示错误
# 1 - 显示错误和警告
# 2 - 显示错误、警告、和普通日志
# 3 - 显示错误、警告、普通日志、和调试信息
debugLevel: 2

# ⚠️警告！如果你不清楚自己在干什么，不要动这一部分的配置！
netty:
  # Available transport type:
  # - EPOLL
  # - IO_URING
  # - KQUEUE
  # - NIO
  transportType: EPOLL
  # EventLoopGroup threads count
  threads:
    bossGroup: 1
    workerGroup: 4

# 检查入站流量并踢出可疑连接的设置。
# 要注意玩家也可以发送很多小数据包，比如单纯地移动鼠标。
traffic:
  # If true, then additional handler will be added to the channel pipeline
  enable: true
  # Max packet size in bytes
  # Unlimited if -1
  maxPacketSize: 8192
  # The interval to measure packets over
  # Lowering this value will limit peak packets from players which would target people with bad connections
  # Raising this value will allow higher peak packet rates, which will help with people who have poor connections
  # Ignored if -1.0
  interval: 7.0
  # The maximum packets per second for players
  # It is measured over the configured interval
  # Ignored if -1.0
  maxPacketRate: 500.0
  # The maximum packet bytes per second for players
  # It is measured over the configured interval as an average bytes/sec
  # Ignored if -1.0
  maxPacketBytesRate: 2048.0
```
