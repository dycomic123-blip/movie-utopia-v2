const fs = require('fs');
const path = require('path');

const aspectRatiosPath = path.join(__dirname, 'aspect-ratios.json');
const mockVideosPath = path.join(__dirname, '../lib/data/mockVideos.ts');

const aspectRatios = JSON.parse(fs.readFileSync(aspectRatiosPath, 'utf8'));

// Read the current file
let content = fs.readFileSync(mockVideosPath, 'utf8');

// 1. Remove old aspectRatios constant
content = content.replace(/const aspectRatios = \[16\/9, 9\/16, 21\/9\]/,
  '// Aspect ratios are now loaded from actual thumbnails');

// 2. Add aspect ratio mapping
const aspectRatioMap = `
const videoAspectRatios: Record<string, number> = ${JSON.stringify(
  Object.fromEntries(
    Object.entries(aspectRatios).map(([key, value]) => [key, value.aspectRatio])
  ),
  null,
  2
).split('\n').join('\n')}
`;

// Insert aspect ratio map after genres
content = content.replace(
  /(const genres = \['Action'.*?\] as const\n)/,
  `$1${aspectRatioMap}\n`
);

// 3. Update thumbnail path to use local thumbnails
content = content.replace(
  /thumbnail: `https:\/\/images\.unsplash\.com\/photo-\${unsplashIds\[index\]}\?w=800&q=80`,/,
  `thumbnail: \`/videos/thumbnails/video-\${videoNumber}.jpg\`,`
);

// 4. Update aspect ratio to use actual detected ratio
content = content.replace(
  /const randomAspectRatio = aspectRatios\[Math\.floor\(Math\.random\(\) \* aspectRatios\.length\)\]/,
  `const actualAspectRatio = videoAspectRatios[\`video-\${videoNumber}\`] || 16/9`
);

// 5. Replace randomAspectRatio with actualAspectRatio
content = content.replace(
  /aspectRatio: randomAspectRatio,/,
  `aspectRatio: actualAspectRatio,`
);

// Write back
fs.writeFileSync(mockVideosPath, content);

console.log('✅ 已更新 mockVideos.ts');
console.log('✓ 使用真实缩略图: /videos/thumbnails/video-X.jpg');
console.log('✓ 使用检测到的真实比例');
console.log(`✓ 共更新 ${Object.keys(aspectRatios).length} 个视频数据`);
