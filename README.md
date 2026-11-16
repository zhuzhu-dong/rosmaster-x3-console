# rosmaster-x3-console

ROSMASTER X3 麦克纳姆轮机器人的 Web 控制台（课程综设项目）。

前端是一个无构建、无框架的静态页面，通过浏览器直连机器人上运行的
`rosbridge`（WebSocket）和 `web_video_server`（MJPEG）实现实时监控与遥控；
机器人端配套两个 Python 脚本（ROS 2 Foxy / rclpy）用于深度图伪彩和
`/cmd_vel` 安全看门狗。

## 目录结构

```
frontend/            静态前端（index.html + app.js + styles.css）
  assets/            图片、字体、相机流占位帧
  tools/             机器人端 Python 脚本
    cmd_vel_watchdog.py   /cmd_vel 看门狗：0.5 s 无命令补发全零
    depth_colorize.py     16UC1 深度图转彩色，发布 /camera/depth/colorized
  README.md          前端详细说明（话题、接口、安全须知）
```

## 快速开始

在 `frontend/` 目录启动静态服务器：

```bash
python -m http.server 8000
```

打开 `http://localhost:8000`，默认连接机器人
`192.168.1.107`（相机 `:8080`，rosbridge `:9090`）。
换地址无需改代码：

```
http://localhost:8000/?cam=http://<机器人IP>:8080&bridge=ws://<机器人IP>:9090
```

## 功能概览

- 相机三路画面（彩色 / 深度 / 红外），MJPEG 断流自动重连、真实截图
- 激光雷达实时扫描与深度点云（WebGL 单帧重建）
- 麦克纳姆全向遥控：按住才动、急停锁存、链路断开即发全零
- 电池 / IMU / 实测速度 / 固件版本遥测
- 真实连接终端（topics / nodes / services / params 调试命令）

## 安全提示

底盘驱动没有 cmd_vel 超时保护，上实车前务必在机器人容器内运行
`tools/cmd_vel_watchdog.py`，并先把车架空、低速逐方向验证。
详见 [`frontend/README.md`](frontend/README.md)。

## 环境

- 机器人：ROS 2 Foxy · rosbridge :9090 · web_video_server :8080
- 浏览器：Chrome / Edge（需支持 WebSocket、WebGL）
