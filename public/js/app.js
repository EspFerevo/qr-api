/**
 * QR Studio Frontend Logic
 */

// State Management
let currentQR = { png: null, svg: null };

// DOM Elements
const elements = {
    urlInput: document.getElementById('urlInput'),
    generateBtn: document.getElementById('generateBtn'),
    resultArea: document.getElementById('resultArea'),
    qrPreview: document.getElementById('qrPreview'),
    toastContainer: document.getElementById('toast-container'),
    downloadPng: document.getElementById('downloadPng'),
    downloadSvg: document.getElementById('downloadSvg')
};

/**
 * Show a modern toast notification
 */
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerText = message;
    
    elements.toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/**
 * Handle QR Generation
 */
async function generateQR() {
    const url = elements.urlInput.value.trim();

    if (!url) {
        showToast('Please enter text or a URL', 'error');
        elements.urlInput.focus();
        return;
    }

    // UI Feedback
    elements.generateBtn.disabled = true;
    elements.generateBtn.innerText = 'Creating magic...';

    try {
        const response = await axios.get('/api/generate', {
            params: { url }
        });

        currentQR = response.data;

        // Update UI
        elements.qrPreview.src = currentQR.png;
        elements.resultArea.style.display = 'block';

        // Scroll to result
        elements.resultArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        showToast('QR Code generated successfully!');

    } catch (error) {
        const errorMsg = error.response?.data?.error || 'Server error';
        showToast(errorMsg, 'error');
        console.error('Generation failed:', error);
    } finally {
        elements.generateBtn.disabled = false;
        elements.generateBtn.innerText = 'Generate QR Code';
    }
}

/**
 * Handle File Download
 */
function downloadFile(format) {
    if (!currentQR[format]) return;

    const link = document.createElement('a');
    const timestamp = Date.now();

    if (format === 'png') {
        link.href = currentQR.png;
        link.download = `qr-studio-${timestamp}.png`;
    } else {
        const blob = new Blob([currentQR.svg], { type: 'image/svg+xml' });
        link.href = URL.createObjectURL(blob);
        link.download = `qr-studio-${timestamp}.svg`;
    }

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`${format.toUpperCase()} file downloaded`);
}

// Event Listeners
elements.generateBtn.addEventListener('click', generateQR);

elements.urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') generateQR();
});

elements.downloadPng.addEventListener('click', () => downloadFile('png'));
elements.downloadSvg.addEventListener('click', () => downloadFile('svg'));

// Initialize
console.log('QR Studio initialized');
