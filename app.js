const tabBtns = document.querySelectorAll('.tab-btn');
const codeAreas = document.querySelectorAll('.code-area');
const runBtn = document.getElementById('runBtn');
const clearBtn = document.getElementById('clearBtn');
const outputFrame = document.getElementById('outputFrame');

const htmlInput = document.getElementById('htmlCode');
const cssInput = document.getElementById('cssCode');
const jsInput = document.getElementById('jsCode');

// Tab Switching
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        codeAreas.forEach(a => a.classList.remove('active'));

        btn.classList.add('active');
        const tab = btn.getAttribute('data-tab');
        document.getElementById(`${tab}Code`).classList.add('active');
    });
});

// Run Code Function
function executeCode() {
    const html = htmlInput.value;
    const css = `<style>${cssInput.value}</style>`;
    const js = `<script>${jsInput.value}<\/script>`;

    const combinedOutput = `
        <!DOCTYPE html>
        <html>
        <head>${css}</head>
        <body>
            ${html}
            ${js}
        </body>
        </html>
    `;

    const doc = outputFrame.contentDocument || outputFrame.contentWindow.document;
    doc.open();
    doc.write(combinedOutput);
    doc.close();
}

// Event Listeners
runBtn.addEventListener('click', executeCode);

clearBtn.addEventListener('click', () => {
    htmlInput.value = '';
    cssInput.value = '';
    jsInput.value = '';
    executeCode();
});

// Auto-run on first load
window.addEventListener('load', executeCode);
