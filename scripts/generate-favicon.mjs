import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logoPath = join(__dirname, '../public/logo.png');
const faviconPath = join(__dirname, '../app/favicon.ico');

async function generateFavicon() {
    try {
        // Generate a 32x32 PNG favicon (browsers also accept PNG for favicon)
        await sharp(logoPath)
            .resize(32, 32, {
                fit: 'contain',
                background: { r: 0, g: 0, b: 0, alpha: 0 }
            })
            .png()
            .toFile(join(__dirname, '../app/icon.png'));

        console.log('✅ Favicon generated successfully as icon.png');

        // Also generate larger sizes for different devices
        await sharp(logoPath)
            .resize(180, 180, {
                fit: 'contain',
                background: { r: 0, g: 0, b: 0, alpha: 0 }
            })
            .png()
            .toFile(join(__dirname, '../app/apple-icon.png'));

        console.log('✅ Apple icon generated successfully');

    } catch (error) {
        console.error('Error generating favicon:', error);
    }
}

generateFavicon();
