import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sizes = [16, 32, 48, 64, 96, 128, 192, 256, 384, 512];
const inputFile = path.join(__dirname, '../public/logo.svg');
const outputDir = path.join(__dirname, '../public');

async function generateIcons() {
  try {
    // Ensure the output directory exists
    await fs.mkdir(outputDir, { recursive: true });

    // Generate PNG icons
    for (const size of sizes) {
      await sharp(inputFile)
        .resize(size, size)
        .png()
        .toFile(path.join(outputDir, `logo${size}.png`));
      
      console.log(`Generated ${size}x${size} icon`);
    }

    // Generate special files
    await sharp(inputFile)
      .resize(64, 64)
      .png()
      .toFile(path.join(outputDir, 'favicon.png'));

    // Create ICO file for favicon
    await sharp(inputFile)
      .resize(32, 32)
      .toFile(path.join(outputDir, 'favicon.ico'));

    console.log('Icon generation complete!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons();
