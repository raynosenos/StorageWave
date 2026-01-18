import { createSignal, createContext, useContext } from 'solid-js'

// Theme context for dark mode
const ThemeContext = createContext()

export const ThemeProvider = (props) => {
    return (
        <ThemeContext.Provider value={props.value}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        // Fallback if used outside provider
        return {
            isDark: () => false,
            toggleTheme: () => { }
        }
    }
    return context
}

// File type utilities
const FILE_ICONS = {
    // Images
    jpg: '🖼️',
    jpeg: '🖼️',
    png: '🖼️',
    gif: '🖼️',
    webp: '🖼️',
    svg: '🖼️',
    ico: '🖼️',
    bmp: '🖼️',

    // Videos
    mp4: '🎬',
    mkv: '🎬',
    avi: '🎬',
    mov: '🎬',
    wmv: '🎬',
    flv: '🎬',
    webm: '🎬',

    // Audio
    mp3: '🎵',
    wav: '🎵',
    flac: '🎵',
    aac: '🎵',
    ogg: '🎵',
    m4a: '🎵',

    // Documents
    pdf: '📕',
    doc: '📄',
    docx: '📄',
    xls: '📊',
    xlsx: '📊',
    ppt: '📽️',
    pptx: '📽️',
    txt: '📝',
    rtf: '📝',
    csv: '📊',

    // Archives
    zip: '📦',
    rar: '📦',
    '7z': '📦',
    tar: '📦',
    gz: '📦',

    // Code
    js: '💻',
    jsx: '💻',
    ts: '💻',
    tsx: '💻',
    html: '🌐',
    css: '🎨',
    json: '📋',
    py: '🐍',
    java: '☕',
    cpp: '💻',
    c: '💻',
    rs: '🦀',
    go: '💻',

    // Executables
    exe: '⚙️',
    msi: '⚙️',
    dmg: '⚙️',
    app: '⚙️',

    // Misc
    iso: '💿',
    apk: '📱',
    ipa: '📱',
}

export const getFileIcon = (filename) => {
    if (!filename) return '📄'
    const ext = filename.split('.').pop()?.toLowerCase()
    return FILE_ICONS[ext] || '📄'
}

export const getFileExtension = (filename) => {
    if (!filename) return ''
    return filename.split('.').pop()?.toLowerCase() || ''
}

// Format file size
export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
