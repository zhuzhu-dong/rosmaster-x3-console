#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""X3 控制台 · 深度画面伪彩转发节点

web_video_server 在编码前会把订阅到的图像统一转成 bgr8。深度话题是
16UC1，cv_bridge 转 bgr8 会失败，所以
    /stream?topic=/camera/depth/image_raw
只会发出 multipart 头就断开。本节点订阅深度图，压成 8 位伪彩 bgr8 后
发布到 /camera/depth/colorized，控制台的「深度」来源读的就是这个话题。

在机器人的 ROS 2 容器里运行：
    source /opt/ros/foxy/setup.bash      # 容器 shell 已经 source 过可跳过
    python3 depth_colorize.py

可选参数：
    --ros-args -p near_m:=0.3 -p far_m:=5.0 -p max_fps:=8.0
    -p input_topic:=/camera/depth/image_raw
    -p output_topic:=/camera/depth/colorized

近处暖色（红 / 黄），远处冷色（蓝），无效像素为黑。
"""

import time

import numpy as np
import rclpy
from rclpy.node import Node
from rclpy.qos import qos_profile_sensor_data
from sensor_msgs.msg import Image

try:
    import cv2
except ImportError:  # ROS 镜像里一般都有 OpenCV，缺了也能出灰度图
    cv2 = None


class DepthColorizer(Node):
    def __init__(self) -> None:
        super().__init__('x3_depth_colorizer')

        self.declare_parameter('input_topic', '/camera/depth/image_raw')
        self.declare_parameter('output_topic', '/camera/depth/colorized')
        self.declare_parameter('near_m', 0.6)
        self.declare_parameter('far_m', 8.0)
        self.declare_parameter('max_fps', 10.0)

        input_topic = self.get_parameter('input_topic').value
        output_topic = self.get_parameter('output_topic').value

        self._near = float(self.get_parameter('near_m').value)
        self._far = float(self.get_parameter('far_m').value)
        fps = max(0.5, float(self.get_parameter('max_fps').value))
        self._min_period = 1.0 / fps
        self._last = 0.0
        self._warned = set()

        # 相机端通常是 BEST_EFFORT，订阅用 sensor_data；发布保持默认
        # RELIABLE，web_video_server 的默认 QoS 和 sensor_data 都能接上。
        self._publisher = self.create_publisher(Image, output_topic, 10)
        self._subscription = self.create_subscription(
            Image, input_topic, self._on_image, qos_profile_sensor_data
        )

        self.get_logger().info(
            f'depth colorizer: {input_topic} -> {output_topic} '
            f'({self._near:.2f}-{self._far:.2f} m, <= {fps:.0f} fps)'
        )
        if cv2 is None:
            self.get_logger().warn('OpenCV not found; publishing grayscale instead')

    def _warn_once(self, key: str, message: str) -> None:
        if key not in self._warned:
            self._warned.add(key)
            self.get_logger().warn(message)

    def _depth_meters(self, msg: Image):
        """返回 (米制深度, 有效掩膜)；无法解析时返回 (None, None)。"""
        h, w = msg.height, msg.width
        enc = msg.encoding
        try:
            if enc in ('16UC1', 'mono16'):
                row = max(w, msg.step // 2)
                depth = np.frombuffer(msg.data, dtype=np.uint16).reshape(h, row)[:, :w]
                return depth.astype(np.float32) / 1000.0, depth > 0
            if enc in ('32FC1', '64FC1'):
                dtype = np.float32 if enc == '32FC1' else np.float64
                row = max(w, msg.step // np.dtype(dtype).itemsize)
                depth = np.frombuffer(msg.data, dtype=dtype).reshape(h, row)[:, :w]
                depth = depth.astype(np.float32)
                return depth, np.isfinite(depth) & (depth > 0)
        except (ValueError, TypeError) as exc:
            self._warn_once(f'decode:{enc}', f'cannot decode {enc}: {exc}')
            return None, None
        self._warn_once(
            f'encoding:{enc}',
            f'unsupported depth encoding {enc}; expected 16UC1 or 32FC1',
        )
        return None, None

    def _colorise(self, gray: np.ndarray) -> np.ndarray:
        if cv2 is not None:
            code = getattr(cv2, 'COLORMAP_TURBO', None) or cv2.COLORMAP_JET
            return cv2.applyColorMap(gray, code)
        return np.dstack((gray, gray, gray))

    def _on_image(self, msg: Image) -> None:
        now = time.monotonic()
        if now - self._last < self._min_period:
            return
        self._last = now

        depth, valid = self._depth_meters(msg)
        if depth is None:
            return

        span = max(self._far - self._near, 1e-3)
        norm = np.clip((depth - self._near) / span, 0.0, 1.0)
        # 近 -> 255（暖色），远 -> 0（冷色）
        gray = ((1.0 - norm) * 255.0).astype(np.uint8)
        gray[~valid] = 0
        color = self._colorise(gray)
        color[~valid] = 0

        out = Image()
        out.header = msg.header
        out.height = color.shape[0]
        out.width = color.shape[1]
        out.encoding = 'bgr8'
        out.is_bigendian = 0
        out.step = out.width * 3
        out.data = color.tobytes()
        self._publisher.publish(out)


def main() -> None:
    rclpy.init()
    node = DepthColorizer()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
