# ROSMASTER X3 控制台

静态前端：`index.html` + `app.js` + `styles.css`，无构建、无框架、无 npm 依赖。
控制中心接入相机 MJPEG 和 rosbridge 实时遥测，支持麦克纳姆全向操纵、激光雷达、
深度点云、电池/IMU 和真实连接终端。

## 运行

在本目录启动静态服务器（推荐）：

```bash
python -m http.server 8000
```

打开 `http://localhost:8000`。同一局域网其他设备用 `http://<本机 IP>:8000`。

机器人地址默认：

- 相机 `http://192.168.1.107:8080`（web_video_server）
- rosbridge `ws://192.168.1.107:9090`

换地址不用改代码：

```
http://localhost:8000/?cam=http://<机器人IP>:8080&bridge=ws://<机器人IP>:9090
```

Chrome/Edge 直接双击 `index.html` 也能用；但推荐走 HTTP 服务，避免浏览器对本地
文件的限制。

## 相机画面

控制中心左上角切换「彩色 / 深度 / 红外」：

| 来源 | ROS 话题 | 说明 |
| --- | --- | --- |
| 彩色 | `/camera/color/image_raw` | 直接可看，640×480 @ 30 fps |
| 红外 | `/camera/ir/image_raw` | 直接可看 |
| 深度 | `/camera/depth/colorized` | 需要先跑 `tools/depth_colorize.py` |

画面用 `fetch` 读 MJPEG 字节流、逐帧画到 canvas：断流/卡帧/服务重启自动重连；
截图保存 canvas 上那一帧（不是黑图）。`fetch` 需要 web_video_server 返回
`Access-Control-Allow-Origin`（当前版本默认 `*`）。

深度伪彩：`web_video_server` 编码前会把图像转成 `bgr8`，`16UC1` 深度图无法直接转码，
所以 `/camera/depth/image_raw` 通过 8080 只能得到空流。运行：

```bash
docker cp tools/depth_colorize.py yahboom_ros2:/root/depth_colorize.py
docker exec -it yahboom_ros2 /bin/bash
# 容器内（提示栏应显示 ROS_DOMAIN_ID: 32）
python3 /root/depth_colorize.py
```

它会发布 `/camera/depth/colorized`（近红远蓝，默认 0.6–8 m，最多 10 fps）。
如果提示找不到 `rclpy`，先 `source /opt/ros/foxy/setup.bash`。

## 实时遥测（rosbridge · ROS 2 Foxy）

页面用原生 WebSocket 直连 rosbridge，自动重连、重订阅、重 advertise。
订阅：

| 话题 | 类型 | 频率 | 用在 |
| --- | --- | --- | --- |
| `/scan` | `sensor_msgs/msg/LaserScan` | ~8 Hz，1080 点 | 雷达视图 |
| `/imu/data_raw` | `sensor_msgs/msg/Imu` | ~10 Hz | 俯仰/横滚/角速度 |
| `/imu/mag` | `sensor_msgs/msg/MagneticField` | ~10 Hz | 磁航向 |
| `/vel_raw` | `geometry_msgs/msg/Twist` | ~10 Hz | 实测 vx / vy / ω、里程估算 |
| `/voltage` | `std_msgs/msg/Float32` | ~10 Hz | 3S 锂电电量估算 |
| `/edition` | `std_msgs/msg/Float32` | ~10 Hz | 固件版本（实测 3.5） |
| `/connected_clients` | `rosbridge_msgs/msg/ConnectedClients` | 变化时 | 客户端数 |
| `/camera/depth/camera_info` | `sensor_msgs/msg/CameraInfo` | 5 s 节流 | 点云内参 |
| `/camera/depth/image_raw` | `sensor_msgs/msg/Image` | 点云视图 1 Hz | 3D 点云 |

说明：

- 电量由 `/voltage` 按 3S 锂电曲线估算，不是库仑计；没有实时电压时显示 `—`。
- `/vel_raw` 的里程是速度积分估算，不是 `/odom`。
- `/joint_states` 在静止时不发布，界面不显示轮速。
- 数据超过新鲜度阈值后界面显示 `—`，不把旧值当实时值。

## 雷达扫描

「雷达扫描」页和控制中心「雷达模式」是同一个 `/scan` 的实时视图：
白底、同心圆量程环、0° 朝上、正角度朝左；最近障碍用红点标出。
可切换 4/6/8/12 m 显示量程，截图保存为 PNG。

