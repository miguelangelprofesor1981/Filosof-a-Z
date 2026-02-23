/**
 * Google Drive Service for Filosofía Z
 * Handles fetching files from a specific folder and OAuth2 flow.
 */

const FOLDER_ID = import.meta.env.VITE_GOOGLE_DRIVE_FOLDER_ID || '1_5cStQJHIKfEVyBhAI6TA8fZQOUQG4mZ';
const API_KEY = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY;
const CLIENT_ID = import.meta.env.VITE_GOOGLE_DRIVE_CLIENT_ID;

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
  description?: string;
  webViewLink?: string;
  webContentLink?: string;
  category?: string;
}

/**
 * Cleans the file title by removing extensions and technical prefixes.
 */
export function cleanTitle(name: string): string {
  // Remove extensions
  let title = name.replace(/\.(pdf|docx|doc|txt|epub|mp4|mov|avi)$/i, '');
  
  // Remove common prefixes like "Filosofía Estética - " or "01 - " or "A - "
  title = title.replace(/^([A-Z\d]+[\s.-]+|Filosofía|Antropología|Introducción|Cátedra|Libro|Texto|Documento)\s*[^-\n]*-\s*/i, '');
  
  // Remove anything in brackets or parentheses at the end (often metadata)
  title = title.replace(/\s*[\[\(].*?[\]\)]\s*$/g, '');
  
  // Remove underscores and replace with spaces
  title = title.replace(/_/g, ' ');

  return title.trim();
}

/**
 * Maps files to categories based on their content or name.
 */
export function categorizeFile(file: DriveFile): string {
  const name = file.name.toLowerCase();
  
  if (name.includes('gustos') || name.includes('barthes') || name.includes('estética')) {
    return 'Estética y Cultura Pop';
  }
  if (name.includes('punk') || name.includes('clash') || name.includes('rebelión')) {
    return 'Filosofía y Rebelión';
  }
  if (name.includes('spiderman') || name.includes('héroe') || name.includes('mitología')) {
    return 'Antropología y Nuevas Mitologías';
  }
  if (name.includes('guía') || name.includes('vulgar') || name.includes('crítico') || name.includes('conceptual')) {
    return 'Introducción Conceptual';
  }
  
  return 'General';
}

/**
 * Fetches files from the specified Google Drive folder.
 */
export async function fetchDriveFiles(accessToken?: string): Promise<DriveFile[]> {
  // Check if API_KEY is valid (not undefined, empty, or a placeholder)
  const isValidApiKey = API_KEY && API_KEY !== 'undefined' && API_KEY.length > 10;

  if (!isValidApiKey && !accessToken) {
    console.warn('Google Drive API Key or Access Token is missing or invalid. Please configure it in the Secrets panel.');
    return [];
  }

  // Include PDF, Word, and common video formats
  const q = `'${FOLDER_ID}' in parents and (mimeType = 'application/pdf' or mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' or mimeType = 'video/mp4' or mimeType = 'video/quicktime') and trashed = false`;
  const fields = 'files(id, name, mimeType, thumbnailLink, description, webViewLink, webContentLink)';
  
  const url = new URL('https://www.googleapis.com/drive/v3/files');
  url.searchParams.append('q', q);
  url.searchParams.append('fields', fields);
  
  if (accessToken) {
    url.searchParams.append('access_token', accessToken);
  } else if (isValidApiKey) {
    url.searchParams.append('key', API_KEY);
  } else {
    return []; // Should not reach here due to check above, but for safety
  }

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      const error = await response.json();
      const message = error.error?.message || 'Failed to fetch files from Google Drive';
      
      // If the API key is invalid, we don't want to throw a hard error that breaks the app
      if (message.includes('API key not valid')) {
        console.warn('Google Drive API Key is invalid. Falling back to empty library.');
        return [];
      }
      
      throw new Error(message);
    }
    
    const data = await response.json();
    return (data.files || []).map((file: any) => ({
      ...file,
      category: categorizeFile(file)
    }));
  } catch (error) {
    console.error('Error fetching Drive files:', error);
    // Return empty array instead of throwing to prevent app crash
    return [];
  }
}

/**
 * Initiates the OAuth2 flow to get an access token.
 */
export function loginWithGoogle(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!CLIENT_ID) {
      reject(new Error('Google Client ID is missing.'));
      return;
    }

    const callbackUrl = `${window.location.origin}/auth/callback`;
    const scope = 'https://www.googleapis.com/auth/drive.readonly';
    
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(callbackUrl)}&response_type=token&scope=${encodeURIComponent(scope)}`;
    
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    
    const popup = window.open(authUrl, 'google_login', `width=${width},height=${height},left=${left},top=${top}`);
    
    if (!popup) {
      reject(new Error('Popup blocked. Please allow popups for this site.'));
      return;
    }

    const checkPopup = setInterval(() => {
      try {
        if (!popup || popup.closed) {
          clearInterval(checkPopup);
          reject(new Error('Login cancelled by user.'));
          return;
        }

        if (popup.location.href.includes('access_token')) {
          const params = new URLSearchParams(popup.location.hash.substring(1));
          const token = params.get('access_token');
          if (token) {
            clearInterval(checkPopup);
            popup.close();
            resolve(token);
          }
        }
      } catch (e) {
        // Ignore cross-origin errors while the popup is on Google's domain
      }
    }, 500);
  });
}
