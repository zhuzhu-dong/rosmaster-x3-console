#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""X3 底盘 · /cmd_vel 看门狗

浏览器按住方向键时会以 10 Hz 连续发 /cmd_vel；松手、切页、断网或浏览器崩溃后，
如果底盘驱动没有自己的超时保护，车会保持最后一个速度。本节点订阅 /cmd_vel，
超过 timeout_s 没有收到非零命令就补发一次全零 Twist，把车停下。

在机器人的 ROS 2 容器里运行（与 rosbridge / 底盘驱动同一 ROS_DOMAIN_ID）：
    docker cp tools/cmd_vel_watchdog.py yahboom_ros2:/root/cmd_vel_watchdog.py
    docker exec -it yahboom_ros2 /bin/bash
    python3 /root/cmd_vel_watchdog.py

参数：
    --ros-args -p timeout_s:=0.5 -p topic:=/cmd_vel

说明：这是软件兜底，不能替代现场断电；首次实车运动请把车垫起、低速验证。
"""

import time

import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist


class CmdVelWatchdog(Node):
    def __init__(self) -> None:
        super().__init__('cmd_vel_watchdog')
        self.declare_parameter('timeout_s', 0.5)
        self.declare_parameter('topic', '/cmd_vel')
        self.timeout = max(0.2, float(self.get_parameter('timeout_s').value))
        self.topic = str(self.get_parameter('topic').value)

        self.publisher = self.create_publisher(Twist, self.topic, 10)
        self.subscription = self.create_subscription(Twist, self.topic, self.on_cmd_vel, 10)
        self.last_active = time.monotonic()
        self.tripped = True  # 启动后先不补零，等真正收到非零命令再武装
        self.timer = self.create_timer(0.1, self.check)

        self.get_logger().info(
            f'cmd_vel watchdog: {self.topic} · timeout {self.timeout:.2f} s · '
            'no nonzero command -> publish zero once'
        )

    @staticmethod
    def is_nonzero(msg: Twist) -> bool:
        return (
            abs(msg.linear.x) + abs(msg.linear.y) + abs(msg.linear.z)
            + abs(msg.angular.x) + abs(msg.angular.y) + abs(msg.angular.z)
        ) > 1e-6

    def on_cmd_vel(self, msg: Twist) -> None:
        if not self.is_nonzero(msg):
            return
        self.last_active = time.monotonic()
        self.tripped = False

    def check(self) -> None:
        if self.tripped:
            return
        if time.monotonic() - self.last_active <= self.timeout:
            return
        self.publisher.publish(Twist())
        self.tripped = True
        self.get_logger().warn(
            f'no nonzero {self.topic} for {self.timeout:.2f} s; published zero Twist'
        )


def main() -> None:
    rclpy.init()
    node = CmdVelWatchdog()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
