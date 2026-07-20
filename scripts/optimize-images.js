/**
 * 图片批量压缩脚本
 * 将 public/images/ 下的 PNG/JPEG 转换为 WebP，并删除原图以节省体积
 * 用法：node scripts/optimize-images.js
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGES_DIR = path.resolve(__dirname, '../public/images');
const ALLOWED_EXTS = new Set(['.png', '.jpg', '.jpeg']);

let totalOriginal = 0;
let totalOptimized = 0;
let processed = 0;
let errors = 0;

async function processFile(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    if (!ALLOWED_EXTS.has(ext)) return;

    const dir = path.dirname(filePath);
    const baseName = path.basename(filePath, ext);
    const outputPath = path.join(dir, `${baseName}.webp`);

    // 如果 webp 已存在则跳过
    if (fs.existsSync(outputPath)) {
        console.log(`  跳过（已存在）: ${path.relative(IMAGES_DIR, outputPath)}`);
        return;
    }

    const originalSize = fs.statSync(filePath).size;

    try {
        await sharp(filePath)
            .webp({ quality: 80, effort: 4 })
            .toFile(outputPath);

        const optimizedSize = fs.statSync(outputPath).size;
        const ratio = ((1 - optimizedSize / originalSize) * 100).toFixed(1);

        totalOriginal += originalSize;
        totalOptimized += optimizedSize;
        processed++;

        console.log(
            `  ✓ ${path.relative(IMAGES_DIR, filePath)} → ${path.relative(IMAGES_DIR, outputPath)} ` +
            `(${formatBytes(originalSize)} → ${formatBytes(optimizedSize)}, -${ratio}%)`
        );

        // 删除原图
        fs.unlinkSync(filePath);
    } catch (err) {
        errors++;
        console.error(`  ✗ 失败: ${path.relative(IMAGES_DIR, filePath)} — ${err.message}`);
    }
}

function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

async function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            await walk(fullPath);
        } else {
            await processFile(fullPath);
        }
    }
}

(async () => {
    console.log('开始扫描并压缩图片...\n');
    await walk(IMAGES_DIR);

    console.log('\n----------------------------------------');
    console.log(`处理完成：${processed} 张成功，${errors} 张失败`);
    if (processed > 0) {
        const ratio = ((1 - totalOptimized / totalOriginal) * 100).toFixed(1);
        console.log(`原始体积：${formatBytes(totalOriginal)}`);
        console.log(`压缩后体积：${formatBytes(totalOptimized)}`);
        console.log(`节省：${ratio}%`);
    }
    console.log('----------------------------------------');
    console.log('\n提示：请手动将 js/data/ 中的图片引用从 .png/.jpg/.jpeg 改为 .webp');
})();
