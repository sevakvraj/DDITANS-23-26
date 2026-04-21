import fs from 'fs';
import path from 'path';

const PHOTOS_DIR = './public/photos/Media_Vault';
const MEMORIES_FILE = './src/data/memories.json';

function getPhotosRecursive(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getPhotosRecursive(filePath));
        } else {
            // Filter image files
            if (/\.(jpg|jpeg|png|heic|JPG|PNG|HEIC)$/i.test(file)) {
                const relativePath = '/' + path.relative('./public', filePath).replace(/\\/g, '/');
                const category = path.basename(dir).replace(/_/g, ' ');
                results.push({
                    id: Date.now() + Math.random(),
                    src: relativePath,
                    category: category,
                    author: "Batch 2026",
                    caption: `${category} Memory`
                });
            }
        }
    });
    return results;
}

try {
    console.log('Scanning photos in:', PHOTOS_DIR);
    const newVault = getPhotosRecursive(PHOTOS_DIR);
    
    console.log(`Found ${newVault.length} photos.`);

    const memories = JSON.parse(fs.readFileSync(MEMORIES_FILE, 'utf8'));
    memories.vault = newVault;

    fs.writeFileSync(MEMORIES_FILE, JSON.stringify(memories, null, 2));
    console.log('Successfully updated memories.json');
} catch (err) {
    console.error('Error during re-indexing:', err);
}
