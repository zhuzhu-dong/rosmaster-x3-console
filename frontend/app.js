(() => {
  'use strict';

  const svg = (inner) =>
    `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;

  const ICONS = {
    control: svg('<rect x="3" y="4" width="18" height="16" rx="3.6"/><rect x="7" y="8" width="10" height="2.4" rx="1.2"/><rect x="7" y="12.4" width="6" height="2.4" rx="1.2"/><circle cx="16.6" cy="13.6" r="1.5"/>'),
    map: svg('<path d="M9 4.2 3 6.6v13.2l6-2.4 6 2.4 6-2.4V4.2l-6 2.4z"/><path d="M9 4.2v13.2M15 6.6v13.2"/>'),
    rescue: svg('<path fill-rule="evenodd" d="M12 2.6 20.4 6.6v5.8c0 4.2-3.4 7.9-8.4 9.1-5-1.2-8.4-4.9-8.4-9.1V6.6zM12 7.9a1.5 1.5 0 0 0-1.5 1.5v1.2H9.3a1.5 1.5 0 0 0 0 3h1.2v1.2a1.5 1.5 0 0 0 3 0v-1.2h1.2a1.5 1.5 0 0 0 0-3h-1.2v-1.2A1.5 1.5 0 0 0 12 7.9z"/>'),
    log: svg('<path fill-rule="evenodd" d="M6.2 2.8h11.6v18.4H6.2zM12.6 2.8h5.2v6.6h-5.2z"/>'),
    machine: svg('<rect x="6.2" y="6.2" width="11.6" height="11.6" rx="3.2"/><rect x="9.6" y="9.6" width="4.8" height="4.8" rx="1.4"/><rect x="4.6" y="8.8" width="3.4" height="2.2" rx="1.1"/><rect x="16" y="8.8" width="3.4" height="2.2" rx="1.1"/><rect x="8.8" y="4.6" width="2.2" height="3.4" rx="1.1"/><rect x="13" y="4.6" width="2.2" height="3.4" rx="1.1"/><rect x="4.6" y="13" width="3.4" height="2.2" rx="1.1"/><rect x="16" y="13" width="3.4" height="2.2" rx="1.1"/><rect x="8.8" y="16" width="2.2" height="3.4" rx="1.1"/><rect x="13" y="16" width="2.2" height="3.4" rx="1.1"/>'),
    debug: svg('<path d="M5 8h9M18 8h1.5"/><circle cx="16" cy="8" r="2.2"/><path d="M5 16h1.8"/><circle cx="9.2" cy="16" r="2.2"/><path d="M11.4 16H19"/>'),
    chip: svg('<rect x="7" y="7" width="10" height="10" rx="2.2"/><path d="M10 3.5v3.5M14 3.5v3.5M10 17v3.5M14 17v3.5M3.5 10H7M3.5 14H7M17 10h3.5M17 14h3.5"/>'),
    layers: svg('<path d="M12 3.5 3.5 8l8.5 4.5L20.5 8z"/><path d="M3.5 12.5 12 17l8.5-4.5"/><path d="M3.5 16.5 12 21l8.5-4.5"/>'),
    gauge: svg('<path d="M4.5 17a8.5 8.5 0 1 1 15 0"/><path d="M12 17l4-5"/>'),
    compass: svg('<circle cx="12" cy="12" r="8.6"/><path d="M15.6 8.4l-2.2 5-5 2.2 2.2-5z"/>'),
    route: svg('<path d="M8.2 16.6C11.5 15.5 9.5 11 12.5 9.6c1.8-.8 3.2-.6 3.9-.3L17 12.2l-3.4.1c-1.4 2.6.7 5.2-2.2 6.5z"/><circle cx="6.2" cy="18" r="2.6"/><circle cx="18" cy="6.2" r="2.6"/>'),
    term: svg('<path d="M4 6.5h16v11H4z"/><path d="M7.5 10.5l2.5 2-2.5 2M12.5 14.5h4"/>'),
    battery: svg('<rect x="2.6" y="7" width="16.4" height="10" rx="2.6"/><rect x="20.4" y="10" width="1.8" height="4" rx=".9"/><rect x="5.4" y="9.4" width="5.2" height="5.2" rx="1.2"/><rect x="11.8" y="9.4" width="4.8" height="5.2" rx="1.2"/>'),
    smoke: svg('<path d="M6.5 18.5h11a3.5 3.5 0 0 0 .4-6.98A5.2 5.2 0 0 0 8.2 10.4 3.9 3.9 0 0 0 6.5 18.5z"/><path d="M11 15.5h6"/>'),
    image: svg('<rect x="3.5" y="5" width="17" height="14" rx="3"/><circle cx="9" cy="10" r="1.6"/><path d="M4.5 17l4.6-4.2 3.4 3 3-2.6 3.5 3.2"/>'),
    slam: svg('<path d="M4 19V5h14"/><path d="M7.5 16h4v-4h4V8h3.5"/><circle cx="11.5" cy="16" r="1.4"/><circle cx="7.5" cy="16" r="1.4"/>'),
    gear: svg('<circle cx="12" cy="12" r="3.2"/><path d="M12 3.5v2.2M12 18.3v2.2M4.9 7.6l1.9 1.1M17.2 15.3l1.9 1.1M4.9 16.4l1.9-1.1M17.2 8.7l1.9-1.1"/>'),
    plug: svg('<rect x="8.6" y="2.8" width="2.4" height="4.6" rx="1.2"/><rect x="13" y="2.8" width="2.4" height="4.6" rx="1.2"/><path d="M6.4 7.4h11.2v3.4a5.6 5.6 0 0 1-11.2 0z"/><rect x="10.8" y="16.6" width="2.4" height="4.6" rx="1.2"/>'),
    wifi: svg('<path d="M4 9.5a11 11 0 0 1 16 0"/><path d="M6.8 12.6a7 7 0 0 1 10.4 0"/><path d="M9.6 15.6a3.2 3.2 0 0 1 4.8 0"/><circle cx="12" cy="18.8" r=".6"/>'),
    link: svg('<path d="M10.6 13.4a3.7 3.7 0 0 0 5.2 0l2.7-2.7a3.7 3.7 0 0 0-5.2-5.2l-1.5 1.5"/><path d="M13.4 10.6a3.7 3.7 0 0 0-5.2 0l-2.7 2.7a3.7 3.7 0 0 0 5.2 5.2l1.5-1.5"/>'),
    play: svg('<path d="M8 5.5l11 6.5-11 6.5z"/>'),
    refresh: svg('<path d="M20 12a8 8 0 1 1-2.4-5.7"/><path d="M20 4.5V10h-5.4"/>'),
    shield: svg('<path d="M12 3.5 19 6.5v5.2c0 3.7-3 6.9-7 7.8-4-.9-7-4.1-7-7.8V6.5z"/><path d="M9 12l2.2 2.2L15.5 10"/>'),
    chevron: svg('<path d="M9 6l6 6-6 6"/>'),
    arrowUp: svg('<path d="M12 19V5"/><path d="M5.5 11.5 12 5l6.5 6.5"/>'),
    /* 控制中心工具条与任务按钮：全部是无声图的简约图标。 */
    camera: svg('<rect x="3.4" y="6.6" width="17.2" height="13" rx="3.2"/><path d="M8.6 6.6l1.5-2.6h3.8l1.5 2.6"/><circle cx="12" cy="13.2" r="3.3"/>'),
    record: svg('<circle cx="12" cy="12" r="6.6"/><circle cx="12" cy="12" r="2.7" fill="currentColor" stroke="none"/>'),
    square: svg('<rect x="7" y="7" width="10" height="10" rx="2.4" fill="currentColor" stroke="none"/>'),
    save: svg('<path d="M12 3.8v10.4"/><path d="M7.6 10.3 12 14.7l4.4-4.4"/><path d="M5.4 19.4h13.2"/>'),
    estop: svg('<path d="M8.7 3.6h6.6l4.1 4.1v6.6l-4.1 4.1H8.7L4.6 14.3V7.7z"/><path d="M12 8.3v4.5M12 15.4v.2"/>'),
    turnL: svg('<path d="M4.5 9.5A7.5 7.5 0 1 1 12 19.5"/><path d="M4.5 4.5v5h5"/>'),
    turnR: svg('<path d="M19.5 9.5A7.5 7.5 0 1 0 12 19.5"/><path d="M19.5 4.5v5h-5"/>')
  };

  const NAV = [
    { id: 'control', label: '控制中心', icon: 'control', summary: '整机状态总览、任务下发与运行监控。' },
    { id: 'map', label: '雷达扫描', icon: 'map', summary: '激光雷达实时扫描、障碍距离与扫描状态。' },
    { id: 'rescue', label: '救援功能', icon: 'rescue', summary: '烟雾识别、退化图像处理与现场测绘等救援算法的调试入口。' },
    { id: 'log', label: '救援日志', icon: 'log', summary: '救援过程记录、测试结论与版本变更。' },
    { id: 'connect', label: '连接与通信', icon: 'link', summary: '选择机器、查看链路与延迟，并在终端里与机器通信。' },
    { id: 'machine', label: '机器信息', icon: 'chip', summary: 'ROSMASTER X3 的硬件能力、当前状态与配件情况。' }
  ];

  /* 侧栏分两组：「救援作业」是出动时要用的页面，
     「机器与链路」是看车本身与链路状态的页面。 */
  const NAV_GROUPS = [
    { label: '救援作业', items: ['control', 'map', 'rescue', 'log'] },
    { label: '机器与链路', items: ['connect', 'machine'] }
  ];

  /* 救援功能的三个算法。调试页暂时只标注「算法调试界面」：
     参数、指标、日志与预览都不布置，退化图像处理只保留五个调试项。 */
  const FEATURES = [
    {
      id: 'smoke',
      name: '烟雾识别',
      icon: 'smoke',
      desc: '在彩色相机画面上检测烟雾区域，用于判断火点方向与能否继续深入。'
    },
    {
      id: 'degrade',
      name: '退化图像处理',
      icon: 'image',
      desc: '面向浓烟与低照度画面做去雾与增强。地下车库、地下室的现场画面往往只有几十级灰阶，需要先增强再送识别。',
      clips: ['默认', '去云', '去雨', '去高斯模糊', '去动态模糊']
    },
    {
      id: 'mapping',
      name: '雷达扫描',
      icon: 'slam',
      desc: '用激光雷达做实时扫描，显示障碍距离与环境轮廓；当前版本不建图、不定位，也没有里程计。'
    }
  ];

  const FEATURE_BY_ID = Object.fromEntries(FEATURES.map((f) => [f.id, f]));

  /* 机型参数。带「实测」的分组直接来自 2026-10-10 采集回放；
     其余为 ROSMASTER X3 厂家公开规格，两类不混用。 */
  const SPECS = [
    { group: '计算平台', key: 'controller', label: '主控制器', value: 'NVIDIA Jetson Orin Nano 8GB' },
    { group: '计算平台', key: 'soc', label: '处理器', value: '6 核 Arm Cortex-A78AE v8.2' },
    { group: '计算平台', key: 'ai', label: 'AI 算力', value: '40 TOPS (INT8)' },
    { group: '计算平台', key: 'ram', label: '运行内存', value: '8 GB LPDDR5' },
    { group: '计算平台', key: 'disk', label: '存储', value: '128 GB NVMe SSD' },
    { group: '计算平台', key: 'bridge', label: '通信桥接', value: 'rosbridge :9090 · 遥测 10 Hz' },
    { group: '软件环境', key: 'ros', label: 'ROS 版本', value: 'ROS 2 Foxy（rosbridge 实测）' },
    { group: '软件环境', key: 'system', label: '操作系统', value: '宿主 JetPack · ROS 2 Foxy 容器' },
    { group: '软件环境', key: 'driver', label: '底盘驱动', value: 'driver_node · car_type X3' },
    { group: '感知系统', key: 'rgb', label: 'RGB 彩色相机', value: 'Orbbec Astra · 640×480 @ 30 fps' },
    { group: '感知系统', key: 'ir', label: '红外相机', value: '640×480 @ 30 fps · 无光环境可用' },
    { group: '感知系统', key: 'depth', label: '深度相机', value: 'Orbbec Astra · 640×480 @ 30 fps · 0.6–8 m' },
    { group: '感知系统', key: 'lidar', label: '激光雷达', value: 'RPLIDAR A1（sllidar）· 360° · 0.15–12 m · 8 Hz · 1080 点' },
    { group: '感知系统', key: 'imu', label: '姿态传感器', value: '九轴（data_raw + mag）· 10 Hz' },
    { group: '机身结构', key: 'chassis', label: '底盘形式', value: '四轮麦克纳姆 · 全向移动' },
    { group: '机身结构', key: 'wheel', label: '轮径', value: '80 mm 橡胶轮' },
    { group: '机身结构', key: 'payload', label: '最大负载', value: '约 5 kg' },
    { group: '机身结构', key: 'size', label: '外形尺寸', value: '约 320 × 290 × 210 mm' },
    { group: '动力与通信', key: 'battery', label: '电池', value: '11.1 V / 5000 mAh 3S 锂电' },
    { group: '动力与通信', key: 'runtime', label: '续航', value: '约 3 小时（满电 · 静止）' },
    { group: '动力与通信', key: 'network', label: '桥接地址', value: 'rosbridge WebSocket :9090' },
    { group: '动力与通信', key: 'link', label: '通信链路', value: 'Wi-Fi · rosbridge 9090 + web_video_server 8080' }
  ];

  /* ---------------------------------------------------------------------------
     现场画面 · web_video_server
     机器人端的 web_video_server 把 ROS 图像话题编码成 MJPEG，服务在 8080。
     彩色 / 红外话题可以直接转码；深度话题是 16UC1，web_video_server 编码前
     固定转 bgr8，直接订阅会断流，所以深度读的是 tools/depth_colorize.py
     发布的伪彩话题。换地址可以在 URL 上带 ?cam=http://<机器人>:8080。
     --------------------------------------------------------------------------- */
  const CAM_BASE = (() => {
    try {
      const q = new URLSearchParams(location.search).get('cam');
      if (q) return q.replace(/\/+$/, '');
    } catch (err) {
      void err;
    }
    return 'http://192.168.1.107:8080';
  })();

  const CAM_SOURCES = {
    color: { label: '彩色', name: '彩色相机', topic: '/camera/color/image_raw', hint: '彩色相机' },
    depth: { label: '深度', name: '深度伪彩', topic: '/camera/depth/colorized', hint: '深度伪彩 · 近红远蓝' },
    ir: { label: '红外', name: '红外相机', topic: '/camera/ir/image_raw', hint: '红外相机' }
  };

  /* 画面质量：640×480 下 q80 约 35 KB/帧，局域网带宽足够 */
  const CAM_QUALITY = 80;
  /* 超过这个时间没有新帧就认为流卡住了，主动重连 */
  const CAM_STALL_MS = 4500;

  /* ---------------------------------------------------------------------------
     rosbridge · 实时遥测与底盘
     机器人端 rosbridge 在 9090，ROS 2 Foxy。数据用原生 WebSocket 读，
     不引 roslibjs；重连、重订阅、重 advertise 都在这里处理。
     换地址可以在 URL 上带 ?bridge=ws://<机器人>:9090。
     --------------------------------------------------------------------------- */
  const ROSBRIDGE_URL = (() => {
    try {
      const q = new URLSearchParams(location.search).get('bridge');
      if (q) return q.replace(/\/+$/, '');
    } catch (err) {
      void err;
    }
    try {
      return `ws://${new URL(CAM_BASE).hostname}:9090`;
    } catch (err) {
      void err;
      return 'ws://192.168.1.107:9090';
    }
  })();

  const ROS_TYPES = {
    scan: 'sensor_msgs/msg/LaserScan',
    imu: 'sensor_msgs/msg/Imu',
    mag: 'sensor_msgs/msg/MagneticField',
    vel: 'geometry_msgs/msg/Twist',
    voltage: 'std_msgs/msg/Float32',
    edition: 'std_msgs/msg/Float32',
    clients: 'rosbridge_msgs/msg/ConnectedClients',
    depth: 'sensor_msgs/msg/Image',
    camInfo: 'sensor_msgs/msg/CameraInfo',
    cmdVel: 'geometry_msgs/msg/Twist',
    buzzer: 'std_msgs/msg/Bool',
    rgb: 'std_msgs/msg/Int32'
  };

  /* 常驻订阅：话题、类型、节流 ms */
  const ROS_SUBS = [
    ['/scan', ROS_TYPES.scan, 0],
    ['/imu/data_raw', ROS_TYPES.imu, 0],
    ['/imu/mag', ROS_TYPES.mag, 0],
    ['/vel_raw', ROS_TYPES.vel, 0],
    ['/voltage', ROS_TYPES.voltage, 0],
    ['/edition', ROS_TYPES.edition, 0],
    ['/connected_clients', ROS_TYPES.clients, 1000],
    ['/camera/depth/camera_info', ROS_TYPES.camInfo, 5000]
  ];

  const CMD_VEL_TOPIC = '/cmd_vel';
  const DRIVE_PUBLISH_MS = 100;
  const DRIVE_TURN_SPEED = 0.6;
  const SCAN_RANGE_DEFAULT = 6;
  const SCAN_VIEW_RANGES = [4, 6, 8, 12];

  /* 数据新鲜度：超时后界面显示 —，不把旧值当实时值 */
  const FRESH_MS = {
    scan: 2500,
    imu: 1500,
    mag: 1500,
    vel: 1500,
    voltage: 3000,
    edition: 10000,
    clients: 10000
  };

  /* 3S 锂电：12.6 V 满，9.9 V 空；电压按 10 Hz 低通后估算电量 */
  const VOLTAGE_CURVE = [
    [12.6, 100],
    [12.3, 90],
    [12.0, 80],
    [11.7, 65],
    [11.4, 50],
    [11.1, 35],
    [10.8, 20],
    [10.4, 8],
    [9.9, 0]
  ];

  /* 运行态：相机与 rosbridge 的数据都写在这里，DOM 由 syncLive 统一刷。 */
  const state = {
    route: 'control',
    feature: '',
    /* 退化图像处理的当前调试项，按功能 id 记录，切页回来仍保持选择。 */
    clip: {},
    device: 'x3',
    /* rosbridge 链路：offline / connecting / connected / reconnecting */
    link: 'offline',
    latency: 0,
    rosDistro: '',
    rosTopics: [],
    rosTopicTypes: [],
    rosNodes: [],
    /* 信息通信记录：换页再回来仍保留，上限 TERM_MAX 行。 */
    term: [],
    streamTimer: 0,
    smoke: false,
    degrade: false,
    speed: 0.3,
    turnSpeed: DRIVE_TURN_SPEED,
    dir: 'stop',
    cmd: { x: 0, y: 0, w: 0 },
    cmdTimer: 0,
    logId: '',
    uiTimer: 0,
    /* 控制中心：实时画面 / 雷达两种查看模式 */
    view: 'live',
    /* 现场画面来源：color / depth / ir */
    camSrc: 'color',
    /* 地图页：lidar / points */
    mapView: 'lidar',
    lidarRange: SCAN_RANGE_DEFAULT,
    /* 录屏起始时间戳（0 = 未录屏）与本次会话截图张数 */
    rec: 0,
    shots: 0,
    /* 发布任务：输入框里的名字 + 当前任务 */
    taskName: '',
    task: null,
    /* —— rosbridge 实时数据 —— */
    voltage: null,
    voltageAt: 0,
    battery: null,
    edition: null,
    editionAt: 0,
    clients: null,
    clientsAt: 0,
    scanAt: 0,
    imuAt: 0,
    magAt: 0,
    velAt: 0,
    scan: {
      ranges: [],
      angleMin: 0,
      angleMax: 0,
      angleInc: 0,
      rangeMin: 0,
      rangeMax: 0,
      count: 0,
      valid: 0,
      nearest: null,
      nearestBearing: null,
      frame: '',
      rate: 0,
      version: 0
    },
    pitch: null,
    roll: null,
    yaw: null,
    gz: 0,
    linear: 0,
    lateral: 0,
    angular: 0,
    distance: 0,
    distanceAt: 0,
    rates: {},
    cloud: null,
    camInfo: null,
    rgbEffect: 0
  };

  /* 救援日志：记录每一次救援行动。这是「救援数据」，不是机器人采集数据。 */
  const RESCUE_LOGS = [
    {
      id: 'fire-b2',
      name: '金牛区商住楼地下室搜救',
      note: '浓烟环境，红外相机发现 2 名被困人员',
      date: '2026-09-18',
      time: '14:20 - 15:05',
      status: '已完成',
      location: '金牛区 · 商住楼地下二层',
      team: '地面救援单元 01',
      weather: '晴 / 地下浓烟',
      metrics: [
        ['搜索面积', '420 m²'],
        ['行动时长', '45 min'],
        ['发现目标', '2 人'],
        ['最远深入', '68 m']
      ],
      timeline: [
        ['14:20', '从地下二层入口进入，开启激光雷达建图', 'ok'],
        ['14:28', '能见度不足 1 m，RGB 画面失效，切换红外相机', 'warn'],
        ['14:36', '红外画面发现 2 名被困人员，位置回传指挥车', 'ok'],
        ['14:48', '完成地下二层建图，标出 3 处坍塌阻塞点', 'ok'],
        ['14:57', '人员由救援组接力转移，机器人原地照明待命', 'ok'],
        ['15:05', '撤出地下室，整机清灰并检查云台', 'ok']
      ],
      attachments: [
        ['现场画面', 'fire-b2-ir-1436.mp4'],
        ['检测截图', 'fire-b2-detection.png'],
        ['栅格地图', 'fire-b2-map.json'],
        ['轨迹记录', 'fire-b2-track.json']
      ]
    },
    {
      id: 'garage-a3',
      name: '锦江区地下车库排查',
      note: '积水 20 cm，未发现被困人员，出车口台阶受限',
      date: '2026-09-25',
      time: '09:40 - 10:25',
      status: '已完成',
      location: '锦江区 · 商场地下车库 B 区',
      team: '地面救援单元 01',
      weather: '多云 / 车库内积水',
      metrics: [
        ['搜索面积', '约 4 800 m²'],
        ['行动时长', '45 min'],
        ['发现目标', '0 人'],
        ['最远深入', '120 m']
      ],
      timeline: [
        ['09:40', '沿 B 区主通道进入，开始积水区排查', 'ok'],
        ['09:52', '检测到积水 20 cm，未进入电机舱，通行正常', 'warn'],
        ['10:05', '逐一排查 86 个车位，未发现被困人员', 'ok'],
        ['10:16', '出车口台阶高 22 cm，超过越障能力，改由坡道撤出', 'warn'],
        ['10:25', '撤出车库，回传分区排查结论', 'ok']
      ],
      attachments: [
        ['栅格地图', 'garage-a3-map.json'],
        ['轨迹记录', 'garage-a3-track.json']
      ]
    },
    {
      id: 'warehouse-drill',
      name: '仓库火灾烟雾识别演练',
      note: '烟雾识别 3 次命中，高温区误报 2 次待复测',
      date: '2026-10-02',
      time: '20:05 - 20:52',
      status: '待复测',
      location: '训练基地 · 模拟仓库',
      team: '算法组 + 单元 01',
      weather: '室内',
      metrics: [
        ['搜索面积', '1 200 m²'],
        ['行动时长', '47 min'],
        ['发现目标', '0 人'],
        ['最远深入', '55 m']
      ],
      timeline: [
        ['20:05', '搭建烟道场景，标定相机曝光', 'ok'],
        ['20:18', '低浓度烟雾：3 个分区全部命中', 'ok'],
        ['20:31', '高浓度烟雾：命中 2 个分区，边缘区域漏检', 'warn'],
        ['20:44', '货架高温区被误判为烟雾，误报 2 次', 'warn'],
        ['20:52', '记录参数，安排二次复测', 'warn']
      ],
      attachments: [
        ['检测截图', 'warehouse-drill-detection.png'],
        ['参数记录', 'warehouse-drill-params.json']
      ]
    },
    {
      id: 'standby-check',
      name: '泥石流备勤装备检查',
      note: '通道全通，风扇积尘已清理，左后轮胎磨损需更换',
      date: '2026-10-11',
      time: '08:00 - 08:40',
      status: '已完成',
      location: '驻地 · 装备库',
      team: '装备保障组',
      weather: '室内',
      metrics: [
        ['搜索面积', '—（备勤未搜索）'],
        ['行动时长', '40 min'],
        ['发现目标', '0 人'],
        ['最远深入', '0 m']
      ],
      timeline: [
        ['08:00', '开机自检：主控、雷达、三路相机、姿态传感器全部在线', 'ok'],
        ['08:12', '电池充至 100%，循环 46 次，容量衰减 4%', 'ok'],
        ['08:24', '清理云台散热风扇积尘，紧固 4 颗松动螺钉', 'warn'],
        ['08:33', '左后轮胎面磨损已到标记线，登记待更换', 'warn'],
        ['08:40', '整机判定可出动，随车备勤', 'ok']
      ],
      attachments: [
        ['检查单', 'standby-check-list.pdf'],
        ['整机照片', 'standby-check-photo.jpg']
      ]
    },
    {
      id: 'night-search',
      name: '龙泉山夜间搜寻走失人员',
      note: '坡度超限，仅搜索山脚缓坡区，协助排除 1 处疑点',
      date: '2026-10-13',
      time: '21:10 - 22:14',
      status: '已完成',
      location: '龙泉驿区 · 龙泉山北坡',
      team: '地面救援单元 01 + 红外无人机',
      weather: '夜 / 轻雾 / 气温 12℃',
      metrics: [
        ['搜索面积', '约 6 000 m²'],
        ['行动时长', '64 min'],
        ['发现目标', '0 人'],
        ['最远深入', '340 m']
      ],
      timeline: [
        ['21:10', '抵达山脚集结点，与红外无人机分区协同', 'ok'],
        ['21:26', '坡度达到 12°，接近越障上限，改沿等高线搜索', 'warn'],
        ['21:44', '红外画面出现疑似热源，抵近确认为废弃火堆', 'warn'],
        ['22:00', '排除该疑点，未发现走失人员', 'ok'],
        ['22:14', '撤出搜索区，将轨迹交指挥车存档', 'ok']
      ],
      attachments: [
        ['红外截图', 'night-search-ir-2144.png'],
        ['搜索轨迹', 'night-search-track.json'],
        ['现场记录', 'night-search-note.pdf']
      ]
    }
  ];

  const DEVICES = [
    { id: 'x3', name: 'ROSMASTER X3', sub: 'robot_bridge · 本次采集主机', mark: 'control' },
    { id: 'x3b', name: 'ROSMASTER X3-B', sub: '备用单元 · 未接入本次采集', mark: 'rescue' },
    { id: 'x1', name: 'ROSMASTER X1', sub: '训练机 · 未接入本次采集', mark: 'map' }
  ];

  const byId = (id) => document.getElementById(id);
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const navItem = (id) => NAV.find((n) => n.id === id);
  /* 任务名来自输入框，插回 HTML 前必须转义。 */
  const esc = (s) =>
    String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const two = (n) => String(n).padStart(2, '0');
  const clockText = (ts) => {
    const d = new Date(ts);
    return `${two(d.getHours())}:${two(d.getMinutes())}`;
  };
  const dateText = (ts) => {
    const d = new Date(ts);
    return `${d.getFullYear()}-${two(d.getMonth() + 1)}-${two(d.getDate())}`;
  };
  const durText = (ms) => {
    const s = Math.max(0, Math.floor(ms / 1000));
    return `${two(Math.floor(s / 60))}:${two(s % 60)}`;
  };
  /* 电量模型：随开机时长线性下降，仅用于界面演示。 */
  function batteryFromVoltage(v) {
    if (!Number.isFinite(v)) return null;
    if (v >= VOLTAGE_CURVE[0][0]) return 100;
    if (v <= VOLTAGE_CURVE[VOLTAGE_CURVE.length - 1][0]) return 0;
    for (let i = 0; i < VOLTAGE_CURVE.length - 1; i++) {
      const [vHi, pHi] = VOLTAGE_CURVE[i];
      const [vLo, pLo] = VOLTAGE_CURVE[i + 1];
      if (v <= vHi && v >= vLo) return pLo + ((v - vLo) / (vHi - vLo)) * (pHi - pLo);
    }
    return null;
  }
  const isFresh = (at, key) => state.link === 'connected' && at > 0 && Date.now() - at <= FRESH_MS[key];
  const batteryPct = () => (isFresh(state.voltageAt, 'voltage') ? batteryFromVoltage(state.voltage) : null);
  const batteryLevel = () => {
    const p = batteryPct();
    return p == null ? null : Math.round(p);
  };
  const batteryText = () => (batteryLevel() == null ? '—' : batteryLevel() + '%');
  const voltageText = () =>
    isFresh(state.voltageAt, 'voltage') && Number.isFinite(state.voltage) ? state.voltage.toFixed(2) + ' V' : '—';
  const batteryRuntimeText = () => (batteryPct() == null ? '—' : `约 ${((batteryPct() / 100) * 3).toFixed(1)} h`);
  const editionText = () =>
    isFresh(state.editionAt, 'edition') && Number.isFinite(state.edition) ? `v${state.edition.toFixed(1)}` : '—';
  const latencyText = () => (state.link === 'connected' && state.latency > 0 ? Math.round(state.latency) + ' ms' : '—');
  const clientsText = () => (isFresh(state.clientsAt, 'clients') && state.clients != null ? String(state.clients) : '—');
  const scanActive = () => isFresh(state.scanAt, 'scan') && state.scan.count > 0;
  const scanSummary = () => {
    if (!scanActive()) return '—';
    const rate = state.scan.rate ? `${state.scan.rate.toFixed(1)} Hz` : '—';
    return `${state.scan.count} 点 · ${rate}`;
  };
  const scanRangeText = () =>
    state.scan.count ? `${state.scan.rangeMin.toFixed(2)}–${state.scan.rangeMax.toFixed(1)} m` : '—';
  const scanResText = () => (state.scan.count ? (state.scan.angleInc * (180 / Math.PI)).toFixed(2) + '°' : '—');
  const scanNearText = () => (scanActive() && state.scan.nearest != null ? state.scan.nearest.toFixed(2) + ' m' : '—');
  const scanBearingText = () => {
    if (!scanActive() || state.scan.nearestBearing == null) return '—';
    const deg = Math.round(state.scan.nearestBearing);
    return `${deg > 0 ? '+' : ''}${deg}°`;
  };
  const yawText = () => (isFresh(state.magAt, 'mag') && state.yaw != null ? state.yaw.toFixed(1) + '°' : '—');
  const pitchText = () => (isFresh(state.imuAt, 'imu') && state.pitch != null ? state.pitch.toFixed(1) + '°' : '—');
  const rollText = () => (isFresh(state.imuAt, 'imu') && state.roll != null ? state.roll.toFixed(1) + '°' : '—');
  const velText = () =>
    isFresh(state.velAt, 'vel')
      ? `${state.linear.toFixed(2)} / ${state.lateral.toFixed(2)} / ${state.angular.toFixed(2)}`
      : '—';
  const healthText = () => {
    if (state.link !== 'connected') return state.link === 'connecting' || state.link === 'reconnecting' ? '连接中' : '未连接';
    const p = batteryLevel();
    if (p != null && p <= 20) return '电量偏低';
    return scanActive() ? '在线 · 雷达正常' : '在线 · 等雷达';
  };

  function toast(message) {
    const el = byId('toast');
    el.textContent = message;
    el.classList.add('is-on');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove('is-on'), 2200);
  }

  /* 功能调试页（#/smoke 等）属于「救援功能」的子页面，
     日志详情页（#/log/<id>）属于「救援日志」的子页面；两者都要让父级保持高亮，
     否则点进调试页后侧栏会没有任何选中项。 */
  function navOwnerId() {
    if (state.route === 'feature') return 'rescue';
    if (state.route === 'logDetail') return 'log';
    return state.route;
  }

  /* 侧栏导航按 NAV_GROUPS 分两组渲染；分组标题在收起状态下被压掉。 */
  function renderNav() {
    const active = navOwnerId();
    byId('left-nav').innerHTML = NAV_GROUPS.map((group) => {
      const rows = group.items
        .map((id) => navItem(id))
        .filter(Boolean)
        .map((item) => {
          const on = item.id === active;
          return `<a class="side-nav__item${on ? ' is-active' : ''}" data-route="${item.id}" data-tip="${item.label}" href="#/${item.id}"${
            on ? ' aria-current="page"' : ''
          }>${ICONS[item.icon]}<span>${item.label}</span></a>`;
        })
        .join('');
      return `<div class="nav-group">
        <span class="nav-group__label">${group.label}</span>
        ${rows}
      </div>`;
    }).join('');
  }

  function renderUnitCard() {
    const card = byId('unit-card');
    /* 侧栏收起时卡片会被移出 DOM（见 applyCollapsed），这里必须判空：
       否则收起后再切换页面，render() 会在这里抛错并中断后面的 syncLive()。 */
    if (!card) return;
    card.classList.toggle('is-current', state.route === 'machine');

    const row = (icon, label, value, key) =>
      `<span class="unit-row">
        <span class="unit-row__icon" aria-hidden="true">${ICONS[icon]}</span>
        <span class="unit-row__label">${label}</span>
        <span class="unit-row__value"${key ? ` data-live="${key}"` : ''}>${value}</span>
      </span>`;

    /* 这五行全部来自 rosbridge 实时数据；没有数据时显示 —，不再放演示值。 */
    byId('unit-card-data').innerHTML = [
      row('battery', '电池电量', batteryText(), 'battery'),
      row('gauge', '电池电压', voltageText(), 'voltage'),
      row('link', '链路', linkLabel(), 'link'),
      row('slam', '雷达', scanActive() ? `${state.scan.count} 点` : '—', 'scanCard'),
      row('chip', '固件', editionText(), 'edition')
    ].join('');
  }

  /* 页头小字：页面序号 + 所属导航分组（子页面取父级）。
     序号直接由 NAV 的顺序推出，所以在导航里加页面不用另抄一份编号。 */
  function pageMeta() {
    const owner = state.route === 'feature' ? 'rescue' : state.route === 'logDetail' ? 'log' : state.route;
    const idx = NAV.findIndex((n) => n.id === owner);
    let label = '';
    if (state.route === 'feature') label = '救援功能';
    else if (state.route === 'logDetail') label = '救援日志';
    else {
      const group = NAV_GROUPS.find((g) => g.items.includes(owner));
      label = group ? group.label : '';
    }
    return { index: idx >= 0 ? two(idx + 1) : '', label };
  }

  /* 页头：一条墨黑竖标 +「序号 / 分类」小字 + 标题，右侧一条渐隐细线接到状态 chip 与小工具。
     三样都很轻，但合起来让每页的开头有个记号，而不是孤零零一个黑字。 */
  function viewHead(title, tools = '') {
    const meta = pageMeta();
    return `<header class="view-head">
      <div class="view-title">
        <span class="view-title__rule" aria-hidden="true"></span>
        <span class="view-title__text">
          <span class="view-title__eyebrow">${
            meta.index ? `<i class="view-title__index">${meta.index}</i>` : ''
          }<span>${meta.label}</span></span>
          <h1>${title}</h1>
        </span>
      </div>
      <span class="view-head__hair" aria-hidden="true"></span>
      <div class="head-tools">${tools}</div>
    </header>`;
  }

  function specTable() {
    const groups = [...new Set(SPECS.map((s) => s.group))];
    return groups
      .map((g) => {
        const rows = SPECS.filter((s) => s.group === g)
          .map((s) => `<tr><td>${s.label}</td><td>${s.value}</td></tr>`)
          .join('');
        return `<div class="section-head"><h3>${g}</h3><span>${SPECS.filter((s) => s.group === g).length} 项</span></div>
          <table class="spec-table"><tbody>${rows}</tbody></table>`;
      })
      .join('');
  }

  function meter(label, valueKey, unit = '%') {
    return `<tr>
      <td>${label}</td>
      <td>
        <div class="meter">
          <div class="meter__track"><div class="meter__fill" data-bar="${valueKey}" style="width:0%"></div></div>
          <span class="meter__value" data-live="${valueKey}">0${unit}</span>
        </div>
      </td>
    </tr>`;
  }

  const iconTool = (id, label, icon, cls = '') =>
    `<button class="tool-btn${cls ? ' ' + cls : ''}" type="button" id="${id}" title="${label}" aria-label="${label}">${ICONS[icon]}</button>`;

  /* 雷达视图：白底 canvas + 空数据提示。scope 只是给 canvas 一个稳定标识。 */
  function mapScreen(scope = 'control') {
    return `<div class="lidar-view" data-radar="${scope}">
      <canvas class="lidar-canvas" data-scan-canvas="${scope}" aria-label="实时激光雷达扫描"></canvas>
      <span class="lidar-empty" data-lidar-empty="${scope}">等待 /scan 数据…</span>
    </div>`;
  }

  /* 画面区叠层：顶部左边切换画面来源，右边显示链路状态；
     右下角是画面工具，左下角标注当前来源、分辨率与帧率。 */
  function videoHud() {
    const map = state.view === 'map';
    if (map) {
      return `<div class="video-hud">
        <span class="video-hud__tag" id="scan-hud-state">● 雷达扫描</span>
        <span class="video-hud__tag" data-live="scanSummary">—</span>
      </div>
      <span class="video-rec" id="video-rec"${state.rec ? '' : ' hidden'}><i></i>REC <b id="rec-time">00:00</b></span>
      <span class="video-foot" id="scan-foot">机器人坐标系 · 非建图</span>
      <div class="video-tools" role="group" aria-label="画面工具">
        ${iconTool('shot-btn', '截图', 'camera')}
        ${iconTool('view-toggle', '切回实时画面', 'map')}
      </div>`;
    }
    const source = CAM_SOURCES[state.camSrc] || CAM_SOURCES.color;
    const tabs = Object.entries(CAM_SOURCES)
      .map(
        ([key, s]) =>
          `<button type="button" class="video-src${key === state.camSrc ? ' is-on' : ''}" data-cam="${key}"
            title="${s.hint}" aria-pressed="${key === state.camSrc}">${s.label}</button>`
      )
      .join('');
    return `<div class="video-hud">
      <div class="video-sources" role="group" aria-label="画面来源">${tabs}</div>
      <span class="video-hud__tag video-status" id="video-status" data-state="connecting" role="status" aria-live="polite">
        <i aria-hidden="true"></i><span id="video-status-text">连接中…</span>
      </span>
    </div>
    <span class="video-rec" id="video-rec"${state.rec ? '' : ' hidden'}><i></i>REC <b id="rec-time">00:00</b></span>
    <span class="video-foot" id="video-foot">${source.name} · 连接中…</span>
    <div class="video-tools" role="group" aria-label="画面工具">
      ${iconTool('shot-btn', '截图', 'camera')}
      ${iconTool('rec-btn', state.rec ? '停止录屏' : '录屏', 'record', state.rec ? 'is-on' : '')}
      ${iconTool('view-toggle', '切换雷达查看', 'map')}
    </div>`;
  }

  /* 操纵：麦克纳姆全向盘 + 左右原地转。按住才动，松开立即发 0。 */
  function drivePanel() {
    const dirs = [
      ['nw', '左前', 'pad-btn--nw'],
      ['n', '前进', 'pad-btn--n'],
      ['ne', '右前', 'pad-btn--ne'],
      ['w', '左移', 'pad-btn--w'],
      ['stop', '停止', 'pad-btn--stop'],
      ['e', '右移', 'pad-btn--e'],
      ['sw', '左后', 'pad-btn--sw'],
      ['s', '后退', 'pad-btn--s'],
      ['se', '右后', 'pad-btn--se']
    ];
    return `<section class="panel panel--drive" aria-label="操纵">
      <div class="panel__head">
        <h4>操纵</h4>
        <div class="segmented" role="group" aria-label="控制模式">
          <button type="button" class="${drive.mode === 'manual' ? 'is-selected' : ''}" data-mode="manual" aria-pressed="${drive.mode === 'manual'}">手动</button>
          <button type="button" class="${drive.mode === 'locked' ? 'is-selected' : ''}" data-mode="locked" aria-pressed="${drive.mode === 'locked'}">锁止</button>
        </div>
      </div>
      <div class="drive-pad-wrap">
        <div class="pad-grid" role="group" aria-label="全向移动">
          ${dirs
            .map(
              ([dir, label, cls]) =>
                `<button type="button" class="pad-btn ${cls}" data-dir="${dir}" title="${label}" aria-label="${label}">${
                  dir === 'stop' ? ICONS.square : ICONS.arrowUp
                }</button>`
            )
            .join('')}
        </div>
        <div class="turn-stack" role="group" aria-label="原地旋转">
          <button type="button" class="turn-btn" data-dir="tl" title="左转" aria-label="左转">${ICONS.turnL}</button>
          <button type="button" class="turn-btn" data-dir="tr" title="右转" aria-label="右转">${ICONS.turnR}</button>
        </div>
      </div>
      <div class="drive-speed">
        <div class="speed-head"><span>平移速度</span><b id="speed-value">${state.speed.toFixed(2)} <small>m/s</small></b></div>
        <input id="speed-limit" type="range" min="0.1" max="0.6" step="0.05" value="${state.speed}" aria-label="平移速度上限">
        <div class="speed-range" aria-hidden="true"><span>0.1</span><span>0.6</span></div>
      </div>
      <div class="drive-foot"><span>实测 vx / vy / ω</span><b data-live="measuredVel">—</b></div>
      <button class="estop-btn" type="button" id="estop" title="急停" aria-label="急停">${ICONS.estop}</button>
      <div class="drive-state" id="drive-state">待命</div>
    </section>`;
  }

  /* 发布任务：一块深色页头条 + 大号计时 + 三个带文字的按钮。
     面板最要紧的两件事是「现在在不在任务里」和「已经过去多久」，所以状态做成页头条上的 chip、
     计时放大成整块最醒目的数字，按钮全部带文字——原来那三个只有图形的浅灰按钮太素了，
     放在白底右栏里几乎看不出这里能操作。 */
  function taskPanel() {
    const t = state.task;
    const running = !!t && !t.ended;
    const status = !t ? '未开始' : running ? '进行中' : t.saved ? '已存档' : '已结束';
    return `<section class="panel panel--task" aria-label="发布任务">
      <div class="task-head">
        <h4>发布任务</h4>
        <span class="task-state${running ? ' is-running' : ''}" id="task-status">${status}</span>
      </div>
      <div class="task-body">
        <label class="task-field">
          <span class="task-field__label">任务名称</span>
          <input class="task-name" id="task-name" type="text" placeholder="例如：地下室搜救复测"
            aria-label="任务名称" value="${esc(t ? t.name : state.taskName)}"${running ? ' disabled' : ''}>
        </label>
        <div class="task-clockrow">
          <b id="task-elapsed">${t ? durText((t.ended || Date.now()) - t.started) : '00:00'}</b>
          <div class="connect-meta task-meta">
            <span>开始</span><b id="task-start-at">${t ? clockText(t.started) : '—'}</b>
            <span>已存截图</span><b id="task-shots">${state.shots} 张</b>
          </div>
        </div>
        <div class="task-actions">
          <button class="task-btn task-btn--start" type="button" id="task-start" title="开始任务"${running ? ' disabled' : ''}>${ICONS.play}<span>开始</span></button>
          <button class="task-btn" type="button" id="task-stop" title="结束任务"${running ? '' : ' disabled'}>${ICONS.square}<span>结束</span></button>
          <button class="task-btn" type="button" id="task-save" title="保存救援日志"${t && !t.saved ? '' : ' disabled'}>${ICONS.save}<span>存档</span></button>
        </div>
      </div>
    </section>`;
  }

  /* 菜单：实时画面模式下开关救援功能；雷达模式放量程切换。 */
  function menuPanel() {
    const map = state.view === 'map';
    return `<section class="panel panel--menu" aria-label="菜单">
      <div class="panel__head"><h4>菜单</h4></div>
      ${
        map
          ? `<div class="menu-field">
        <span class="menu-field__label">雷达量程</span>
        <div class="segmented" role="group" aria-label="雷达量程">
          ${SCAN_VIEW_RANGES.map(
            (r) =>
              `<button type="button" class="${state.lidarRange === r ? 'is-selected' : ''}" data-lidar-range="${r}" aria-pressed="${state.lidarRange === r}">${r} m</button>`
          ).join('')}
        </div>
        <p class="menu-hint">机器人坐标系 · 非建图</p>
      </div>`
          : `<div class="menu-switches">
        <label class="switch">
          <span class="switch__text"><b>烟雾识别</b><small>检测 RGB 画面中的烟雾区域</small></span>
          <input type="checkbox" id="toggle-smoke">
          <span class="switch__track" aria-hidden="true"><span class="switch__knob"></span></span>
        </label>
        <label class="switch">
          <span class="switch__text"><b>退化图像处理</b><small>浓烟与低照度画面增强</small></span>
          <input type="checkbox" id="toggle-degrade">
          <span class="switch__track" aria-hidden="true"><span class="switch__knob"></span></span>
        </label>
      </div>`
      }
    </section>`;
  }

  /* 探索 / 雷达解析：实时画面看行进与姿态，雷达模式看扫描要素。 */
  function explorePanel() {
    const map = state.view === 'map';
    return `<section class="panel panel--explore" aria-label="${map ? '雷达解析' : '探索'}">
      <div class="panel__head"><h4>${map ? '雷达解析' : '探索'}</h4></div>
      ${map ? mapAnnotations() : liveMetrics()}
    </section>`;
  }

  function liveMetrics() {
    return `<div class="metrics metrics--wide">
      <div class="metric"><small>实测前进</small><b data-live="linear">—</b><span>/vel_raw · vx</span></div>
      <div class="metric"><small>磁航向</small><b data-live="yaw">—</b><span>/imu/mag</span></div>
      <div class="metric"><small>车身俯仰</small><b data-live="pitch">—</b><span>/imu/data_raw</span></div>
      <div class="metric"><small>链路往返</small><b data-live="lat">—</b><span>rosbridge RTT</span></div>
    </div>`;
  }

  /* 雷达解析：全部来自 /scan、/imu/mag、/vel_raw、/voltage，不冒充地图。 */
  function mapAnnotations() {
    return `<div class="anno-grid">
      <span>扫描点数</span><b data-live="scanCount">—</b>
      <span>扫描频率</span><b data-live="scanRate">—</b>
      <span>最近障碍</span><b data-live="scanNear">—</b>
      <span>最近方位</span><b data-live="scanBearing">—</b>
      <span>量程</span><b data-live="scanRange">—</b>
      <span>角分辨率</span><b data-live="scanRes">—</b>
      <span>坐标系</span><b data-live="scanFrame">—</b>
      <span>里程（估算）</span><b data-live="distance">—</b>
      <span>磁航向</span><b data-live="yaw">—</b>
      <span>电池</span><b data-live="battery">—</b>
    </div>`;
  }

  /* 控制中心：一屏看板（页头 + 恰好一屏的网格，不滚动）。
     左列实时画面 +（菜单 | 探索），右列（发布任务 | 操纵）。 */
  function pageControl() {
    const map = state.view === 'map';
    return `
      ${viewHead(
        '控制中心',
        `<span class="chip" id="ctrl-link-chip" data-link-state="${state.link}"><span class="dot"></span><span id="ctrl-link-text">${
          map ? '雷达模式' : '实时模式'
        } · ${linkLabel()}</span></span>`
      )}
      <div class="ctrl-grid">
        <div class="ctrl-main">
          <section class="panel panel--live${map ? ' is-map' : ''}" aria-label="${map ? '实时雷达扫描' : '实时画面'}">
            <div class="video-frame${map ? ' is-map' : ''}" id="video-frame">
              ${
                map
                  ? mapScreen('control')
                  : `<canvas class="video-feed" id="video-feed" width="640" height="480" aria-label="现场画面"></canvas>
                     <div class="video-state" id="video-state">
                       <span class="video-state__ring" aria-hidden="true"></span>
                       <b id="video-state-title">正在接入现场画面</b>
                       <small id="video-state-note">${esc(CAM_BASE)}</small>
                     </div>`
              }
              ${videoHud()}
            </div>
          </section>
          <div class="ctrl-row">
            ${menuPanel()}
            ${explorePanel()}
          </div>
        </div>
        <div class="ctrl-side">
          ${taskPanel()}
          ${drivePanel()}
        </div>
      </div>
    `;
  }
  function radarPanel() {
    return `<section class="debug-card scan-card" aria-label="实时激光雷达">
      <div class="scan-head">
        <h4>实时激光雷达</h4>
        <span class="dim">/scan · 机器人坐标系</span>
      </div>
      <div class="scan-stage">${mapScreen('map')}</div>
      <div class="metrics scan-metrics">
        <div class="metric"><small>扫描点数</small><b data-live="scanCount">—</b><span>/scan</span></div>
        <div class="metric"><small>扫描频率</small><b data-live="scanRate">—</b><span>实测</span></div>
        <div class="metric"><small>最近障碍</small><b data-live="scanNear">—</b><span>有效点</span></div>
        <div class="metric"><small>最近方位</small><b data-live="scanBearing">—</b><span>0° 为雷达正前</span></div>
        <div class="metric"><small>量程</small><b data-live="scanRange">—</b><span>range_min–max</span></div>
        <div class="metric"><small>角分辨率</small><b data-live="scanRes">—</b><span>angle_increment</span></div>
        <div class="metric"><small>累计里程</small><b data-live="distance">—</b><span>/vel_raw 估算</span></div>
        <div class="metric"><small>电池</small><b data-live="battery">—</b><span data-live="voltage">—</span></div>
      </div>
      <p class="scan-note">没有 /odom 与 base_link TF，本页只显示当前一帧扫描，不做定位、建图或轨迹。</p>
    </section>`;
  }

  function cloudPanel() {
    return `<section class="debug-card cloud-card" aria-label="深度点云">
      <div class="scan-head">
        <h4>深度点云</h4>
        <span class="dim">/camera/depth/image_raw · 1 Hz</span>
      </div>
      <div class="cloud-stage">
        <canvas class="cloud-canvas" id="cloud-canvas" aria-label="深度点云三维视图"></canvas>
        <span class="cloud-empty" id="cloud-empty">等待深度图…</span>
        <span class="cloud-axis" id="cloud-axis" hidden>拖动旋转 · 滚轮缩放</span>
      </div>
      <div class="metrics scan-metrics">
        <div class="metric"><small>点数</small><b data-live="cloudCount">—</b><span>降采样</span></div>
        <div class="metric"><small>最近深度</small><b data-live="cloudMin">—</b><span>相机坐标系</span></div>
        <div class="metric"><small>最远深度</small><b data-live="cloudMax">—</b><span>相机坐标系</span></div>
        <div class="metric"><small>更新</small><b data-live="cloudRate">—</b><span>节流 1 Hz</span></div>
      </div>
      <p class="scan-note">由深度图 + 相机内参在浏览器重建的单帧点云；近暖远冷，拖拽旋转、滚轮缩放。不是网格重建。</p>
    </section>`;
  }

  function pageMap() {
    const points = state.mapView === 'points';
    const mapChip = `<span class="chip" id="map-link-chip" data-link-state="${state.link}"><span class="dot"></span><span id="map-link-text">${
      state.link === 'connected' ? (scanActive() ? '实时扫描' : '等待雷达') : linkLabel()
    }</span></span>`;
    return `
      ${viewHead('雷达扫描', mapChip)}
      <div class="perception-tabs">
        <div class="segmented segmented--tabs" role="group" aria-label="感知视图">
          <button type="button" class="${points ? '' : 'is-selected'}" data-map-view="lidar" aria-pressed="${!points}">激光雷达</button>
          <button type="button" class="${points ? 'is-selected' : ''}" data-map-view="points" aria-pressed="${points}">深度点云</button>
        </div>
        <div class="segmented" role="group" aria-label="雷达量程"${points ? ' hidden' : ''}>
          ${SCAN_VIEW_RANGES.map(
            (r) =>
              `<button type="button" class="${state.lidarRange === r ? 'is-selected' : ''}" data-lidar-range="${r}" aria-pressed="${state.lidarRange === r}">${r} m</button>`
          ).join('')}
        </div>
        ${
          points
            ? ''
            : `<button class="btn btn--small" type="button" data-shot="radar" title="保存雷达截图">${ICONS.camera}<span>截图</span></button>`
        }
      </div>
      ${points ? cloudPanel() : radarPanel()}
      <div class="section-head"><h3>算法入口</h3><span>1 项</span></div>
      <div class="list">
        <a class="list__row" href="#/mapping">
          ${ICONS.slam}
          <div class="grow"><b>雷达扫描调试</b><span>扫描频率、量程、角度补偿、里程与点云更新</span></div>
          ${ICONS.chevron}
        </a>
      </div>
    `;
  }

  /* 翻转卡：静止面只有功能名称，悬停/聚焦翻到背面看具体功能。 */
  function featureCard(f) {
    return `<a class="rc-card" href="#/${f.id}">
      <span class="rc-face rc-face--name">
        <span class="rc-icon" aria-hidden="true">${ICONS[f.icon]}</span>
        <strong class="rc-name">${f.name}</strong>
      </span>

      <span class="rc-face rc-face--detail">
        <span class="rc-desc">${f.desc}</span>
        <span class="rc-btn">进入调试</span>
      </span>
    </a>`;
  }

  function pageRescue() {
    return `
      ${viewHead('救援功能')}
      <div class="wheel-grid">
        ${FEATURES.map(featureCard).join('')}
      </div>
    `;
  }

  /* 算法调试页：暂时不布置任何调试控件，只保留返回入口与标题，
     标题处标明这是「算法调试界面」。退化图像处理额外给出五个调试项。 */
  function clipBar(f) {
    if (!f.clips) return '';
    const current = state.clip[f.id] || f.clips[0];
    return `<div class="clip-bar" role="group" aria-label="${f.name}调试项">
      ${f.clips
        .map(
          (c) => `<button class="clip-chip${c === current ? ' is-selected' : ''}" type="button"
            data-clip="${c}" aria-pressed="${c === current}">${c}</button>`
        )
        .join('')}
    </div>`;
  }

  function pageFeature(id) {
    const f = FEATURE_BY_ID[id];
    if (!f) return pageRescue();
    return `
      <a class="back-link" href="#/rescue"><span class="chev chev--back">${ICONS.chevron}</span>救援功能</a>
      ${viewHead(f.name, '<span class="chip chip--ghost">算法调试界面</span>')}
      ${clipBar(f)}
    `;
  }

  function rescueLogById(id) {
    return RESCUE_LOGS.find((l) => l.id === id);
  }

  /* 救援日志列表：每条行动是一张独立卡片。
     不用表格行，否则相邻任务只隔 1px 细线，容易被当成一张日志本身。 */
  function pageLog() {
    return `
      ${viewHead('救援日志', `<span class="chip chip--bare">${RESCUE_LOGS.length} 次行动记录</span>`)}
      <ol class="log-list">
        ${RESCUE_LOGS.map((l) => {
          return `<li class="log-item">
            <a class="log-card" href="#/log/${l.id}">
              <span class="log-card__main">
                <span class="log-card__top">
                  <time class="log-card__date" datetime="${l.date}">${l.date}</time>
                  <span class="log-card__time">${l.time}</span>
                </span>
                <strong class="log-card__name">${esc(l.name)}</strong>
                <span class="log-card__note">${esc(l.note)}</span>
              </span>
              <span class="log-card__go">查看详情<i aria-hidden="true">${ICONS.chevron}</i></span>
            </a>
          </li>`;
        }).join('')}
      </ol>
    `;
  }

  function pageLogDetail(id) {
    const log = rescueLogById(id);
    if (!log) return pageLog();
    return `
      <a class="back-link" href="#/log"><span class="chev chev--back">${ICONS.chevron}</span>救援日志</a>
      ${viewHead(esc(log.name), `<span class="chip"><span class="dot"></span>${esc(log.status)}</span><span class="chip chip--bare">${esc(log.date)} · ${esc(log.time)}</span>`)}
      <div class="log-detail">
        <section class="debug-card">
          <h4>现场时间线</h4>
          <ol class="log-timeline">
            ${log.timeline
              .map(
                ([time, text, tone]) => `<li class="log-timeline__item is-${tone}">
                  <time>${esc(time)}</time>
                  <span class="log-timeline__dot" aria-hidden="true"></span>
                  <p>${esc(text)}</p>
                </li>`
              )
              .join('')}
          </ol>
        </section>

        <div class="feature-side">
          <section class="debug-card">
            <h4>关键指标</h4>
            <div class="metrics metrics--wide">
              ${log.metrics.map(([k, v]) => `<div class="metric"><small>${esc(k)}</small><b>${esc(v)}</b></div>`).join('')}
            </div>
          </section>
          <section class="debug-card">
            <h4>附件</h4>
            <div class="list">
              ${log.attachments
                .map(
                  ([name, file]) => `<div class="list__row">${ICONS.layers}
                    <div class="grow"><b>${esc(name)}</b><span>${esc(file)}</span></div>
                    <span class="chip chip--bare">本地</span>
                  </div>`
                )
                .join('')}
            </div>
          </section>
        </div>
      </div>
    `;
  }

  function pageMachine() {
    return `
      ${viewHead(
        '机器信息',
        `<span class="chip" id="machine-health" data-link-state="${state.link}"><span class="dot"></span><span id="machine-health-text">${healthText()}</span></span>`
      )}
      <div class="debug-grid">
        <section class="debug-card">
          <h4>链路与固件</h4>
          <div class="metrics">
            <div class="metric"><small>ROS</small><b data-live="ros">—</b><span>rosbridge</span></div>
            <div class="metric"><small>往返延迟</small><b data-live="lat">—</b><span>/rosapi/get_time</span></div>
            <div class="metric"><small>话题 / 节点</small><b><span data-live="topicCount">—</span> / <span data-live="nodeCount">—</span></b><span>rosapi</span></div>
            <div class="metric"><small>客户端</small><b data-live="clients">—</b><span>/connected_clients</span></div>
            <div class="metric"><small>固件</small><b data-live="edition">—</b><span>/edition</span></div>
            <div class="metric"><small>链路</small><b data-live="link">—</b><span>${esc(rosUrlText())}</span></div>
          </div>
        </section>

        <section class="debug-card">
          <h4>电源</h4>
          <table class="spec-table">
            <tbody>
              ${meter('电池电量', 'battery', '%')}
              <tr><td>电池电压</td><td data-live="voltage">—</td></tr>
              <tr><td>预计续航</td><td data-live="runtime">—</td></tr>
              <tr><td>电池规格</td><td>11.1 V / 5000 mAh 3S 锂电</td></tr>
              <tr><td>充电状态</td><td>未充电 · 放电中</td></tr>
            </tbody>
          </table>
          <p class="scan-note">电量由 /voltage 按 3S 锂电曲线估算，不是库仑计。</p>
        </section>

        <section class="debug-card">
          <h4>姿态与运动</h4>
          <div class="metrics">
            <div class="metric"><small>磁航向</small><b data-live="yaw">—</b><span>/imu/mag</span></div>
            <div class="metric"><small>俯仰</small><b data-live="pitch">—</b><span>/imu/data_raw</span></div>
            <div class="metric"><small>横滚</small><b data-live="roll">—</b><span>/imu/data_raw</span></div>
            <div class="metric"><small>vx</small><b data-live="linear">—</b><span>/vel_raw</span></div>
            <div class="metric"><small>vy</small><b data-live="lateral">—</b><span>/vel_raw</span></div>
            <div class="metric"><small>角速度 ω</small><b data-live="angular">—</b><span>/vel_raw</span></div>
          </div>
        </section>

        <section class="debug-card">
          <h4>激光雷达</h4>
          <div class="metrics">
            <div class="metric"><small>点数</small><b data-live="scanCount">—</b><span>/scan</span></div>
            <div class="metric"><small>频率</small><b data-live="scanRate">—</b><span>实测</span></div>
            <div class="metric"><small>最近障碍</small><b data-live="scanNear">—</b><span>方位 <span data-live="scanBearing">—</span></span></div>
            <div class="metric"><small>量程</small><b data-live="scanRange">—</b><span>0.15–12 m</span></div>
          </div>
        </section>

        <section class="debug-card">
          <h4>车身外设</h4>
          <div class="peripheral-row">
            <button class="btn btn--small" type="button" id="buzzer-btn" data-peripheral="buzzer">鸣笛 0.5 s</button>
            <span class="dim">/Buzzer · Bool</span>
          </div>
          <div class="peripheral-row peripheral-row--wrap">
            <span class="dim">RGB 灯效</span>
            <div class="effect-btns" role="group" aria-label="RGB 灯效">
              ${[0, 1, 2, 3, 4, 5, 6]
                .map(
                  (n) =>
                    `<button type="button" class="effect-btn${state.rgbEffect === n ? ' is-on' : ''}" data-rgb-effect="${n}" data-peripheral="rgb">${n === 0 ? '关' : n}</button>`
                )
                .join('')}
            </div>
          </div>
          <p class="scan-note">灯效编号由底盘驱动定义；蜂鸣器发送后 0.5 s 自动关闭。</p>
        </section>
      </div>

      <div class="section-head"><h3>实时数据源</h3><span>rosbridge</span></div>
      <table class="spec-table">
        <tbody>
          <tr><td>/scan</td><td data-live="scanSummary">—</td></tr>
          <tr><td>/voltage</td><td><span data-live="voltage">—</span> · <span data-live="battery">—</span></td></tr>
          <tr><td>/edition</td><td data-live="edition">—</td></tr>
          <tr><td>/imu/data_raw</td><td data-live="imuRate">—</td></tr>
          <tr><td>/vel_raw</td><td data-live="velRate">—</td></tr>
          <tr><td>/voltage · 频率</td><td data-live="voltageRate">—</td></tr>
          <tr><td>/connected_clients</td><td data-live="clients">—</td></tr>
        </tbody>
      </table>

      <div class="section-head"><h3>完整机身参数</h3><span>${SPECS.length} 项</span></div>
      ${specTable()}
    `;
  }

  /* 连接与通信页：原「机器连接」弹窗的全部内容。
     左栏是通信终端（吃掉剩余高度，指令行钉在卡片底部），右栏是设备与链路。 */
  function pageConnect() {
    return `
      ${viewHead(
        '连接与通信',
        `<span class="chip" id="link-chip" data-link-state="${state.link}"><span class="dot"></span><span id="link-text">${linkLabel()}</span></span>`
      )}
      <div class="connect-grid">
        <section class="debug-card connect-term" aria-label="信息通信">
          <h4>信息通信</h4>
          <div class="term" id="connect-term" aria-live="polite" aria-label="与机器的信息通信"></div>
          <form class="cmd-row" id="connect-form" autocomplete="off">
            <input id="connect-input" type="text" placeholder="指令：status / topics / battery / scan / help" aria-label="信息通信指令">
            <button type="submit">发送</button>
          </form>
        </section>

        <div class="connect-side">
          <section class="debug-card" aria-label="选择机器">
            <h4>机器设备</h4>
            <div class="connect-list" id="connect-list" role="radiogroup" aria-label="选择机器"></div>
          </section>

          <section class="debug-card" aria-label="链路与操作">
            <h4>链路</h4>
            <div class="connect-meta">
              <span>链路</span>
              <b>Wi-Fi · rosbridge WebSocket</b>
              <span>地址</span>
              <b id="meta-address">${rosUrlText()}</b>
              <span>ROS</span>
              <b id="meta-ros">${state.rosDistro || '—'}</b>
              <span>延迟</span>
              <b id="meta-latency">${latencyText()}</b>
              <span>固件</span>
              <b id="meta-edition">${editionText()}</b>
              <span>客户端</span>
              <b id="meta-clients">${clientsText()}</b>
              <span>画面</span>
              <b>web_video_server :8080</b>
            </div>
            <div class="connect-actions">
              <button class="btn" id="connect-refresh" type="button">刷新状态</button>
              <button class="btn btn--solid" id="connect-toggle" type="button">${
                state.link === 'connected'
                  ? '断开连接'
                  : state.link === 'connecting' || state.link === 'reconnecting'
                    ? '停止重连'
                    : '连接机器'
              }</button>
            </div>
          </section>
        </div>
      </div>
    `;
  }

  function render() {
    stopDrive('render');
    stopCloudView();
    const view = byId('view');
    if (state.route === 'control') view.innerHTML = pageControl();
    else if (state.route === 'map') view.innerHTML = pageMap();
    else if (state.route === 'rescue') view.innerHTML = pageRescue();
    else if (state.route === 'log') view.innerHTML = pageLog();
    else if (state.route === 'logDetail') view.innerHTML = pageLogDetail(state.logId);
    else if (state.route === 'machine') view.innerHTML = pageMachine();
    else if (state.route === 'connect') view.innerHTML = pageConnect();
    else if (state.route === 'feature') view.innerHTML = pageFeature(state.feature);
    else view.innerHTML = pageControl();

    renderNav();
    renderUnitCard();
    syncLive();
    /* 连接页有两块动态内容要跟着刷：终端记录与链路数值。
       遥测定时器也只在这一页跑，切走就停。 */
    if (state.route === 'connect') {
      /* 第一次进来先铺一段现场状态：空着的黑框看不出这一页在干什么。 */
      if (!state.term.length) {
        state.term.push(
          { t: 'dim', m: `通信终端就绪 · 当前机器 ${deviceById(state.device).name}` },
          { t: 'out', m: `rosbridge ${ROSBRIDGE_URL} · ${linkLabel()}` },
          { t: 'dim', m: '输入 help 查看可用指令' }
        );
      }
      renderTerm();
      syncConnectView();
      startStream();
    } else {
      stopStream();
    }
    /* 只有控制中心的实时画面模式需要连着视频流，其余页面一律释放连接 */
    if (state.route === 'control' && state.view === 'live') startCamera();
    else stopCamera();
    /* 雷达视图：控制中心 map 模式 + 地图页 lidar 视图 */
    if ((state.route === 'control' && state.view === 'map') || state.route === 'map') drawLidar();
    /* 深度点云只在 map 页的 points 视图打开时订阅 */
    if (state.route === 'map' && state.mapView === 'points') startCloudView();
    syncScanUI();
    rosSyncChrome();
    document.title = `${pageLabel()} · ROSMASTER RESCUE`;
    document.body.classList.remove('nav-open');
    byId('nav-toggle').setAttribute('aria-expanded', 'false');
    byId('scrim').hidden = true;
    window.scrollTo(0, 0);
  }

  function pageLabel() {
    if (state.route === 'feature') {
      const f = FEATURE_BY_ID[state.feature];
      return f ? `救援功能 · ${f.name}` : '救援功能';
    }
    if (state.route === 'logDetail') {
      const l = rescueLogById(state.logId);
      return l ? `救援日志 · ${l.name}` : '救援日志';
    }
    return (navItem(state.route) || { label: '控制中心' }).label;
  }

  /* 电量读数：收起成竖排条时显示在电池 logo 下面。
     电池图形本身是静态 logo（固定为半格电），所以这里只更新数值与告警色，
     不写 .battery-ind__fill 的宽度。 */
  function syncStatus() {
    const level = batteryLevel();
    const ind = byId('battery-ind');
    if (ind) {
      if (level == null) {
        ind.removeAttribute('aria-valuenow');
        ind.setAttribute('aria-valuetext', '等待机器人遥测');
        ind.classList.remove('is-low', 'is-critical');
      } else {
        ind.setAttribute('aria-valuenow', String(level));
        const volts = isFresh(state.voltageAt, 'voltage') ? state.voltage.toFixed(2) + ' V' : '';
        ind.setAttribute(
          'aria-valuetext',
          `${level}%${volts ? '，' + volts : ''}${level <= 15 ? '，电量过低' : level <= 30 ? '，电量偏低' : '，电量正常'}`
        );
        ind.classList.toggle('is-low', level <= 30 && level > 15);
        ind.classList.toggle('is-critical', level <= 15);
      }
      ind.title = level == null ? '等待 /voltage' : `${level}% · ${voltageText()}`;
    }
    const tip = byId('battery-tip');
    const tipText = level == null ? '—' : level + '%';
    if (tip && tip.textContent !== tipText) tip.textContent = tipText;
  }

  function linkLabel() {
    if (state.link === 'connecting') return '连接中';
    if (state.link === 'reconnecting') return '重连中';
    if (state.link === 'offline') return '未连接';
    return '已连接';
  }

  function deviceById(id) {
    return DEVICES.find((d) => d.id === id) || DEVICES[0];
  }

  /* ---------------------------------------------------------------------------
     连接与通信
     内容就是原来的「机器连接」弹窗：设备列表、链路、终端、指令行都在，
     只是从浮层改成侧栏里的一级页面，切页不再打断正在进行的通信。
     --------------------------------------------------------------------------- */

  /* 终端记录留一份在 state.term 里，离开这一页再回来还看得到上下文。 */
  const TERM_MAX = 200;

  function appendTerm(line) {
    const term = byId('connect-term');
    if (!term) return;
    const p = document.createElement('p');
    if (line.t === 'dim') p.className = 't-dim';
    if (line.t === 'key') p.className = 't-key';
    p.textContent = line.m;
    term.appendChild(p);
  }

  function renderTerm() {
    const term = byId('connect-term');
    if (!term) return;
    term.innerHTML = '';
    state.term.forEach(appendTerm);
    term.scrollTop = term.scrollHeight;
  }

  function connectLog(line) {
    state.term.push(line);
    if (state.term.length > TERM_MAX) state.term.splice(0, state.term.length - TERM_MAX);
    appendTerm(line);
    const term = byId('connect-term');
    if (term) term.scrollTop = term.scrollHeight;
  }

  /* 页面上会变的那几块：设备列表、链路数值、按钮文案、页头状态。
     只改这几块，不整页重渲染——否则指令输入框里没发出去的字会被清掉。 */
  function syncConnectView() {
    const list = byId('connect-list');
    if (list) {
      list.innerHTML = DEVICES.map((d) => {
        const on = d.id === state.device;
        const real = d.id === 'x3';
        const st = real ? linkLabel() : '未接入';
        return `<button class="device${on ? ' is-active' : ''}" type="button" data-device="${d.id}" role="radio" aria-checked="${on}"${
          real ? '' : ' aria-disabled="true" disabled'
        }>
          <span class="device__mark" aria-hidden="true">${ICONS[d.mark]}</span>
          <span class="device__text"><b>${d.name}</b><span>${d.sub}</span></span>
          <span class="device__state">${st}</span>
        </button>`;
      }).join('');
    }
    const chip = byId('link-chip');
    if (chip) {
      chip.dataset.linkState = state.link;
      chip.classList.toggle('chip--ghost', state.link !== 'connected');
    }
    const text = byId('link-text');
    if (text) text.textContent = linkLabel();
    const metaAddr = byId('meta-address');
    if (metaAddr) metaAddr.textContent = rosUrlText();
    const metaLat = byId('meta-latency');
    if (metaLat) metaLat.textContent = latencyText();
    const metaEdition = byId('meta-edition');
    if (metaEdition) metaEdition.textContent = editionText();
    const metaClients = byId('meta-clients');
    if (metaClients) metaClients.textContent = clientsText();
    const metaRos = byId('meta-ros');
    if (metaRos) metaRos.textContent = state.rosDistro || '—';
    const toggle = byId('connect-toggle');
    if (toggle) {
      toggle.textContent =
        state.link === 'connected'
          ? '断开连接'
          : state.link === 'connecting' || state.link === 'reconnecting'
            ? '停止重连'
            : '连接机器';
      toggle.disabled = false;
    }
    syncPeripheralAvailability();
    syncStatus();
  }

  /* 连接页每 2.6 s 追加一条真实遥测；离开这一页就停掉。 */
  function startStream() {
    clearInterval(state.streamTimer);
    state.streamTimer = setInterval(() => {
      if (state.route !== 'connect' || state.link !== 'connected') return;
      const scanLine = scanActive()
        ? `/scan ${state.scan.count} 点 · ${state.scan.rate.toFixed(1)} Hz · 最近 ${scanNearText()}`
        : '/scan 等待数据';
      const pick = [
        `[telemetry] ${scanLine}`,
        `[telemetry] battery ${batteryText()} · ${voltageText()} · ${editionText()}`,
        `[telemetry] imu ${rateFor('/imu/data_raw')} · vel ${rateFor('/vel_raw')} · RTT ${latencyText()}`,
        `[telemetry] clients ${clientsText()} · ROS ${state.rosDistro || '—'}`
      ];
      connectLog({ t: 'out', m: pick[Math.floor(Math.random() * pick.length)] });
    }, 2600);
  }

  function stopStream() {
    clearInterval(state.streamTimer);
    state.streamTimer = 0;
  }

  async function connectCommand(raw) {
    const cmd = raw.trim();
    if (!cmd) return;
    connectLog({ t: 'key', m: '$ ' + cmd });
    const parts = cmd.split(/\s+/);
    const base = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ');

    if (base === 'help' || cmd === '帮助') {
      connectLog({
        t: 'out',
        m: '可用：status / topics [过滤] / nodes / services / type <topic> / param <name> / version / time / battery / scan / imu / vel / clients / depth / connect / disconnect / clear'
      });
      connectLog({ t: 'dim', m: 'param 用 Foxy 的完整写法，例如 /driver_node:xlinear_limit' });
      return;
    }
    if (base === 'clear' || cmd === '清空') {
      state.term.length = 0;
      const term = byId('connect-term');
      if (term) term.querySelectorAll('p').forEach((p) => p.remove());
      return;
    }
    if (state.link !== 'connected') {
      connectLog({ t: 'dim', m: 'rosbridge 未连接' });
      return;
    }

    try {
      if (base === 'status' || cmd === '状态') {
        connectLog({ t: 'out', m: `link=${linkLabel()} · ROS ${state.rosDistro || '—'} · RTT ${latencyText()}` });
        connectLog({
          t: 'out',
          m: `battery ${batteryText()} · ${voltageText()} · ${editionText()} · clients ${clientsText()}`
        });
        connectLog({ t: 'out', m: `scan ${scanSummary()} · nearest ${scanNearText()} · vel ${velText()}` });
        connectLog({ t: 'out', m: `topics ${state.rosTopics.length} · nodes ${state.rosNodes.length}` });
      } else if (base === 'topics') {
        if (!state.rosTopics.length) {
          const t = await rosCall('/rosapi/topics');
          state.rosTopics = t.topics || [];
          state.rosTopicTypes = t.types || [];
        }
        const list = state.rosTopics;
        const types = state.rosTopicTypes;
        const filtered = arg ? list.filter((t) => t.includes(arg)) : list;
        connectLog({ t: 'out', m: `topics: ${filtered.length}` });
        filtered.slice(0, 60).forEach((topic) => {
          const i = list.indexOf(topic);
          connectLog({ t: 'out', m: `${topic}  ${types[i] || ''}` });
        });
      } else if (base === 'nodes') {
        const n = await rosCall('/rosapi/nodes');
        state.rosNodes = n.nodes || [];
        connectLog({ t: 'out', m: `nodes: ${state.rosNodes.length}` });
        state.rosNodes.forEach((node) => connectLog({ t: 'out', m: node }));
      } else if (base === 'services') {
        const r = await rosCall('/rosapi/services');
        const services = r.services || [];
        connectLog({ t: 'out', m: `services: ${services.length}（前 20 条）` });
        services.slice(0, 20).forEach((srv) => connectLog({ t: 'out', m: srv }));
      } else if (base === 'type') {
        if (!arg) throw new Error('用法：type /scan');
        const r = await rosCall('/rosapi/topic_type', { topic: arg });
        connectLog({ t: 'out', m: `${arg} → ${r.type || '未知'}` });
      } else if (base === 'param') {
        if (!arg) throw new Error('用法：param /driver_node:xlinear_limit');
        const r = await rosCall('/rosapi/get_param', { name: arg });
        connectLog({ t: 'out', m: `${arg} = ${r.value}` });
      } else if (base === 'version') {
        const r = await rosCall('/rosapi/get_ros_version');
        state.rosDistro = r.distro || state.rosDistro;
        connectLog({ t: 'out', m: `ROS ${r.version} · ${r.distro}` });
      } else if (base === 'time') {
        const t0 = performance.now();
        const r = await rosCall('/rosapi/get_time');
        const ms = Math.round(performance.now() - t0);
        connectLog({
          t: 'out',
          m: `ros time ${r.time?.sec}.${String(r.time?.nanosec || 0).padStart(9, '0')} · RTT ${ms} ms`
        });
      } else if (base === 'battery' || cmd === '电量') {
        connectLog({ t: 'out', m: `battery: ${batteryText()} · ${voltageText()} · ${editionText()}` });
      } else if (base === 'scan' || cmd === '雷达') {
        connectLog({
          t: 'out',
          m: scanActive()
            ? `scan: ${state.scan.count} 点 · ${state.scan.rate.toFixed(1)} Hz · ${scanRangeText()} · 最近 ${scanNearText()} @ ${scanBearingText()} · frame ${state.scan.frame}`
            : 'scan: 暂无数据'
        });
      } else if (base === 'imu') {
        connectLog({
          t: 'out',
          m: `imu: yaw ${yawText()} · pitch ${pitchText()} · roll ${rollText()} · gz ${state.gz.toFixed(3)} rad/s · ${rateFor('/imu/data_raw')}`
        });
      } else if (base === 'vel' || cmd === '速度') {
        connectLog({
          t: 'out',
          m: `vel_raw: vx ${state.linear.toFixed(2)} · vy ${state.lateral.toFixed(2)} · ω ${state.angular.toFixed(2)} · ${rateFor('/vel_raw')}`
        });
      } else if (base === 'clients') {
        connectLog({ t: 'out', m: `clients: ${clientsText()}` });
      } else if (base === 'depth' || cmd === '深度') {
        const c = state.camInfo || { fx: 580.572, fy: 580.572, cx: 322.809, cy: 243.061, width: 640, height: 480 };
        connectLog({
          t: 'out',
          m: `depth: ${c.width}×${c.height} 16UC1 · fx ${c.fx.toFixed(2)} cx ${c.cx.toFixed(2)} cy ${c.cy.toFixed(2)}`
        });
      } else if (base === 'connect') {
        rosConnect();
        connectLog({ t: 'out', m: '正在连接 rosbridge…' });
      } else if (base === 'disconnect') {
        rosDisconnect(true);
        connectLog({ t: 'out', m: '已发送断开。' });
      } else {
        connectLog({ t: 'dim', m: `未知指令：${base}` });
      }
    } catch (err) {
      connectLog({ t: 'dim', m: `✕ ${err.message}` });
    }
    if (state.route === 'connect') syncConnectView();
  }

  /* 连接页交互。页面的 HTML 每次渲染都是新的，所以这里直接绑新节点。 */
  function bindConnect() {
    const toggle = byId('connect-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        if (state.link === 'connected' || state.link === 'connecting' || state.link === 'reconnecting') {
          rosDisconnect(true);
        } else {
          rosConnect();
        }
      });
    }
    const refresh = byId('connect-refresh');
    if (refresh) {
      refresh.addEventListener('click', async () => {
        rosPing();
        await rosFetchRosapi();
        connectLog({
          t: 'out',
          m: `状态已刷新 · RTT ${latencyText()} · ${batteryText()} · ${voltageText()} · 话题 ${state.rosTopics.length}`
        });
        syncConnectView();
      });
    }
    const list = byId('connect-list');
    if (list) {
      list.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-device]');
        if (!btn) return;
        if (btn.dataset.device !== 'x3') {
          connectLog({ t: 'dim', m: '该设备未接入本次链路' });
          return;
        }
        state.device = 'x3';
        connectLog({ t: 'dim', m: '当前已是 ROSMASTER X3' });
        if (state.link === 'offline') rosConnect();
      });
    }
    const form = byId('connect-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = byId('connect-input');
        connectCommand(input.value);
        input.value = '';
      });
    }
  }

  function syncLive() {
    const scan = state.scan;
    const values = {
      link: linkLabel(),
      health: healthText(),
      battery: batteryText(),
      voltage: voltageText(),
      edition: editionText(),
      latency: latencyText(),
      lat: latencyText(),
      clients: clientsText(),
      ros: state.rosDistro ? `ROS 2 ${state.rosDistro}` : '—',
      topicCount: state.rosTopics.length ? String(state.rosTopics.length) : '—',
      nodeCount: state.rosNodes.length ? String(state.rosNodes.length) : '—',
      yaw: yawText(),
      heading: yawText(),
      pitch: pitchText(),
      roll: rollText(),
      linear: isFresh(state.velAt, 'vel') ? state.linear.toFixed(2) + ' m/s' : '—',
      lateral: isFresh(state.velAt, 'vel') ? state.lateral.toFixed(2) + ' m/s' : '—',
      angular: isFresh(state.velAt, 'vel') ? state.angular.toFixed(2) + ' rad/s' : '—',
      vel: velText(),
      measuredVel: velText(),
      scanSummary: scanSummary(),
      scanCount: scanActive() ? String(scan.count) : '—',
      scanPoints: scanActive() ? String(scan.count) : '—',
      scanRate: scanActive() && scan.rate ? scan.rate.toFixed(1) + ' Hz' : '—',
      scanRateTopic: rateFor('/scan'),
      scanNear: scanNearText(),
      scanNearest: scanNearText(),
      scanBearing: scanBearingText(),
      scanRange: scanRangeText(),
      scanFov: scanActive()
        ? `${Math.round((scan.angleMin * 180) / Math.PI)}° ~ ${Math.round((scan.angleMax * 180) / Math.PI)}°`
        : '—',
      scanRes: scanResText(),
      scanFrame: scanActive() ? scan.frame || '—' : '—',
      scanCard: scanActive() ? `${scan.count} 点` : '—',
      distance: state.distance > 0.05 ? `${state.distance.toFixed(1)} m` : '0.0 m',
      cloudCount: state.cloud ? String(state.cloud.count) : '—',
      cloudMin: state.cloud ? `${state.cloud.min.toFixed(2)} m` : '—',
      cloudMax: state.cloud ? `${state.cloud.max.toFixed(2)} m` : '—',
      cloudRate: state.cloud ? '1 Hz' : '—',
      imuRate: rateFor('/imu/data_raw'),
      velRate: rateFor('/vel_raw'),
      voltageRate: rateFor('/voltage'),
      runtime: batteryRuntimeText()
    };
    document.querySelectorAll('[data-live]').forEach((el) => {
      const v = values[el.dataset.live];
      if (v !== undefined && el.textContent !== v) el.textContent = v;
    });
    document.querySelectorAll('[data-bar]').forEach((el) => {
      const key = el.dataset.bar;
      let v = 0;
      if (key === 'battery') v = batteryPct() ?? 0;
      else v = Number(String(values[key] ?? '').replace(/[^\d.]/g, '')) || 0;
      el.style.width = clamp(v, 0, 100) + '%';
    });
    syncStatus();
    rosSyncChrome();
    syncScanUI();
  }

  /* -------------------------------------------------------------------------
     现场画面引擎
     不把 MJPEG 直接丢给 <img>，而是自己读字节流、逐帧解到 canvas：
       - 每一帧到达的时间都知道，断流 / 卡帧 / 服务重启都能自己重连；
       - 截图直接用 canvas 上的这一帧，不会拿到黑图；
       - 换画面来源时能立刻中止上一条连接，不会串台。
     ------------------------------------------------------------------------- */
  const cam = {
    canvas: null,
    ctx: null,
    aborter: null,
    generation: 0,
    retryTimer: 0,
    connectTimer: 0,
    watchdog: 0,
    status: 'idle',
    frames: 0,
    lastFrame: 0,
    fps: 0,
    fpsAt: 0,
    fpsFrames: 0,
    retry: 0
  };

  const camTopic = (key) => (CAM_SOURCES[key] || CAM_SOURCES.color).topic;
  /* web_video_server 不会把 %2F 还原成 /，话题名要原样放在 query 里 */
  const camUrl = (key) =>
    `${CAM_BASE}/stream?topic=${camTopic(key)}&type=mjpeg&quality=${CAM_QUALITY}&_=${Date.now()}`;

  function indexOfBytes(buf, needle, from = 0) {
    const n = needle.length;
    const last = buf.length - n;
    outer: for (let i = from; i <= last; i++) {
      for (let j = 0; j < n; j++) {
        if (buf[i + j] !== needle[j]) continue outer;
      }
      return i;
    }
    return -1;
  }

  function concatBytes(a, b) {
    const out = new Uint8Array(a.length + b.length);
    out.set(a);
    out.set(b, a.length);
    return out;
  }

  /* 从缓冲区取出一段 multipart。web_video_server 每帧都带 Content-Length。 */
  function takePart(buf, delim) {
    const start = indexOfBytes(buf, delim);
    if (start < 0) return null;
    const headerFrom = start + delim.length;
    let headerEnd = -1;
    for (let i = headerFrom; i + 3 < buf.length; i++) {
      if (buf[i] === 13 && buf[i + 1] === 10 && buf[i + 2] === 13 && buf[i + 3] === 10) {
        headerEnd = i;
        break;
      }
    }
    if (headerEnd < 0) return null;
    const header = new TextDecoder('latin1').decode(buf.subarray(headerFrom, headerEnd));
    const len = /content-length:\s*(\d+)/i.exec(header);
    const bodyFrom = headerEnd + 4;
    if (len) {
      const size = Number(len[1]);
      if (buf.length < bodyFrom + size) return null;
      return { body: buf.subarray(bodyFrom, bodyFrom + size), rest: buf.subarray(bodyFrom + size) };
    }
    /* 没有 Content-Length 时退回到找下一个 boundary */
    const next = indexOfBytes(buf, delim, bodyFrom);
    if (next < 0) return null;
    return { body: buf.subarray(bodyFrom, Math.max(bodyFrom, next - 2)), rest: buf.subarray(next) };
  }

  function camFoot() {
    const el = byId('video-foot');
    if (!el || state.view === 'map') return;
    const source = CAM_SOURCES[state.camSrc] || CAM_SOURCES.color;
    const canvas = cam.canvas;
    const res = cam.frames && canvas && canvas.width ? `${canvas.width}×${canvas.height}` : '';
    const fps = cam.status === 'live' && cam.fps ? `${cam.fps} fps` : '';
    const phase = cam.status === 'live' ? '' : cam.status === 'retry' ? '重连中…' : '连接中…';
    el.textContent = [source.name, res, fps, phase].filter(Boolean).join(' · ');
  }

  /* kind: connecting / live / retry */
  function setCamState(kind, text, title, note) {
    const chip = byId('video-status');
    if (chip) {
      chip.dataset.state = kind;
      const label = byId('video-status-text');
      if (label) label.textContent = text;
    }
    const overlay = byId('video-state');
    if (!overlay) return;
    overlay.hidden = kind === 'live';
    overlay.dataset.state = kind;
    const t = byId('video-state-title');
    const n = byId('video-state-note');
    if (t && title) t.textContent = title;
    if (n && note) n.textContent = note;
    camFoot();
  }

  function syncCamTabs() {
    document.querySelectorAll('[data-cam]').forEach((btn) => {
      const on = btn.dataset.cam === state.camSrc;
      btn.classList.toggle('is-on', on);
      btn.setAttribute('aria-pressed', String(on));
    });
  }

  function abortCamStream() {
    cam.generation += 1;
    if (cam.aborter) {
      try {
        cam.aborter.abort();
      } catch (err) {
        void err;
      }
      cam.aborter = null;
    }
    clearTimeout(cam.connectTimer);
    cam.connectTimer = 0;
  }

  function stopCamera() {
    abortCamStream();
    clearTimeout(cam.retryTimer);
    cam.retryTimer = 0;
    clearInterval(cam.watchdog);
    cam.watchdog = 0;
    cam.canvas = null;
    cam.ctx = null;
    cam.status = 'idle';
    cam.frames = 0;
    cam.lastFrame = 0;
    cam.fps = 0;
    cam.fpsAt = 0;
    cam.fpsFrames = 0;
    cam.retry = 0;
  }

  function startCamera() {
    const canvas = byId('video-feed');
    if (!canvas) {
      stopCamera();
      return;
    }
    if (cam.canvas === canvas && cam.status !== 'idle') {
      syncCamTabs();
      camFoot();
      return;
    }
    stopCamera();
    cam.canvas = canvas;
    cam.ctx = canvas.getContext('2d', { alpha: false });
    syncCamTabs();
    const source = CAM_SOURCES[state.camSrc] || CAM_SOURCES.color;
    setCamState('connecting', '连接中…', `正在接入${source.name}`, `${CAM_BASE} · ${source.topic}`);
    clearInterval(cam.watchdog);
    cam.watchdog = setInterval(camWatchdog, 2000);
    connectCamera();
  }

  function camWatchdog() {
    if (!cam.canvas) return;
    const now = performance.now();
    if (cam.status === 'live' && cam.lastFrame && now - cam.lastFrame > CAM_STALL_MS) {
      abortCamStream();
      scheduleReconnect();
    }
  }

  function scheduleReconnect() {
    if (!cam.canvas || cam.retryTimer) return;
    const delays = [900, 1600, 2800, 4500, 7000];
    const delay = delays[Math.min(cam.retry, delays.length - 1)];
    cam.retry += 1;
    cam.status = 'retry';
    /* 深度流连续失败两次才提示要跑色阶转换，避免网络抖一下就吓人 */
    const depthHint = state.camSrc === 'depth' && cam.retry >= 2;
    setCamState(
      'retry',
      '重连中…',
      depthHint ? '深度画面未接入' : '画面中断，正在重连',
      depthHint
        ? `等待 ${CAM_BASE} 上的 /camera/depth/colorized。深度话题是 16UC1，web_video_server 不能直接编码，请先在机器上运行 tools/depth_colorize.py。`
        : `${CAM_BASE} 暂不可达，${delay} ms 后重试（第 ${cam.retry} 次）`
    );
    cam.retryTimer = setTimeout(() => {
      cam.retryTimer = 0;
      connectCamera();
    }, delay);
  }

  function drawCamFrame(bytes, myGen) {
    return createImageBitmap(new Blob([bytes], { type: 'image/jpeg' }))
      .then((bmp) => {
        const canvas = cam.canvas;
        /* 解码是异步的：切走画面 / 切来源之后，上一路迟到的帧必须丢掉 */
        if (myGen !== cam.generation || !canvas || !cam.ctx) {
          bmp.close();
          return;
        }
        if (canvas.width !== bmp.width || canvas.height !== bmp.height) {
          canvas.width = bmp.width;
          canvas.height = bmp.height;
        }
        cam.ctx.drawImage(bmp, 0, 0);
        bmp.close();
        const now = performance.now();
        cam.frames += 1;
        cam.fpsFrames += 1;
        cam.lastFrame = now;
        cam.retry = 0;
        if (cam.connectTimer) {
          clearTimeout(cam.connectTimer);
          cam.connectTimer = 0;
        }
        if (cam.status !== 'live') {
          cam.status = 'live';
          setCamState('live', '在线', '现场画面', '');
        }
        if (!cam.fpsAt) cam.fpsAt = now;
        if (now - cam.fpsAt >= 1000) {
          cam.fps = Math.round((cam.fpsFrames * 1000) / (now - cam.fpsAt));
          cam.fpsAt = now;
          cam.fpsFrames = 0;
          camFoot();
        }
      })
      .catch(() => {});
  }

  async function connectCamera() {
    if (!cam.canvas) return;
    abortCamStream();
    const myGen = cam.generation;
    const source = CAM_SOURCES[state.camSrc] || CAM_SOURCES.color;
    cam.status = 'connecting';
    setCamState('connecting', '连接中…', `正在接入${source.name}`, `${CAM_BASE} · ${source.topic}`);
    const ctrl = new AbortController();
    cam.aborter = ctrl;
    cam.connectTimer = setTimeout(() => {
      if (cam.status !== 'live') {
        abortCamStream();
        scheduleReconnect();
      }
    }, 7000);
    try {
      const res = await fetch(camUrl(state.camSrc), { signal: ctrl.signal, cache: 'no-store' });
      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);
      const type = res.headers.get('content-type') || '';
      const m = /boundary=(?:"([^"]+)"|([^;]+))/i.exec(type);
      const boundary = (m && (m[1] || m[2] || '').trim()) || 'boundarydonotcross';
      const delim = new TextEncoder().encode(`--${boundary}`);
      const reader = res.body.getReader();
      let buf = new Uint8Array(0);
      while (true) {
        const { value, done } = await reader.read();
        if (myGen !== cam.generation) return;
        if (done) break;
        buf = concatBytes(buf, value);
        let part = takePart(buf, delim);
        while (part) {
          buf = part.rest;
          if (myGen !== cam.generation) return;
          await drawCamFrame(part.body, myGen);
          part = takePart(buf, delim);
        }
        /* 异常数据把缓冲区吃满时直接丢弃，下一帧会重新对齐 boundary */
        if (buf.length > 12 * 1024 * 1024) buf = new Uint8Array(0);
      }
      throw new Error('stream ended');
    } catch (err) {
      if (err && err.name === 'AbortError') return;
      if (myGen !== cam.generation) return;
      abortCamStream();
      scheduleReconnect();
    }
  }

  function setCamSource(key) {
    if (!CAM_SOURCES[key] || key === state.camSrc) return;
    state.camSrc = key;
    try {
      localStorage.setItem('x3.camSrc', key);
    } catch (err) {
      void err;
    }
    abortCamStream();
    clearTimeout(cam.retryTimer);
    cam.retryTimer = 0;
    cam.retry = 0;
    cam.frames = 0;
    cam.lastFrame = 0;
    cam.fps = 0;
    cam.fpsAt = 0;
    cam.fpsFrames = 0;
    if (cam.ctx && cam.canvas) {
      cam.ctx.fillStyle = '#000';
      cam.ctx.fillRect(0, 0, cam.canvas.width, cam.canvas.height);
    }
    syncCamTabs();
    connectCamera();
    camFoot();
    toast(`已切换到${CAM_SOURCES[key].label}画面`);
  }

  function downloadBlob(blob, name) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }

  /* 截图直接取 canvas 上正在显示的那一帧；没收到画面就不假装保存成功。 */
  function captureFrame() {
    const mapMode = state.view === 'map' || state.route === 'map';
    if (mapMode) {
      const canvases = [...document.querySelectorAll('[data-scan-canvas]')];
      const canvas = canvases.find((c) => {
        const box = c.getBoundingClientRect();
        return box.width > 0 && box.height > 0;
      });
      if (!canvas || !scanActive()) {
        toast('雷达尚未就绪，稍后再截图');
        return;
      }
      canvas.toBlob((blob) => {
        if (!blob) {
          toast('雷达截图失败，请重试');
          return;
        }
        const d = new Date();
        const stamp = `${dateText(d.getTime()).replace(/-/g, '')}-${two(d.getHours())}${two(d.getMinutes())}${two(d.getSeconds())}`;
        downloadBlob(blob, `x3-lidar-${stamp}.png`);
        state.shots += 1;
        const count = byId('task-shots');
        if (count) count.textContent = `${state.shots} 张`;
        toast(`已保存雷达截图 ${canvas.width}×${canvas.height}`);
      }, 'image/png');
      return;
    }
    const canvas = byId('video-feed');
    if (!canvas || !cam.frames) {
      toast('画面尚未就绪，稍后再截图');
      return;
    }
    const source = CAM_SOURCES[state.camSrc] || CAM_SOURCES.color;
    const stale = cam.status !== 'live';
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          toast('截图失败，请重试');
          return;
        }
        const d = new Date();
        const stamp = `${dateText(d.getTime()).replace(/-/g, '')}-${two(d.getHours())}${two(d.getMinutes())}${two(d.getSeconds())}`;
        downloadBlob(blob, `x3-${state.camSrc}-${stamp}.jpg`);
        state.shots += 1;
        const count = byId('task-shots');
        if (count) count.textContent = `${state.shots} 张`;
        toast(`已保存${source.name}截图 ${canvas.width}×${canvas.height}${stale ? '（最后一帧）' : ''}`);
      },
      'image/jpeg',
      0.92
    );
  }

  /* -------------------------------------------------------------------------
     rosbridge 客户端
     原生 WebSocket；不引 roslibjs。连接的建立/断开、订阅、发布、服务调用、
     分片重组和自动重连都在这里。消息只写 state，不直接 render 页面。
     ------------------------------------------------------------------------- */
  const ros = {
    ws: null,
    status: 'offline',
    manual: false,
    attempt: 0,
    retryTimer: 0,
    pingTimer: 0,
    stableTimer: 0,
    pending: new Map(),
    nextId: 1,
    subs: new Map(),
    advertised: new Set(),
    fragments: new Map(),
    rtts: [],
    pingFails: 0,
    hadConnected: false,
    toasted: false
  };

  const zeroTwist = () => ({
    linear: { x: 0, y: 0, z: 0 },
    angular: { x: 0, y: 0, z: 0 }
  });

  const rosUrlText = () => ROSBRIDGE_URL.replace(/^wss?:\/\//, '');
  const normalizeDeg = (d) => (((d + 180) % 360) + 360) % 360 - 180;

  function rosSend(obj) {
    if (!ros.ws || ros.ws.readyState !== 1) return false;
    try {
      ros.ws.send(JSON.stringify(obj));
      return true;
    } catch (err) {
      void err;
      return false;
    }
  }

  function rosSetStatus(next) {
    const prev = state.link;
    state.link = next;
    ros.status = next;
    if (prev === next) return;
    if (next === 'connected') {
      connectLog({ t: 'out', m: `✔ rosbridge 已连接 · ${rosUrlText()}` });
      if (!ros.toasted) {
        ros.toasted = true;
        toast('已连接 rosbridge');
      }
    } else if (next === 'reconnecting') {
      connectLog({ t: 'dim', m: 'rosbridge 断开，正在重连…' });
    } else if (next === 'offline' && prev !== 'offline') {
      connectLog({ t: 'dim', m: 'rosbridge 已断开' });
    }
    rosSyncChrome();
    if (state.route === 'connect') syncConnectView();
    if (state.route === 'control' || state.route === 'machine' || state.route === 'map') syncLive();
  }

  function rosSyncChrome() {
    const label = linkLabel();
    ['link-chip', 'ctrl-link-chip', 'map-link-chip', 'machine-health'].forEach((id) => {
      const chip = byId(id);
      if (!chip) return;
      chip.dataset.linkState = state.link;
      chip.classList.toggle('chip--ghost', state.link !== 'connected');
      chip.classList.toggle('chip--warn', state.link === 'reconnecting');
    });
    const connectText = byId('link-text');
    if (connectText) connectText.textContent = label;
    const ctrlText = byId('ctrl-link-text');
    if (ctrlText) ctrlText.textContent = `${state.view === 'map' ? '雷达模式' : '实时模式'} · ${label}`;
    const mapText = byId('map-link-text');
    if (mapText) {
      mapText.textContent =
        state.link === 'connected' ? (scanActive() ? '实时扫描' : '等待雷达') : label;
    }
    const healthTextEl = byId('machine-health-text');
    if (healthTextEl) healthTextEl.textContent = healthText();
    const metaLat = byId('meta-latency');
    if (metaLat) metaLat.textContent = latencyText();
    const metaEdition = byId('meta-edition');
    if (metaEdition) metaEdition.textContent = editionText();
    const metaClients = byId('meta-clients');
    if (metaClients) metaClients.textContent = clientsText();
    const metaRos = byId('meta-ros');
    if (metaRos) metaRos.textContent = state.rosDistro || '—';
    syncDriveAvailability();
  }

  function rosConnect() {
    if (ros.ws && (ros.ws.readyState === 0 || ros.ws.readyState === 1)) return;
    ros.manual = false;
    clearTimeout(ros.retryTimer);
    ros.retryTimer = 0;
    rosSetStatus(ros.hadConnected && ros.attempt > 0 ? 'reconnecting' : 'connecting');
    if (!ros.hadConnected) connectLog({ t: 'dim', m: `rosbridge → ${rosUrlText()}` });
    let ws;
    try {
      ws = new WebSocket(ROSBRIDGE_URL);
    } catch (err) {
      connectLog({ t: 'dim', m: `rosbridge 连接失败：${err.message}` });
      rosScheduleReconnect();
      return;
    }
    ros.ws = ws;
    ws.onopen = () => {
      if (ros.ws === ws) rosOnOpen();
    };
    ws.onmessage = (ev) => {
      if (ros.ws === ws) rosOnMessage(ev);
    };
    ws.onerror = () => {};
    ws.onclose = () => {
      if (ros.ws === ws) rosOnClose();
    };
  }

  function rosOnOpen() {
    ros.hadConnected = true;
    ros.pingFails = 0;
    ros.rtts.length = 0;
    ros.advertised.clear();
    rosSetStatus('connected');
    ros.subs.forEach((sub) => {
      rosSend({
        op: 'subscribe',
        id: sub.id,
        topic: sub.topic,
        type: sub.type,
        throttle_rate: sub.throttle,
        queue_length: 1,
        fragment_size: 1048576
      });
    });
    rosAdvertise(CMD_VEL_TOPIC, ROS_TYPES.cmdVel);
    rosAdvertise('/Buzzer', ROS_TYPES.buzzer);
    rosAdvertise('/RGBLight', ROS_TYPES.rgb);
    /* 安全默认：连接建立先发零速度、关蜂鸣器 */
    rosPublish(CMD_VEL_TOPIC, zeroTwist());
    rosPublish('/Buzzer', { data: false });
    rosFetchRosapi();
    rosPing();
    startRosTimers();
    clearTimeout(ros.stableTimer);
    ros.stableTimer = setTimeout(() => {
      ros.attempt = 0;
    }, 5000);
  }

  function rosOnClose() {
    ros.ws = null;
    ros.advertised.clear();
    ros.fragments.clear();
    ros.pending.forEach((p) => {
      clearTimeout(p.timer);
      p.reject(new Error('rosbridge 已断开'));
    });
    ros.pending.clear();
    stopRosTimers();
    state.latency = 0;
    stopDrive('link');
    if (ros.manual) {
      ros.manual = false;
      rosSetStatus('offline');
      return;
    }
    rosSetStatus('reconnecting');
    rosScheduleReconnect();
  }

  function rosScheduleReconnect() {
    if (ros.manual || ros.retryTimer) return;
    const delays = [1000, 2000, 4000, 8000, 15000];
    const delay = delays[Math.min(ros.attempt, delays.length - 1)];
    ros.attempt += 1;
    ros.retryTimer = setTimeout(() => {
      ros.retryTimer = 0;
      rosConnect();
    }, delay);
  }

  function rosDisconnect(manual = true) {
    ros.manual = manual;
    clearTimeout(ros.retryTimer);
    ros.retryTimer = 0;
    stopDrive('disconnect');
    if (ros.ws) {
      try {
        ros.ws.close();
      } catch (err) {
        void err;
      }
    }
    ros.ws = null;
    ros.advertised.clear();
    ros.fragments.clear();
    ros.pending.forEach((p) => {
      clearTimeout(p.timer);
      p.reject(new Error('rosbridge 已断开'));
    });
    ros.pending.clear();
    stopRosTimers();
    rosSetStatus('offline');
    connectLog({ t: 'dim', m: 'rosbridge 已断开' });
  }

  function rosCall(service, args = {}, timeout = 6000) {
    return new Promise((resolve, reject) => {
      if (!ros.ws || ros.ws.readyState !== 1) {
        reject(new Error('rosbridge 未连接'));
        return;
      }
      const id = `call_${ros.nextId++}`;
      const timer = setTimeout(() => {
        if (ros.pending.has(id)) {
          ros.pending.delete(id);
          reject(new Error(`服务超时：${service}`));
        }
      }, timeout);
      ros.pending.set(id, { resolve, reject, timer });
      rosSend({ op: 'call_service', id, service, args });
    });
  }

  function rosSubscribe(topic, type, throttle = 0) {
    if (ros.subs.has(topic)) return ros.subs.get(topic);
    const sub = { id: `sub_${ros.nextId++}`, topic, type, throttle };
    ros.subs.set(topic, sub);
    if (ros.ws && ros.ws.readyState === 1) {
      rosSend({
        op: 'subscribe',
        id: sub.id,
        topic,
        type,
        throttle_rate: throttle,
        queue_length: 1,
        fragment_size: 1048576
      });
    }
    return sub;
  }

  function rosUnsubscribe(topic) {
    const sub = ros.subs.get(topic);
    if (!sub) return;
    ros.subs.delete(topic);
    if (ros.ws && ros.ws.readyState === 1) rosSend({ op: 'unsubscribe', id: sub.id, topic });
  }

  function rosAdvertise(topic, type) {
    if (!ros.ws || ros.ws.readyState !== 1) return;
    if (ros.advertised.has(topic)) return;
    ros.advertised.add(topic);
    rosSend({ op: 'advertise', id: `adv_${ros.nextId++}`, topic, type, queue_size: 1 });
  }

  function rosPublish(topic, msg) {
    if (!ros.ws || ros.ws.readyState !== 1) return false;
    if (!ros.advertised.has(topic)) {
      const type =
        topic === CMD_VEL_TOPIC
          ? ROS_TYPES.cmdVel
          : topic === '/Buzzer'
            ? ROS_TYPES.buzzer
            : topic === '/RGBLight'
              ? ROS_TYPES.rgb
              : null;
      if (!type) return false;
      rosAdvertise(topic, type);
    }
    return rosSend({ op: 'publish', topic, msg });
  }

  function rosHandleServiceResponse(msg) {
    const p = ros.pending.get(msg.id);
    if (!p) return;
    ros.pending.delete(msg.id);
    clearTimeout(p.timer);
    if (msg.result === false) {
      const detail = typeof msg.values === 'string' ? msg.values : JSON.stringify(msg.values);
      p.reject(new Error(detail || '服务返回失败'));
    } else {
      p.resolve(msg.values);
    }
  }

  function rosHandleFragment(msg) {
    const key = msg.id != null ? msg.id : msg.topic || 'fragment';
    let f = ros.fragments.get(key);
    if (!f) {
      f = { total: msg.total || 0, parts: [] };
      ros.fragments.set(key, f);
    }
    const at = msg.num != null ? msg.num : f.parts.length;
    f.parts[at] = typeof msg.data === 'string' ? msg.data : '';
    const total = msg.total || f.total || f.parts.length;
    let got = 0;
    for (let i = 0; i < total; i++) if (typeof f.parts[i] === 'string') got += 1;
    if (total > 0 && got >= total) {
      ros.fragments.delete(key);
      try {
        rosProcess(JSON.parse(f.parts.join('')));
      } catch (err) {
        void err;
      }
    }
  }

  function rosProcess(msg) {
    if (!msg || !msg.op) return;
    if (msg.op === 'fragment') {
      rosHandleFragment(msg);
      return;
    }
    if (msg.op === 'service_response') {
      rosHandleServiceResponse(msg);
      return;
    }
    if (msg.op === 'publish') {
      bumpRate(msg.topic);
      ingestRosMessage(msg.topic, msg.msg);
      return;
    }
    if (msg.op === 'status' && (msg.level === 'error' || msg.level === 'warning')) {
      connectLog({ t: 'dim', m: `rosbridge ${msg.level}: ${msg.msg}` });
    }
  }

  function rosOnMessage(ev) {
    if (typeof ev.data !== 'string') return;
    let msg;
    try {
      msg = JSON.parse(ev.data);
    } catch (err) {
      void err;
      return;
    }
    rosProcess(msg);
  }

  async function rosPing() {
    if (!ros.ws || ros.ws.readyState !== 1) return;
    const t0 = performance.now();
    try {
      await rosCall('/rosapi/get_time', {}, 2500);
      const rtt = performance.now() - t0;
      ros.rtts.push(rtt);
      if (ros.rtts.length > 5) ros.rtts.shift();
      const sorted = [...ros.rtts].sort((a, b) => a - b);
      state.latency = sorted[Math.floor((sorted.length - 1) / 2)];
      ros.pingFails = 0;
      const meta = byId('meta-latency');
      if (meta) meta.textContent = latencyText();
    } catch (err) {
      void err;
      ros.pingFails += 1;
      if (ros.pingFails >= 3) {
        ros.pingFails = 0;
        try {
          ros.ws.close();
        } catch (err2) {
          void err2;
        }
      }
    }
  }

  async function rosFetchRosapi() {
    try {
      const v = await rosCall('/rosapi/get_ros_version', {}, 4000);
      state.rosDistro = v.distro || '';
    } catch (err) {
      void err;
    }
    try {
      const t = await rosCall('/rosapi/topics', {}, 4000);
      state.rosTopics = t.topics || [];
      state.rosTopicTypes = t.types || [];
    } catch (err) {
      void err;
    }
    try {
      const n = await rosCall('/rosapi/nodes', {}, 4000);
      state.rosNodes = n.nodes || [];
    } catch (err) {
      void err;
    }
    rosSyncChrome();
    connectLog({
      t: 'out',
      m: `ROS ${state.rosDistro || '?'} · ${state.rosTopics.length} topics · ${state.rosNodes.length} nodes`
    });
  }

  function startRosTimers() {
    stopRosTimers();
    ros.pingTimer = setInterval(rosPing, 2000);
  }

  function stopRosTimers() {
    clearInterval(ros.pingTimer);
    ros.pingTimer = 0;
    clearTimeout(ros.stableTimer);
    ros.stableTimer = 0;
  }

  /* 消息频率统计：每 2 s 结算一次，供连接页和机器页显示真实 Hz */
  const rateCounts = Object.create(null);
  let rateBase = performance.now();
  let rateTimer = 0;

  function bumpRate(topic) {
    rateCounts[topic] = (rateCounts[topic] || 0) + 1;
  }

  function startRateCounter() {
    if (rateTimer) return;
    rateBase = performance.now();
    rateTimer = setInterval(() => {
      const now = performance.now();
      const dt = (now - rateBase) / 1000;
      if (dt < 0.2) return;
      const next = {};
      Object.keys(rateCounts).forEach((k) => {
        next[k] = rateCounts[k] / dt;
        delete rateCounts[k];
      });
      state.rates = next;
      rateBase = now;
    }, 2000);
  }

  function rateFor(topic) {
    const hz = state.rates[topic];
    return Number.isFinite(hz) && hz > 0 ? `${hz.toFixed(1)} Hz` : '—';
  }

  function startRos() {
    ROS_SUBS.forEach(([topic, type, throttle]) => rosSubscribe(topic, type, throttle));
    startRateCounter();
    rosConnect();
  }

  function ingestRosMessage(topic, msg) {
    if (!msg) return;
    if (topic === '/scan') onScan(msg);
    else if (topic === '/imu/data_raw') onImu(msg);
    else if (topic === '/imu/mag') onMag(msg);
    else if (topic === '/vel_raw') onVel(msg);
    else if (topic === '/voltage') onVoltage(msg);
    else if (topic === '/edition') onEdition(msg);
    else if (topic === '/connected_clients') onClients(msg);
    else if (topic === '/camera/depth/camera_info') onCamInfo(msg);
    else if (topic === '/camera/depth/image_raw') onDepth(msg);
  }

  function onScan(msg) {
    const ranges = Array.isArray(msg.ranges) ? msg.ranges : [];
    const now = performance.now();
    if (state.scan.lastAt) {
      const dt = Math.max(1, now - state.scan.lastAt);
      const hz = 1000 / dt;
      state.scan.rate = state.scan.rate ? state.scan.rate * 0.8 + hz * 0.2 : hz;
    }
    state.scan.lastAt = now;
    state.scan.ranges = ranges;
    state.scan.angleMin = Number(msg.angle_min) || 0;
    state.scan.angleMax = Number(msg.angle_max) || 0;
    state.scan.angleInc = Number(msg.angle_increment) || 0;
    state.scan.rangeMin = Number(msg.range_min) || 0;
    state.scan.rangeMax = Number(msg.range_max) || 0;
    state.scan.count = ranges.length;
    state.scan.frame = (msg.header && msg.header.frame_id) || '';
    let valid = 0;
    let nearest = null;
    let nearestAngle = 0;
    for (let i = 0; i < ranges.length; i++) {
      const r = ranges[i];
      if (!Number.isFinite(r) || r < state.scan.rangeMin || r > state.scan.rangeMax) continue;
      valid += 1;
      if (nearest == null || r < nearest) {
        nearest = r;
        nearestAngle = state.scan.angleMin + i * state.scan.angleInc;
      }
    }
    state.scan.valid = valid;
    state.scan.nearest = nearest;
    state.scan.nearestBearing = nearest == null ? null : normalizeDeg((nearestAngle * 180) / Math.PI);
    state.scan.version += 1;
    state.scanAt = Date.now();
    drawLidar();
  }

  function onImu(msg) {
    const a = msg.linear_acceleration || {};
    const ax = Number(a.x) || 0;
    const ay = Number(a.y) || 0;
    const az = Number(a.z) || 0;
    const pitch = (Math.atan2(-ax, Math.hypot(ay, az)) * 180) / Math.PI;
    const roll = (Math.atan2(ay, az) * 180) / Math.PI;
    state.pitch = state.pitch == null ? pitch : state.pitch * 0.8 + pitch * 0.2;
    state.roll = state.roll == null ? roll : state.roll * 0.8 + roll * 0.2;
    const g = msg.angular_velocity || {};
    state.gz = Number(g.z) || 0;
    state.imuAt = Date.now();
  }

  function onMag(msg) {
    const m = msg.magnetic_field || {};
    const mx = Number(m.x) || 0;
    const my = Number(m.y) || 0;
    if (mx !== 0 || my !== 0) {
      const heading = (Math.atan2(-my, mx) * 180) / Math.PI;
      const next = (heading + 360) % 360;
      if (state.yaw == null) state.yaw = next;
      else state.yaw = (state.yaw + normalizeDeg(next - state.yaw) * 0.25 + 360) % 360;
    }
    state.magAt = Date.now();
  }

  function onVel(msg) {
    const l = msg.linear || {};
    const a = msg.angular || {};
    const vx = Number(l.x) || 0;
    const vy = Number(l.y) || 0;
    const wz = Number(a.z) || 0;
    const now = performance.now();
    if (state.distanceAt) {
      const dt = Math.min(0.5, (now - state.distanceAt) / 1000);
      if (dt > 0) state.distance += Math.hypot(vx, vy) * dt;
    }
    state.distanceAt = now;
    state.linear = vx;
    state.lateral = vy;
    state.angular = wz;
    state.velAt = Date.now();
  }

  function onVoltage(msg) {
    const v = Number(msg.data);
    if (!Number.isFinite(v) || v < 5 || v > 20) return;
    state.voltage = state.voltage == null ? v : state.voltage * 0.8 + v * 0.2;
    state.voltageAt = Date.now();
    state.battery = batteryFromVoltage(state.voltage);
  }

  function onEdition(msg) {
    const v = Number(msg.data);
    if (!Number.isFinite(v)) return;
    state.edition = v;
    state.editionAt = Date.now();
  }

  function onClients(msg) {
    state.clients = Array.isArray(msg.clients) ? msg.clients.length : null;
    state.clientsAt = Date.now();
  }

  function onCamInfo(msg) {
    const k = Array.isArray(msg.k) ? msg.k : [];
    if (k.length < 9 || !msg.width || !msg.height) return;
    state.camInfo = {
      fx: Number(k[0]) || 580.572,
      fy: Number(k[4]) || 580.572,
      cx: Number(k[2]) || 322.809,
      cy: Number(k[5]) || 243.061,
      width: msg.width,
      height: msg.height
    };
  }


  /* 控制中心：救援功能开关、画面模式切换、按钮操纵、发布任务。 */
  /* -------------------------------------------------------------------------
     麦克纳姆底盘
     3×3 全向盘 + 左右原地转；按住才动，松开/失焦/切页/急停立即发 0。
     ------------------------------------------------------------------------- */
  const DRIVE_VECTORS = {
    n: [1, 0, 0],
    s: [-1, 0, 0],
    w: [0, 1, 0],
    e: [0, -1, 0],
    nw: [0.7071, 0.7071, 0],
    ne: [0.7071, -0.7071, 0],
    sw: [-0.7071, 0.7071, 0],
    se: [-0.7071, -0.7071, 0],
    tl: [0, 0, 1],
    tr: [0, 0, -1],
    stop: [0, 0, 0]
  };

  const DIR_LABEL = {
    n: '前进',
    s: '后退',
    w: '左移',
    e: '右移',
    nw: '左前',
    ne: '右前',
    sw: '左后',
    se: '右后',
    tl: '左转',
    tr: '右转',
    stop: '待命'
  };

  const drive = {
    active: false,
    dir: 'stop',
    mode: 'manual',
    estop: false,
    zeroBurst: 0
  };

  function driveVector(dir) {
    const v = DRIVE_VECTORS[dir] || DRIVE_VECTORS.stop;
    return { x: v[0] * state.speed, y: v[1] * state.speed, w: v[2] * state.turnSpeed };
  }

  function publishDrive() {
    if (state.link !== 'connected') return;
    rosPublish(CMD_VEL_TOPIC, {
      linear: { x: state.cmd.x, y: state.cmd.y, z: 0 },
      angular: { x: 0, y: 0, z: state.cmd.w }
    });
  }

  function publishZeroBurst() {
    if (state.link !== 'connected') return;
    clearInterval(drive.zeroBurst);
    publishDrive();
    let n = 0;
    drive.zeroBurst = setInterval(() => {
      publishDrive();
      n += 1;
      if (n >= 2) {
        clearInterval(drive.zeroBurst);
        drive.zeroBurst = 0;
      }
    }, 120);
  }

  function driveCommand(dir) {
    if (state.link !== 'connected') {
      toast('rosbridge 未连接');
      return;
    }
    if (drive.mode !== 'manual' || drive.estop) return;
    if (!DRIVE_VECTORS[dir] || dir === 'stop') {
      stopDrive('stop');
      return;
    }
    clearInterval(drive.zeroBurst);
    drive.zeroBurst = 0;
    drive.active = true;
    drive.dir = dir;
    state.dir = dir;
    state.cmd = driveVector(dir);
    clearInterval(state.cmdTimer);
    publishDrive();
    state.cmdTimer = setInterval(publishDrive, DRIVE_PUBLISH_MS);
    syncDriveUI();
  }

  function stopDrive(reason = 'stop') {
    clearInterval(state.cmdTimer);
    state.cmdTimer = 0;
    clearInterval(drive.zeroBurst);
    drive.zeroBurst = 0;
    const wasActive = drive.active || state.cmd.x !== 0 || state.cmd.y !== 0 || state.cmd.w !== 0;
    drive.active = false;
    drive.dir = 'stop';
    state.dir = 'stop';
    state.cmd = { x: 0, y: 0, w: 0 };
    if (wasActive) publishZeroBurst();
    syncDriveUI(reason);
  }

  function syncDriveUI(reason = '') {
    const panel = document.querySelector('.panel--drive');
    if (panel) {
      panel.classList.toggle('is-offline', state.link !== 'connected');
      panel.classList.toggle('is-locked', drive.mode !== 'manual');
      panel.classList.toggle('is-estop', drive.estop);
      panel.querySelectorAll('[data-dir]').forEach((b) => {
        b.classList.toggle('is-on', drive.active && b.dataset.dir === drive.dir);
      });
    }
    const stateEl = byId('drive-state');
    if (!stateEl) return;
    if (state.link !== 'connected') stateEl.textContent = '未连接 · 无法操纵';
    else if (drive.estop) stateEl.textContent = '急停锁定 · 再按急停解除';
    else if (drive.mode !== 'manual') stateEl.textContent = '锁止 · 不可操纵';
    else if (!drive.active) {
      stateEl.textContent =
        reason === 'blur' ? '失焦 · 已停' : reason === 'hidden' ? '页面隐藏 · 已停' : '待命';
    } else if (drive.dir === 'tl' || drive.dir === 'tr') {
      stateEl.textContent = `${DIR_LABEL[drive.dir]} ${state.turnSpeed.toFixed(2)} rad/s`;
    } else {
      stateEl.textContent = `${DIR_LABEL[drive.dir]} ${state.speed.toFixed(2)} m/s`;
    }
  }

  function syncDriveAvailability() {
    const ok = state.link === 'connected' && drive.mode === 'manual' && !drive.estop;
    document.querySelectorAll('.panel--drive [data-dir]').forEach((b) => {
      b.disabled = !ok;
    });
    const panel = document.querySelector('.panel--drive');
    if (panel) {
      panel.classList.toggle('is-offline', state.link !== 'connected');
      panel.classList.toggle('is-locked', drive.mode !== 'manual');
      panel.classList.toggle('is-estop', drive.estop);
    }
    const estop = byId('estop');
    if (estop) {
      estop.classList.toggle('is-on', drive.estop);
      estop.setAttribute('aria-pressed', String(drive.estop));
      estop.title = drive.estop ? '解除急停' : '急停';
    }
    syncPeripheralAvailability();
    syncDriveUI();
  }

  function syncPeripheralAvailability() {
    const ok = state.link === 'connected';
    document.querySelectorAll('[data-peripheral]').forEach((b) => {
      b.disabled = !ok;
    });
  }

  /* 蜂鸣器：点一下响 0.5 s，自动关；连接建立时 rosOnOpen 还会补发一次 false。 */
  let buzzerTimer = 0;
  function beepBuzzer() {
    if (state.link !== 'connected') {
      toast('rosbridge 未连接');
      return;
    }
    rosPublish('/Buzzer', { data: true });
    clearTimeout(buzzerTimer);
    buzzerTimer = setTimeout(() => {
      rosPublish('/Buzzer', { data: false });
      buzzerTimer = 0;
    }, 500);
    toast('蜂鸣器 0.5 s');
  }

  function releaseBuzzer() {
    if (!buzzerTimer) return;
    clearTimeout(buzzerTimer);
    buzzerTimer = 0;
    rosPublish('/Buzzer', { data: false });
  }

  function publishRgbEffect(n) {
    if (state.link !== 'connected') {
      toast('rosbridge 未连接');
      return;
    }
    state.rgbEffect = n;
    rosPublish('/RGBLight', { data: n });
    document.querySelectorAll('[data-rgb-effect]').forEach((b) => {
      b.classList.toggle('is-on', Number(b.dataset.rgbEffect) === n);
    });
    toast(n === 0 ? 'RGB 灯已关闭' : `RGB 灯效 ${n} 已发送`);
  }

  function bindMachine() {
    const buzzer = byId('buzzer-btn');
    if (buzzer) buzzer.addEventListener('click', beepBuzzer);
    const effects = document.querySelector('.effect-btns');
    if (effects) {
      effects.addEventListener('click', (e) => {
        const b = e.target.closest('[data-rgb-effect]');
        if (b) publishRgbEffect(Number(b.dataset.rgbEffect));
      });
    }
    syncPeripheralAvailability();
  }

  /* -------------------------------------------------------------------------
     激光雷达 canvas
     white grid + 1080 点；0° 朝上，正角度朝左。8 Hz 重绘。
     ------------------------------------------------------------------------- */
  function drawLidar() {
    const canvases = document.querySelectorAll('[data-scan-canvas]');
    if (!canvases.length) return;
    const active = scanActive();
    const scan = state.scan;
    const view = state.lidarRange || SCAN_RANGE_DEFAULT;
    canvases.forEach((canvas) => {
      const box = canvas.getBoundingClientRect();
      if (!box.width || !box.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(box.width * dpr);
      const h = Math.round(box.height * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cw = box.width;
      const ch = box.height;
      ctx.clearRect(0, 0, cw, ch);
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, cw, ch);
      const cx = cw / 2;
      const cy = ch / 2;
      const radius = Math.max(24, Math.min(cw, ch) / 2 - 18);
      const scale = radius / view;
      ctx.lineWidth = 1;
      for (let m = 1; m <= view; m += 1) {
        const rr = m * scale;
        if (m % 2 === 0 || m === view) {
          ctx.strokeStyle = m === view ? 'rgba(25,26,30,0.22)' : 'rgba(25,26,30,0.08)';
          ctx.beginPath();
          ctx.arc(cx, cy, rr, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fillStyle = 'rgba(25,26,30,0.32)';
          ctx.font = '9px system-ui, sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText(`${m} m`, cx + 4, cy - rr + 10);
        }
      }
      ctx.strokeStyle = 'rgba(25,26,30,0.06)';
      for (let deg = 0; deg < 360; deg += 30) {
        const a = (deg * Math.PI) / 180;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx - Math.sin(a) * radius, cy - Math.cos(a) * radius);
        ctx.stroke();
      }
      if (!active) return;
      const n = scan.ranges.length;
      const lim = Math.min(scan.rangeMax || view, view);
      const size = Math.max(1, Math.round(1.4 * dpr) / dpr);
      ctx.fillStyle = 'rgba(25,26,30,0.55)';
      for (let i = 0; i < n; i++) {
        const r = scan.ranges[i];
        if (!Number.isFinite(r) || r < scan.rangeMin || r > lim) continue;
        const a = scan.angleMin + i * scan.angleInc;
        ctx.fillRect(
          cx - Math.sin(a) * r * scale - size / 2,
          cy - Math.cos(a) * r * scale - size / 2,
          size,
          size
        );
      }
      if (scan.nearest != null && scan.nearestBearing != null && scan.nearest <= view) {
        const a = (scan.nearestBearing * Math.PI) / 180;
        const px = cx - Math.sin(a) * scan.nearest * scale;
        const py = cy - Math.cos(a) * scan.nearest * scale;
        ctx.strokeStyle = '#c2382c';
        ctx.fillStyle = '#c2382c';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(px, py, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = '#191a1e';
      ctx.beginPath();
      ctx.arc(cx, cy, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, 4.5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = '#191a1e';
      ctx.beginPath();
      ctx.moveTo(cx, cy - 5);
      ctx.lineTo(cx, cy - 14);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx - 4, cy - 10);
      ctx.lineTo(cx, cy - 15);
      ctx.lineTo(cx + 4, cy - 10);
      ctx.stroke();
    });
  }

  function syncScanUI() {
    const active = scanActive();
    const emptyText =
      state.link !== 'connected'
        ? 'rosbridge 未连接'
        : state.link === 'connecting' || state.link === 'reconnecting'
          ? '正在连接 rosbridge…'
          : state.scan.count
            ? '雷达数据超时…'
            : '等待 /scan 数据…';
    document.querySelectorAll('[data-lidar-empty]').forEach((el) => {
      el.hidden = active;
      el.textContent = emptyText;
    });
    const hudState = byId('scan-hud-state');
    if (hudState) {
      hudState.textContent = active
        ? '● 雷达扫描'
        : state.link === 'connected'
          ? '○ 等待 /scan'
          : '○ 雷达离线';
    }
    const foot = byId('scan-foot');
    if (foot) {
      foot.textContent = active
        ? `机器人坐标系 · 非建图 · 最近 ${scanNearText()}`
        : '机器人坐标系 · 非建图 · 等待数据';
    }
    document.querySelectorAll('[data-lidar-range]').forEach((b) => {
      const on = Number(b.dataset.lidarRange) === state.lidarRange;
      b.classList.toggle('is-selected', on);
      b.setAttribute('aria-pressed', String(on));
    });
    const cloudEmpty = byId('cloud-empty');
    if (cloudEmpty) cloudEmpty.hidden = !!state.cloud;
    const axis = byId('cloud-axis');
    if (axis) axis.hidden = !state.cloud;
  }

  /* -------------------------------------------------------------------------
     深度点云：/camera/depth/image_raw（16UC1）→ 浏览器 WebGL 点云
     只在 map 页「深度点云」视图打开时订阅，1 Hz，降采样约 3.4 万点。
     ------------------------------------------------------------------------- */
  const cloudView = {
    gl: null,
    program: null,
    buffer: null,
    count: 0,
    canvas: null,
    yaw: Math.PI,
    pitch: 0.35,
    dist: 4,
    target: [0, 0, 2],
    autoFrame: true,
    dragging: false,
    lastX: 0,
    lastY: 0
  };

  function mat4Perspective(fovy, aspect, near, far) {
    const f = 1 / Math.tan(fovy / 2);
    const nf = 1 / (near - far);
    return new Float32Array([
      f / aspect, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (far + near) * nf, -1,
      0, 0, 2 * far * near * nf, 0
    ]);
  }

  function mat4LookAt(eye, center, up) {
    let z0 = eye[0] - center[0];
    let z1 = eye[1] - center[1];
    let z2 = eye[2] - center[2];
    let len = Math.hypot(z0, z1, z2) || 1;
    z0 /= len;
    z1 /= len;
    z2 /= len;
    let x0 = up[1] * z2 - up[2] * z1;
    let x1 = up[2] * z0 - up[0] * z2;
    let x2 = up[0] * z1 - up[1] * z0;
    len = Math.hypot(x0, x1, x2) || 1;
    x0 /= len;
    x1 /= len;
    x2 /= len;
    const y0 = z1 * x2 - z2 * x1;
    const y1 = z2 * x0 - z0 * x2;
    const y2 = z0 * x1 - z1 * x0;
    return new Float32Array([
      x0, y0, z0, 0,
      x1, y1, z1, 0,
      x2, y2, z2, 0,
      -(x0 * eye[0] + x1 * eye[1] + x2 * eye[2]),
      -(y0 * eye[0] + y1 * eye[1] + y2 * eye[2]),
      -(z0 * eye[0] + z1 * eye[1] + z2 * eye[2]),
      1
    ]);
  }

  function cloudShader(gl, type, source) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, source);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      gl.deleteShader(sh);
      return null;
    }
    return sh;
  }

  function initCloudGL(canvas) {
    const gl = canvas.getContext('webgl', { alpha: false, antialias: true, preserveDrawingBuffer: true });
    if (!gl) return null;
    const vs = cloudShader(
      gl,
      gl.VERTEX_SHADER,
      `attribute vec4 aPos;
       uniform mat4 uProj;
       uniform mat4 uView;
       varying float vDepth;
       void main() {
         vDepth = aPos.w;
         gl_Position = uProj * uView * vec4(aPos.xyz, 1.0);
         gl_PointSize = 4.0;
       }`
    );
    const fs = cloudShader(
      gl,
      gl.FRAGMENT_SHADER,
      `precision mediump float;
       varying float vDepth;
       uniform float uMin;
       uniform float uMax;
       void main() {
         float t = clamp((vDepth - uMin) / max(uMax - uMin, 0.001), 0.0, 1.0);
         vec3 nearC = vec3(0.95, 0.25, 0.12);
         vec3 farC = vec3(0.18, 0.45, 0.95);
         vec3 c = mix(nearC, farC, t);
         vec2 p = gl_PointCoord - 0.5;
         if (dot(p, p) > 0.25) discard;
         gl_FragColor = vec4(c, 0.9);
       }`
    );
    if (!vs || !fs) return null;
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return null;
    }
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    const buffer = gl.createBuffer();
    gl.useProgram(program);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    cloudView.gl = gl;
    cloudView.program = program;
    cloudView.buffer = buffer;
    cloudView.canvas = canvas;
    return gl;
  }

  function startCloudView() {
    if (state.route !== 'map' || state.mapView !== 'points') return;
    const canvas = byId('cloud-canvas');
    if (!canvas) return;
    if (cloudView.canvas !== canvas) {
      cloudView.canvas = canvas;
      cloudView.gl = null;
      cloudView.program = null;
      cloudView.buffer = null;
      if (!initCloudGL(canvas)) {
        const empty = byId('cloud-empty');
        if (empty) empty.textContent = '浏览器不支持 WebGL';
        return;
      }
      canvas.addEventListener('pointerdown', (e) => {
        cloudView.dragging = true;
        cloudView.autoFrame = false;
        cloudView.lastX = e.clientX;
        cloudView.lastY = e.clientY;
        try {
          canvas.setPointerCapture(e.pointerId);
        } catch (err) {
          void err;
        }
      });
      canvas.addEventListener('pointermove', (e) => {
        if (!cloudView.dragging) return;
        cloudView.yaw -= (e.clientX - cloudView.lastX) * 0.01;
        cloudView.pitch = clamp(cloudView.pitch + (e.clientY - cloudView.lastY) * 0.01, -1.2, 1.2);
        cloudView.lastX = e.clientX;
        cloudView.lastY = e.clientY;
        drawCloud();
      });
      const end = () => {
        cloudView.dragging = false;
      };
      canvas.addEventListener('pointerup', end);
      canvas.addEventListener('pointercancel', end);
      canvas.addEventListener(
        'wheel',
        (e) => {
          e.preventDefault();
          cloudView.autoFrame = false;
          cloudView.dist = clamp(cloudView.dist * (1 + e.deltaY * 0.001), 0.6, 20);
          drawCloud();
        },
        { passive: false }
      );
    }
    rosSubscribe('/camera/depth/image_raw', ROS_TYPES.depth, 1000);
    const empty = byId('cloud-empty');
    if (empty) empty.hidden = !!state.cloud;
    if (state.cloud && state.cloud.points) uploadCloud(state.cloud);
    drawCloud();
  }

  function stopCloudView() {
    if (ros.subs.has('/camera/depth/image_raw')) rosUnsubscribe('/camera/depth/image_raw');
    cloudView.canvas = null;
    cloudView.gl = null;
    cloudView.program = null;
    cloudView.buffer = null;
    cloudView.count = 0;
  }

  function onDepth(msg) {
    if (!cloudView.gl || !cloudView.canvas) return;
    if (state.route !== 'map' || state.mapView !== 'points') return;
    const data = msg && msg.data;
    if (typeof data !== 'string') return;
    const w = Number(msg.width) || 0;
    const h = Number(msg.height) || 0;
    const step = Number(msg.step) || w * 2;
    if (!w || !h) return;
    let bin;
    try {
      const raw = atob(data);
      bin = new Uint8Array(raw.length);
      for (let i = 0; i < raw.length; i++) bin[i] = raw.charCodeAt(i);
    } catch (err) {
      void err;
      return;
    }
    const u16 = new Uint16Array(bin.buffer, bin.byteOffset, Math.floor(bin.byteLength / 2));
    const row = Math.max(w, Math.floor(step / 2));
    const c = state.camInfo || { fx: 580.572, fy: 580.572, cx: 322.809, cy: 243.061, width: w, height: h };
    const fx = c.fx || 580.572;
    const fy = c.fy || 580.572;
    const cx = c.cx || 322.809;
    const cy = c.cy || 243.061;
    const ds = Math.max(2, Math.round(Math.sqrt((w * h) / 30000)));
    const positions = [];
    const depths = [];
    let min = Infinity;
    let max = -Infinity;
    let sx = 0;
    let sy = 0;
    let sz = 0;
    for (let v = 0; v < h; v += ds) {
      for (let u = 0; u < w; u += ds) {
        const raw = u16[v * row + u];
        if (!raw || raw < 300 || raw > 8000) continue;
        const z = raw / 1000;
        const x = ((u - cx) * z) / fx;
        const y = ((v - cy) * z) / fy;
        positions.push(x, -y, z);
        depths.push(z);
        sx += x;
        sy += -y;
        sz += z;
        if (z < min) min = z;
        if (z > max) max = z;
      }
    }
    const count = depths.length;
    if (!count) return;
    const cloud = {
      count,
      min,
      max,
      points: new Float32Array(count * 4),
      at: Date.now()
    };
    for (let i = 0; i < count; i++) {
      cloud.points[i * 4] = positions[i * 3];
      cloud.points[i * 4 + 1] = positions[i * 3 + 1];
      cloud.points[i * 4 + 2] = positions[i * 3 + 2];
      cloud.points[i * 4 + 3] = depths[i];
    }
    if (cloudView.autoFrame) {
      cloudView.target = [sx / count, sy / count, sz / count];
      cloudView.dist = clamp(Math.max(1.8, (max - min) * 1.1), 1.5, 12);
      cloudView.yaw = Math.PI - 0.55;
      cloudView.pitch = 0.38;
    }
    state.cloud = cloud;
    uploadCloud(cloud);
    drawCloud();
    const empty = byId('cloud-empty');
    if (empty) empty.hidden = true;
    syncScanUI();
  }

  function uploadCloud(cloud) {
    const gl = cloudView.gl;
    if (!gl || !cloudView.buffer) return;
    gl.bindBuffer(gl.ARRAY_BUFFER, cloudView.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, cloud.points, gl.DYNAMIC_DRAW);
    cloudView.count = cloud.count;
  }

  function drawCloud() {
    const gl = cloudView.gl;
    const can = cloudView.canvas;
    if (!gl || !can || !cloudView.program) return;
    const box = can.getBoundingClientRect();
    if (!box.width || !box.height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(box.width * dpr);
    const h = Math.round(box.height * dpr);
    if (can.width !== w || can.height !== h) {
      can.width = w;
      can.height = h;
    }
    gl.viewport(0, 0, w, h);
    gl.clearColor(0.067, 0.075, 0.094, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    if (!cloudView.count) return;
    const glp = cloudView.program;
    gl.useProgram(glp);
    const proj = mat4Perspective((45 * Math.PI) / 180, box.width / box.height, 0.05, 60);
    const cp = Math.cos(cloudView.pitch);
    const eye = [
      cloudView.target[0] + cloudView.dist * cp * Math.sin(cloudView.yaw),
      cloudView.target[1] + cloudView.dist * Math.sin(cloudView.pitch),
      cloudView.target[2] + cloudView.dist * cp * Math.cos(cloudView.yaw)
    ];
    const view = mat4LookAt(eye, cloudView.target, [0, 1, 0]);
    const uProj = gl.getUniformLocation(glp, 'uProj');
    const uView = gl.getUniformLocation(glp, 'uView');
    const uMin = gl.getUniformLocation(glp, 'uMin');
    const uMax = gl.getUniformLocation(glp, 'uMax');
    gl.uniformMatrix4fv(uProj, false, proj);
    gl.uniformMatrix4fv(uView, false, view);
    const cloud = state.cloud;
    gl.uniform1f(uMin, cloud ? cloud.min : 0.5);
    gl.uniform1f(uMax, cloud ? cloud.max : 3);
    gl.bindBuffer(gl.ARRAY_BUFFER, cloudView.buffer);
    const attr = gl.getAttribLocation(glp, 'aPos');
    gl.enableVertexAttribArray(attr);
    gl.vertexAttribPointer(attr, 4, gl.FLOAT, false, 16, 0);
    gl.drawArrays(gl.POINTS, 0, cloudView.count);
  }

  function syncRangeButtons() {
    document.querySelectorAll('[data-lidar-range]').forEach((b) => {
      const on = Number(b.dataset.lidarRange) === state.lidarRange;
      b.classList.toggle('is-selected', on);
      b.setAttribute('aria-pressed', String(on));
    });
  }

  function bindControl() {
    const frame = byId('video-frame');
    if (!frame) return;

    /* 救援功能开关只出现在实时画面模式。识别算法还没接入，
       这两个开关目前只记录算法启用状态（开关自身的选中态就是反馈）。 */
    const smoke = byId('toggle-smoke');
    const degrade = byId('toggle-degrade');
    const syncSwitches = () => {
      if (smoke) state.smoke = smoke.checked;
      if (degrade) state.degrade = degrade.checked;
    };
    if (smoke) {
      smoke.checked = state.smoke;
      smoke.addEventListener('change', syncSwitches);
    }
    if (degrade) {
      degrade.checked = state.degrade;
      degrade.addEventListener('change', syncSwitches);
    }
    syncSwitches();

    /* 画面来源：彩色 / 深度 / 红外 */
    const sources = document.querySelector('.video-sources');
    if (sources) {
      sources.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-cam]');
        if (btn) setCamSource(btn.dataset.cam);
      });
    }

    /* 画面工具：截图、录屏、实时画面 / 地图切换 */
    const toggleRec = () => {
      state.rec = state.rec ? 0 : Date.now();
      const chip = byId('video-rec');
      const btn = byId('rec-btn');
      if (chip) chip.hidden = !state.rec;
      if (btn) {
        btn.classList.toggle('is-on', !!state.rec);
        btn.title = state.rec ? '停止录屏' : '录屏';
        btn.setAttribute('aria-label', btn.title);
      }
      syncTimers();
      toast(state.rec ? '开始录屏（模拟）' : '录屏已停止');
    };

    const tools = document.querySelector('.video-tools');
    if (tools) {
      tools.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn || btn.disabled) return;
        if (btn.id === 'shot-btn') {
          captureFrame();
        } else if (btn.id === 'rec-btn') {
          toggleRec();
        } else if (btn.id === 'view-toggle') {
          switchView(state.view === 'map' ? 'live' : 'map');
        }
      });
    }

    /* 发布任务 */
    const taskBox = document.querySelector('.panel--task');
    if (taskBox) {
      const name = byId('task-name');
      if (name) name.addEventListener('input', () => { state.taskName = name.value; });
      taskBox.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn || btn.disabled) return;
        if (btn.id === 'task-start') startTask();
        else if (btn.id === 'task-stop') endTask();
        else if (btn.id === 'task-save') saveTaskLog();
      });
    }

    /* 麦克纳姆：按住才动，松开/离开盘面立即停 */
    const pad = document.querySelector('.panel--drive');
    if (pad) {
      pad.addEventListener('pointerdown', (e) => {
        const btn = e.target.closest('[data-dir]');
        if (!btn || btn.disabled) return;
        e.preventDefault();
        if (btn.dataset.dir === 'stop') {
          stopDrive('stop');
          return;
        }
        driveCommand(btn.dataset.dir);
      });
      pad.addEventListener('pointerup', () => stopDrive('pointerup'));
      pad.addEventListener('pointercancel', () => stopDrive('pointercancel'));
      pad.addEventListener('pointerleave', () => {
        if (drive.active) stopDrive('leave');
      });
      pad.addEventListener('click', (e) => {
        const modeBtn = e.target.closest('[data-mode]');
        if (!modeBtn) return;
        drive.mode = modeBtn.dataset.mode === 'locked' ? 'locked' : 'manual';
        stopDrive('mode');
        pad.querySelectorAll('[data-mode]').forEach((b) => {
          const on = b.dataset.mode === drive.mode;
          b.classList.toggle('is-selected', on);
          b.setAttribute('aria-pressed', String(on));
        });
        syncDriveAvailability();
        toast(drive.mode === 'locked' ? '已锁止操纵' : '已切回手动');
      });
    }

    const slider = byId('speed-limit');
    if (slider) {
      slider.value = String(state.speed);
      slider.addEventListener('input', () => {
        state.speed = Number(slider.value);
        const out = byId('speed-value');
        if (out) out.innerHTML = `${state.speed.toFixed(2)} <small>m/s</small>`;
        if (drive.active) {
          state.cmd = driveVector(drive.dir);
          publishDrive();
        }
        syncDriveUI();
      });
    }

    const estop = byId('estop');
    if (estop) {
      estop.addEventListener('click', () => {
        drive.estop = !drive.estop;
        if (drive.estop) {
          stopDrive('estop');
          toast('急停已锁定，再按一次解除');
        } else {
          toast('急停已解除');
        }
        syncDriveAvailability();
      });
    }
    syncDriveAvailability();

    /* 录屏计时与任务计时：每秒刷新一次，只在有对应状态时写 DOM */
    clearInterval(state.uiTimer);
    state.uiTimer = setInterval(syncTimers, 1000);
  }

  /* 实时画面 / 雷达只换一次渲染：任务与算法开关都留在 state 里。 */
  function switchView(mode) {
    stopDrive('switchView');
    state.view = mode;
    render();
    bindControl();
    toast(mode === 'map' ? '已切换到雷达扫描' : '已切回实时画面');
  }

  function startTask() {
    const input = byId('task-name');
    const typed = (input ? input.value : state.taskName).trim();
    const now = Date.now();
    const name = typed || `未命名任务 ${clockText(now)}`;
    state.taskName = name;
    state.task = {
      name,
      id: `task-${now.toString(36)}`,
      started: now,
      ended: 0,
      saved: false,
      startDistance: state.distance,
      startBattery: batteryPct(),
      startVoltage: state.voltage
    };
    render();
    bindControl();
    toast(`任务已开始：${name}`);
  }

  function endTask() {
    if (!state.task || state.task.ended) return;
    state.task.ended = Date.now();
    render();
    bindControl();
    toast('任务已结束，可保存救援日志');
  }

  /* 保存救援日志：能拿到的实测值写进去，拿不到的字段保留 —。 */
  function saveTaskLog() {
    const t = state.task;
    if (!t || t.saved) return;
    const end = t.ended || Date.now();
    t.ended = end;
    t.saved = true;
    const minutes = Math.max(1, Math.round((end - t.started) / 60000));
    const dist = Math.max(0, state.distance - (Number(t.startDistance) || 0));
    const startPct = t.startBattery;
    const endPct = batteryPct();
    const batteryDelta =
      startPct == null || endPct == null ? '—' : `${Math.round(startPct)}% → ${Math.round(endPct)}%`;
    RESCUE_LOGS.unshift({
      id: t.id,
      name: t.name,
      note: '控制中心保存 · 电压与里程来自实测，其余未提供',
      date: dateText(t.started),
      time: `${clockText(t.started)} - ${clockText(end)}`,
      status: '已完成',
      location: '—',
      team: '地面救援单元 01',
      weather: '—',
      metrics: [
        ['行驶里程', `${dist.toFixed(1)} m（/vel_raw 估算）`],
        ['行动时长', `${minutes} min`],
        ['电量变化', batteryDelta],
        ['最远深入', '—（无 /odom）']
      ],
      timeline: [
        [clockText(t.started), `任务开始：${t.name}`, 'ok'],
        [clockText(end), `任务结束，保存救援日志（截图 ${state.shots} 张 · 里程 ${dist.toFixed(1)} m）`, 'ok']
      ],
      attachments: [['任务记录', `${t.id}.json`]]
    });
    render();
    bindControl();
    toast('已保存救援日志');
  }

  function syncTimers() {
    const rec = byId('rec-time');
    if (rec && state.rec) rec.textContent = durText(Date.now() - state.rec);
    const el = byId('task-elapsed');
    if (el && state.task) el.textContent = durText((state.task.ended || Date.now()) - state.task.started);
  }
  /* 调试项是一组互斥按钮：点谁谁选中，整页只有这一个交互。 */
  function bindFeature() {
    const f = FEATURE_BY_ID[state.feature];
    const bar = document.querySelector('.clip-bar');
    if (!f || !bar) return;
    bar.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-clip]');
      if (!btn) return;
      state.clip[f.id] = btn.dataset.clip;
      bar.querySelectorAll('[data-clip]').forEach((b) => {
        const on = b === btn;
        b.classList.toggle('is-selected', on);
        b.setAttribute('aria-pressed', String(on));
      });
    });
  }

  function parseHash() {
    const raw = (location.hash || '').replace(/^#\/?/, '').split('?')[0];
    const parts = raw.split('/').filter(Boolean);
    const feature = FEATURE_BY_ID[parts[0]];
    if (feature) return { route: 'feature', feature: feature.id, logId: '' };
    if (parts[0] === 'log' && parts[1] && rescueLogById(parts[1])) {
      return { route: 'logDetail', feature: '', logId: parts[1] };
    }
    if (NAV.some((n) => n.id === parts[0])) return { route: parts[0], feature: '', logId: '' };
    return { route: 'control', feature: '', logId: '' };
  }

  function onHashChange() {
    const next = parseHash();
    if (next.route === state.route && next.feature === state.feature && next.logId === state.logId && byId('view').children.length) return;
    state.route = next.route;
    state.feature = next.feature;
    state.logId = next.logId;
    render();
    if (next.route === 'feature') bindFeature();
    if (next.route === 'control') bindControl();
    if (next.route === 'connect') bindConnect();
    if (next.route === 'machine') bindMachine();
  }

  let unitCardHTML = '';
  let cardHeight = 0;
  let cardTimer = 0;

  function rememberCardHeight() {
    const card = byId('unit-card');
    if (card && card.offsetHeight) cardHeight = card.offsetHeight;
  }

  function insertCard() {
    if (document.body.classList.contains('side-collapsed') || byId('unit-card') || !unitCardHTML) return;
    const side = document.querySelector('.sidebar');
    const box = document.createElement('div');
    box.innerHTML = unitCardHTML;
    const node = box.firstElementChild;
    if (!side || !node) return;
    node.style.display = 'none';
    side.appendChild(node);
    renderUnitCard();
    return node;
  }

  function revealCard(node) {
    if (!node || document.body.classList.contains('side-collapsed')) return;
    node.style.display = '';
    node.classList.add('is-in');
    node.addEventListener('animationend', () => node.classList.remove('is-in'), { once: true });
  }

  function applyCollapsed(on) {
    const open = !!on;
    clearTimeout(cardTimer);
    if (open) {
      rememberCardHeight();
      const card = byId('unit-card');
      if (card) card.remove();
    }
    document.body.classList.toggle('side-collapsed', open);
    if (!open) {
      const node = insertCard();
      cardTimer = setTimeout(() => revealCard(node), 360);
    }
    const btn = byId('side-toggle');
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? '展开导航' : '收起导航');
    try {
      localStorage.setItem('x3.sideCollapsed', open ? '1' : '0');
    } catch (err) {
      void err;
    }
  }

  function subscribeToggle() {
    const btn = byId('side-toggle');
    if (!btn || btn.dataset.bound === '1') return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', () => {
      applyCollapsed(!document.body.classList.contains('side-collapsed'));
    });
  }

  function init() {
    const first = parseHash();
    state.route = first.route;
    state.feature = first.feature;
    state.logId = first.logId || '';
    /* 记住上次看的是哪一路画面 */
    try {
      const savedCam = localStorage.getItem('x3.camSrc');
      if (CAM_SOURCES[savedCam]) state.camSrc = savedCam;
    } catch (err) {
      void err;
    }
    render();
    if (state.route === 'feature') bindFeature();
    if (state.route === 'control') bindControl();
    if (state.route === 'connect') bindConnect();
    if (state.route === 'machine') bindMachine();

    const card = byId('unit-card');
    unitCardHTML = card ? card.outerHTML : '';
    rememberCardHeight();
    if (window.ResizeObserver) {
      const ro = new ResizeObserver(() => {
        if (byId('unit-card')) rememberCardHeight();
      });
      ro.observe(document.querySelector('.sidebar'));
    }

    let collapsed = false;
    try {
      collapsed = localStorage.getItem('x3.sideCollapsed') === '1';
    } catch (err) {
      void err;
    }
    if (collapsed) {
      rememberCardHeight();
      card.remove();
      document.body.classList.add('side-collapsed');
      const btn = byId('side-toggle');
      btn.setAttribute('aria-expanded', 'true');
      btn.setAttribute('aria-label', '展开导航');
    } else if (card) {
      card.id = 'unit-card';
    }
    subscribeToggle();

    window.addEventListener('hashchange', onHashChange);

    byId('nav-toggle').addEventListener('click', () => {
      const open = document.body.classList.toggle('nav-open');
      byId('nav-toggle').setAttribute('aria-expanded', String(open));
      byId('scrim').hidden = !open;
    });
    byId('scrim').addEventListener('click', () => {
      document.body.classList.remove('nav-open');
      byId('nav-toggle').setAttribute('aria-expanded', 'false');
      byId('scrim').hidden = true;
    });

    /* 全局安全监听：松开指针、失焦、页面隐藏、离开页面都立刻停车 */
    window.addEventListener('pointerup', () => stopDrive('pointerup'), true);
    window.addEventListener('pointercancel', () => stopDrive('pointercancel'), true);
    window.addEventListener('blur', () => {
      stopDrive('blur');
      releaseBuzzer();
    });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopDrive('hidden');
        releaseBuzzer();
      }
    });
    window.addEventListener('pagehide', () => {
      stopDrive('pagehide');
      releaseBuzzer();
    });
    window.addEventListener('online', () => {
      if (!ros.manual && state.link !== 'connected') rosConnect();
    });
    window.addEventListener('offline', () => stopDrive('offline'));

    /* 地图页/雷达模式的视图、量程和截图按钮：一次委托，避免每页重复绑定 */
    document.addEventListener('click', (e) => {
      const viewBtn = e.target.closest('[data-map-view]');
      if (viewBtn) {
        const next = viewBtn.dataset.mapView;
        if (next && next !== state.mapView) {
          state.mapView = next;
          render();
        }
        return;
      }
      const rangeBtn = e.target.closest('[data-lidar-range]');
      if (rangeBtn) {
        state.lidarRange = Number(rangeBtn.dataset.lidarRange) || SCAN_RANGE_DEFAULT;
        syncRangeButtons();
        drawLidar();
        syncScanUI();
        return;
      }
      const shot = e.target.closest('[data-shot]');
      if (shot) captureFrame();
    });

    /* 300 ms 刷新实时数值与 HUD；不重建页面 DOM */
    setInterval(syncLive, 300);
    startRos();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
