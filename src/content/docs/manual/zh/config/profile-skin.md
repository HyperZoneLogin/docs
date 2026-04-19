---
title: "profile-skin.conf"
---

玩家皮肤缓存模块配置。在模块`profile-skin`激活时有效。

```hocon
# 启用本模块
enabled=true
# 优先缓存并已携带签名的材质
prefer-upstream-signed-textures=true
# 不修复的入口ID
trusted-signed-texture-entries=[
    mojang
]
# 修复非官方签名
restore-unsigned-textures=true
# MineSkin 修复配置
mine-skin {
    # 生成方式：URL 或 UPLOAD
    method=URL
    # 出错时改模式重试
    retry-upload-on-url-read-failure=true
    # ⚠️URL 模式接口地址
    url-endpoint="https://api.mineskin.org/generate/url"
    # ⚠️上传模式接口地址
    upload-endpoint="https://api.mineskin.org/generate/upload"
    # 请求超时时间（毫秒）
    timeout-millis=15000
    # HTTP User-Agent
    user-agent="HyperZoneLogin/1.0"
}
```