机器人**没有 `/odom`，也没有 base_link 的 TF**，所以这里只显示当前一帧扫描，
不做定位、建图、轨迹或回环。控制中心地图模式已改名为雷达模式。

## 深度点云

「雷达扫描」页切到「深度点云」时，前端按 1 Hz 订阅 `/camera/depth/image_raw`，
解码 16UC1、用相机内参反投影，在浏览器 WebGL 里画单帧点云：

- 约 2–3 万点（3 像素降采样），近暖远冷；
- 拖拽旋转、滚轮缩放；
- 离开视图立即取消订阅，不常驻 0.8 MB/s；
- 由深度图重建，不是订阅 `/camera/depth/points`，也不是网格重建。

## 麦克纳姆底盘

操纵面板是 3×3 全向盘 + 左右原地转：

```
  左前  前进  右前
  左移  停止  右移
  左后  后退  右后      [左转] [右转]
```

- **按住才动**：`pointerdown` 立即发布并每 100 ms 重发 `/cmd_vel`；
  松开、指针离开盘面、窗口失焦、页面隐藏、切页、急停、链路断开都立即发全零。
- `linear.x` 前后，`linear.y` 左右平移（ROS 约定 +y 向左），`angular.z` 原地转。
- 平移速度 0.1–0.6 m/s（驱动上限 1.0）；转向固定 0.6 rad/s（驱动上限 5.0）。
- 「锁止」模式禁用盘；「急停」是锁存式，按一次锁定、再按一次解除。
- 每次 rosbridge 连接建立时先发一次全零 `/cmd_vel`，清掉上次残留。

### 必开的安全看门狗

底盘驱动没有看到 cmd_vel 超时保护。请在机器人容器里同时运行：

```bash
docker cp tools/cmd_vel_watchdog.py yahboom_ros2:/root/cmd_vel_watchdog.py
docker exec -it yahboom_ros2 /bin/bash
python3 /root/cmd_vel_watchdog.py
```

它订阅 `/cmd_vel`，0.5 s 没有非零命令就补发一次全零 Twist；可调：

```bash
python3 /root/cmd_vel_watchdog.py --ros-args -p timeout_s:=0.5
```

**首次实车运动**：把车垫起/架空，速度 0.1 m/s，逐方向确认前后、平移、旋转方向；
再落地测试松开即停、急停、断网/关页面。软件看门狗不能替代现场断电。

## 车身外设

「机器信息」页可控制：

- 蜂鸣器：点「鸣笛 0.5 s」发 `/Buzzer true`，0.5 s 后自动 false；连接建立时也会补发 false。
- RGB 灯效：按钮 0–6 发 `/RGBLight Int32`；编号由底盘驱动定义（现场确认），0 为关。

## 连接与通信

- 真实连接/断开 rosbridge，显示真实往返延迟、ROS 版本、固件、客户端数。
- 终端命令：

  ```
  status / topics [过滤] / nodes / services
  type <topic> / param <name> / version / time
  battery / scan / imu / vel / clients / depth
  connect / disconnect / help / clear
  ```

  `param` 用 Foxy 完整写法，例如 `param /driver_node:xlinear_limit`。

## 机型参数（实测优先）

- ROS 2 Foxy，rosbridge :9090，web_video_server :8080
- 底盘 `/driver_node`，`car_type=X3`，四轮麦克纳姆，x/y ≤ 1.0 m/s，ω ≤ 5.0 rad/s
- 激光雷达 RPLIDAR A1（`sllidar_node`）· 360° · 0.15–12 m · ~8 Hz · 1080 点 · frame `laser`
- 相机 Orbbec Astra · 彩色/深度/红外 640×480 @ 30 fps · 深度 fx/fy≈580.57，cx≈322.81，cy≈243.06
- IMU 九轴 `data_raw + mag` ~10 Hz；固件 `/edition` 3.5
- 电池 11.1 V / 5000 mAh 3S 锂电；实时电压约 10.6–11.0 V

## 范围

- 已做：相机三路、雷达实时扫描、深度点云、电池/IMU/速度、真实连接终端、麦克纳姆控制、
  蜂鸣器/RGB、断流自动重连、真实截图。
- 未做：SLAM/栅格建图、odom/定位（机器人不提供）、视频录制（按钮仍是模拟）、WebRTC、
  相机曝光/增益服务、`/camera/depth/points` 直接渲染。
- 磁航向未做硬铁/软铁校准，绝对角度可能偏离地理北；俯仰/横滚未做零偏校准。
