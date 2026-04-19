---
title: start.conf
---

插件首次启动时生成的预备配置文件。

:::caution[必须正确配置此文件才能生成后续配置文件。]
HyperzoneLogin 需要根据此配置文件中的语言选项生成后续的配置文件。  
如果不正确设置语言并设置`ready=true`，插件将不会工作。
:::

```hocon
# ❇️配置注释语言，影响其他配置文件首次生成时的注释语言。
language="zh_cn"
# ⚠️配置文件格式，影响其他配置文件的序列化方式。
# 当前版本仅完整支持 hocon，gson/yaml 为预留选项。
format=hocon
# ❇️就绪标志，必须为 true 插件才会正常启动。
ready=false
```
