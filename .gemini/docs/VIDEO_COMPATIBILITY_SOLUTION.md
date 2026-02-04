# 跨系统视频播放兼容性解决方案

## 🎬 问题分析

### 当前状态
- 使用原生 `<video>` 标签
- 仅支持 MP4 格式
- type="video/mp4" 单一格式

### 兼容性问题
| 浏览器/系统 | MP4 (H.264) | WebM (VP9) | Ogg |
|------------|-------------|------------|-----|
| Chrome     | ✓           | ✓          | ✓   |
| Firefox    | ✓           | ✓          | ✓   |
| Safari     | ✓           | ✗          | ✗   |
| Edge       | ✓           | ✓          | ✗   |

## 💡 解决方案

### 方案 1: 多格式回退 (推荐) ⭐

```tsx
<video controls>
  {/* 主流格式 - H.264 编码的 MP4 */}
  <source src={video.videoUrl} type="video/mp4; codecs=avc1.4D401E,mp4a.40.2" />
  
  {/* 备用格式 - WebM (适用于 Chrome/Firefox) */}
  <source src={video.videoUrl.replace('.mp4', '.webm')} type="video/webm; codecs=vp9,opus" />
  
  {/* 降级提示 */}
  Your browser does not support the video tag.
</video>
```

**优点**：
- 兼容性好
- 浏览器自动选择最佳格式
- 无需额外库

**缺点**：
- 需要多个格式的视频文件
- 存储成本增加

### 方案 2: 使用专业视频播放器库 (最佳方案) 🏆

#### 2.1 Video.js
```bash
npm install video.js @types/video.js
```

```tsx
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export function VideoPlayer({ video }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (!playerRef.current && videoRef.current) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        autoplay: true,
        preload: 'auto',
        fluid: true, // 响应式
        sources: [{
          src: video.videoUrl,
          type: 'video/mp4'
        }]
      });
    }
    
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [video.videoUrl]);

  return (
    <div data-vjs-player>
      <video
        ref={videoRef}
        className="video-js vjs-big-play-centered"
      />
    </div>
  );
}
```

**优点**：
- 跨浏览器一致性
- 丰富的插件生态
- 自适应流媒体支持 (HLS, DASH)
- 移动端优化

#### 2.2 Plyr (更现代化)
```bash
npm install plyr plyr-react
```

```tsx
import Plyr from 'plyr-react';
import 'plyr-react/plyr.css';

export function VideoPlayer({ video }: VideoPlayerProps) {
  const plyrProps = {
    source: {
      type: 'video' as const,
      sources: [
        {
          src: video.videoUrl,
          type: 'video/mp4',
        },
      ],
    },
    options: {
      controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
      ratio: '16:9',
    },
  };

  return <Plyr {...plyrProps} />;
}
```

**优点**：
- 更现代化的 UI
- 更小的包体积
- YouTube/Vimeo 支持

### 方案 3: 视频格式优化建议

#### 编码设置
```bash
# 使用 FFmpeg 生成兼容性最好的 MP4
ffmpeg -i input.mp4 \
  -c:v libx264 \
  -profile:v high \
  -level 4.0 \
  -pix_fmt yuv420p \
  -c:a aac \
  -b:a 128k \
  -movflags +faststart \
  output.mp4
```

**参数说明**：
- `libx264`: H.264 编码器
- `profile:v high`: 高兼容性编码配置
- `yuv420p`: 像素格式 (Safari 必需)
- `movflags +faststart`: 流式播放优化

#### 生成 WebM 备用
```bash
ffmpeg -i input.mp4 \
  -c:v libvpx-vp9 \
  -crf 30 \
  -b:v 0 \
  -c:a libopus \
  output.webm
```

## 🔧 推荐实施方案

### 短期方案 (立即可用)
1. 优化 MP4 编码格式
2. 添加 codecs 参数明确编解码器

### 中期方案 (1-2周)
1. 集成 Plyr 播放器
2. 添加响应式视频容器
3. 添加加载状态和错误处理

### 长期方案 (1-2月)
1. 视频转码服务
2. 多格式存储
3. CDN 加速
4. 自适应码率 (HLS)

## 📱 移动端特殊处理

```tsx
// 检测移动设备
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

<video
  controls
  playsInline  // iOS 内联播放
  webkit-playsinline="true"  // 旧版 iOS
  preload={isMobile ? 'metadata' : 'auto'}  // 移动端节省流量
>
```

## ✅ 测试清单

- [ ] Chrome (Windows/Mac/Linux)
- [ ] Safari (Mac/iOS)
- [ ] Firefox (Windows/Mac)
- [ ] Edge (Windows)
- [ ] Mobile Safari (iPhone)
- [ ] Chrome Mobile (Android)
