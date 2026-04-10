import fs from 'fs/promises';
import path from 'path';

export const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')      
    .replace(/[^\w-]+/g, '')    
    .replace(/--+/g, '-');      
};


async function ensureDirectoryExists(dirPath: string) {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
}

async function saveBase64Image(base64Data: string, folderName: string, fileName: string): Promise<string> {

  const matches = base64Data.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    throw new Error('Invalid Base64 string format');
  }

  const type = matches[1];
  const data = matches[2];
  
  let extension = type.split('/')[1] || 'jpg';
  if (extension === 'jpeg') extension = 'jpg'; 

  const buffer = Buffer.from(data, 'base64');
  
  const publicDir = path.join(process.cwd(), 'public');
  const projectDir = path.join(publicDir, 'projects', folderName);
  const fullFileName = `${fileName}.${extension}`;
  const filePath = path.join(projectDir, fullFileName);
  const publicPath = `/projects/${folderName}/${fullFileName}`;

  await ensureDirectoryExists(projectDir);
  await fs.writeFile(filePath, buffer);

  return publicPath;
}

export async function uploadHeroImage(base64Data: string, projectTitle: string): Promise<string> {
  const slug = slugify(projectTitle);
  return await saveBase64Image(base64Data, slug, 'hero');
}
export async function uploadProjectImages(
  images: { url: string; order: number }[], 
  projectTitle: string
): Promise<{ path: string; order: number }[]> {
  const slug = slugify(projectTitle);
  const results: { path: string; order: number }[] = [];

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const publicPath = await saveBase64Image(img.url, slug, `gallery-${i + 1}`);
    results.push({
      path: publicPath,
      order: img.order
    });
  }

  return results;
}
