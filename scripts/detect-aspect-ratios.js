const fs = require('fs');
const path = require('path');
const { imageSize } = require('image-size');

const thumbnailsDir = path.join(__dirname, '../public/videos/thumbnails');
const outputFile = path.join(__dirname, 'aspect-ratios.json');

async function detectAspectRatios() {
  const files = fs.readdirSync(thumbnailsDir);
  const results = {};

  files.forEach(file => {
    if (file.match(/\.(jpg|jpeg|png|webp)$/i)) {
      const filePath = path.join(thumbnailsDir, file);
      const videoId = file.replace(/\.(jpg|jpeg|png|webp)$/i, '');

      try {
        const buffer = fs.readFileSync(filePath);
        const dimensions = imageSize(buffer);
        const aspectRatio = (dimensions.width / dimensions.height).toFixed(4);

        results[videoId] = {
          width: dimensions.width,
          height: dimensions.height,
          aspectRatio: parseFloat(aspectRatio),
          orientation: dimensions.width > dimensions.height ? '横屏' : '竖屏'
        };

        console.log(`✓ ${videoId}: ${dimensions.width}x${dimensions.height} (${aspectRatio}) ${results[videoId].orientation}`);
      } catch (error) {
        console.error(`✗ ${videoId}: 无法读取图片`, error.message);
      }
    }
  });

  fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
  console.log(`\n✅ 已保存到: ${outputFile}`);
  console.log(`📊 共检测到 ${Object.keys(results).length} 个缩略图`);

  return results;
}

detectAspectRatios();
