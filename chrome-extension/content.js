// === Catch ALL file input changes globally ===
document.addEventListener('change', async (event) => {
    const target = event.target;
    if (target.tagName === 'INPUT' && target.type === 'file') {
      const files = target.files;
      for (let file of files) {
        if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
          console.log(`[SecretDetector] File selected: ${file.name}`);
          try {
            const fileContent = await readFileAsArrayBuffer(file);
            setTimeout(() => {
              if (chrome.runtime?.id) {
                chrome.runtime.sendMessage({
                  type: 'PDF_UPLOAD_DETECTED',
                  filename: file.name,
                  fileContent: Array.from(new Uint8Array(fileContent))
                });
              }
            }, 10);
          } catch (error) {
            console.error('Error processing uploaded PDF:', error);
          }
        }
      }
    }
  });
  
  // === Catch drag-and-drop PDFs ===
  document.addEventListener('drop', async (event) => {
    const items = event.dataTransfer?.items;
    if (!items) return;
  
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.kind === 'file') {
        const file = item.getAsFile();
        if (file && file.type === 'application/pdf') {
          console.log(`[SecretDetector] PDF dropped: ${file.name}`);
          try {
            const fileContent = await readFileAsArrayBuffer(file);
            setTimeout(() => {
              if (chrome.runtime?.id) {
                chrome.runtime.sendMessage({
                  type: 'PDF_UPLOAD_DETECTED',
                  filename: file.name,
                  fileContent: Array.from(new Uint8Array(fileContent))
                });
              }
            }, 10);
          } catch (error) {
            console.error('[SecretDetector] Error processing dropped PDF:', error);
          }
        }
      }
    }
  });
  
  // === Show popup alert when secret is detected ===
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'SHOW_SECRET_ALERT') {
      showAlertPopup(message.filename);
    }
  });
  
  // === On-screen red popup ===
  function showAlertPopup(filename) {
    const existing = document.getElementById('secret-detector-alert');
    if (existing) existing.remove();
  
    const popup = document.createElement('div');
    popup.id = 'secret-detector-alert';
    popup.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #f44336;
        color: white;
        padding: 16px;
        font-size: 16px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 9999;
      ">
        🔒 Secrets found in <strong>${filename}</strong>!
        <button id="secret-detector-close" style="
          position: absolute;
          top: 6px;
          right: 6px;
          background: transparent;
          border: none;
          color: white;
          font-weight: bold;
          font-size: 16px;
          cursor: pointer;
        ">&times;</button>
      </div>
    `;
  
    document.body.appendChild(popup);
  
    const closeBtn = document.getElementById('secret-detector-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => popup.remove());
    }
  
    setTimeout(() => popup.remove(), 10000);
  }
  
  // === Helper: read file as array buffer ===
  function readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  }
  