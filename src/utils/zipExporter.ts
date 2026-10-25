import JSZip from 'jszip';
import { PROJECT_FILES } from '../data/projectFiles';

/**
 * Bundles all standalone PHP, MySQL, CSS, and Markdown project files
 * directly into the root of the ZIP archive.
 * 
 * When extracted into C:\xampp\htdocs\student-management-system\,
 * index.php lands directly in that folder, preventing accidental double-folder nesting.
 */
export async function downloadProjectZip(): Promise<void> {
  const zip = new JSZip();

  // Populate files directly so index.php is at the root of the extracted folder
  for (const file of PROJECT_FILES) {
    zip.file(file.path, file.content);
  }

  // Generate blob and trigger download
  const blob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });

  const downloadUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = 'student-management-system.zip';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(downloadUrl);
}
