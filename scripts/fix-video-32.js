const fs = require('fs');
const path = require('path');

const mockVideosPath = path.join(__dirname, '../lib/data/mockVideos.ts');
let content = fs.readFileSync(mockVideosPath, 'utf8');

// Read the aspect ratios to find video-32 format
const aspectRatiosPath = path.join(__dirname, 'aspect-ratios.json');
const aspectRatios = JSON.parse(fs.readFileSync(aspectRatiosPath, 'utf8'));

// Check if video-32 exists and what format
const video32Path = path.join(__dirname, '../public/videos/thumbnails/');
const files = fs.readdirSync(video32Path);
const video32File = files.find(f => f.startsWith('video-32.'));

if (video32File && video32File.endsWith('.png')) {
  console.log('⚠️  video-32 使用 PNG 格式');
  console.log('建议：转换为 JPG 以保持一致性，或者更新代码处理 PNG');

  // Update the thumbnail path logic to handle both jpg and png
  const updateCode = `
      // 检测缩略图格式 (jpg 或 png)
      const thumbnailExt = videoNumber === 32 ? 'png' : 'jpg'
      thumbnail: \`/videos/thumbnails/video-\${videoNumber}.\${thumbnailExt}\`,`;

  console.log('\n可以在 mockVideos.ts 中使用以下代码处理不同格式:');
  console.log(updateCode);
} else {
  console.log('✅ video-32 已是 JPG 格式');
}
