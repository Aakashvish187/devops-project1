/**
 * LACSO HUB – Lacso AI Chatbot Widget
 * Floating AI Assistant with AJAX + typing animation
 */
(function () {
    'use strict';

    /* ── Config ── */
    const CHATBOT_URL = '/lacsohubwebsite/api/ai.php';
    const TYPING_DELAY = 900;  // ms before bot "replies"
    const BOT_NAME = 'Lacso AI';
    const GREET_DELAY = 1200; // ms before auto-greeting

    /* ── State ── */
    let isOpen = false;
    let isBusy = false;
    let msgCount = 0;

    /* ── DOM refs ── */
    const launcher = document.getElementById('lh-chat-launcher');
    const chatWindow = document.getElementById('lh-chat-window');
    const messagesEl = document.getElementById('lh-messages');
    const inputEl = document.getElementById('lh-chat-input');
    const sendBtn = document.getElementById('lh-send-btn');
    const closeBtn = document.getElementById('lh-header-close');
    const typingRow = document.getElementById('lh-typing-row');
    const badgeEl = document.getElementById('lh-unread-badge');

    if (!launcher || !chatWindow) return; // guard

    /* ── Toggle ── */
    function toggle() {
        isOpen = !isOpen;
        launcher.classList.toggle('open', isOpen);
        chatWindow.classList.toggle('visible', isOpen);
        if (isOpen) {
            hideBadge();
            setTimeout(() => inputEl && inputEl.focus(), 350);
        }
    }

    launcher.addEventListener('click', toggle);
    if (closeBtn) closeBtn.addEventListener('click', toggle);

    /* ── Badge ── */
    function showBadge() {
        if (badgeEl) badgeEl.style.display = 'flex';
    }
    function hideBadge() {
        if (badgeEl) badgeEl.style.display = 'none';
    }

    /* ── Format time ── */
    function now() {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    /* ── Simple markdown → HTML ── */
    function mdToHtml(text) {
        return text
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
            .replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>')
            .replace(/•\s/g, '• ')
            .replace(/\n/g, '<br>');
    }

    /* ── Append message ── */
    function appendMessage(text, type = 'bot') {
        msgCount++;
        const row = document.createElement('div');
        const avatar = document.createElement('div');
        const col = document.createElement('div');
        const bubble = document.createElement('div');
        const time = document.createElement('div');

        row.className = `lh-msg-row ${type}-row`;
        avatar.className = `lh-msg-avatar-sm ${type}`;
        col.style.cssText = 'display:flex;flex-direction:column;max-width:80%';

        if (type === 'bot') {
            avatar.innerHTML = '<i class="fas fa-robot"></i>';
        } else {
            avatar.innerHTML = '<i class="fas fa-user"></i>';
        }

        bubble.className = `lh-bubble ${type}`;
        bubble.innerHTML = mdToHtml(text);

        time.className = 'lh-msg-time';
        time.textContent = now();

        col.appendChild(bubble);
        col.appendChild(time);

        if (type === 'bot') {
            row.appendChild(avatar);
            row.appendChild(col);
        } else {
            row.appendChild(col);
            row.appendChild(avatar);
        }

        // Insert before typing row
        messagesEl.insertBefore(row, typingRow);
        scrollToBottom();
    }

    /* ── Scroll ── */
    function scrollToBottom() {
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    /* ── Typing indicator ── */
    function showTyping() {
        typingRow.classList.add('show');
        scrollToBottom();
    }
    function hideTyping() {
        typingRow.classList.remove('show');
    }

    /* ── Send message ── */
    function sendMessage() {
        const text = inputEl.value.trim();
        if (!text || isBusy) return;

        isBusy = true;
        sendBtn.disabled = true;
        inputEl.disabled = true;

        appendMessage(text, 'user');
        inputEl.value = '';
        autoResize();

        showTyping();

        // AJAX
        fetch(CHATBOT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text })
        })
            .then(r => {
                if (!r.ok) throw new Error("Network response was not ok");
                return r.text();
            })
            .then(replyText => {
                setTimeout(() => {
                    hideTyping();
                    if (replyText) {
                        appendMessage(replyText, 'bot');
                    } else {
                        appendMessage("Our AI assistant is temporarily unavailable. Please contact us on WhatsApp.", 'bot');
                    }
                    isBusy = false;
                    sendBtn.disabled = false;
                    inputEl.disabled = false;
                    inputEl.focus();
                    if (!isOpen) showBadge();
                }, TYPING_DELAY);
            })
            .catch((err) => {
                console.error("Chatbot Fetch Error:", err);
                setTimeout(() => {
                    hideTyping();
                    appendMessage("⚠️ We are experiencing a temporary AI connection issue. Please try again.", 'bot');
                    isBusy = false;
                    sendBtn.disabled = false;
                    inputEl.disabled = false;
                }, TYPING_DELAY);
            });
    }

    /* ── Send button & keyboard ── */
    sendBtn.addEventListener('click', sendMessage);
    inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    /* ── Auto-resize textarea ── */
    function autoResize() {
        inputEl.style.height = 'auto';
        inputEl.style.height = Math.min(inputEl.scrollHeight, 120) + 'px';
    }
    inputEl.addEventListener('input', autoResize);

    /* ── Quick suggestion chips ── */
    document.querySelectorAll('.lh-suggestion-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            if (isBusy) return;
            inputEl.value = chip.textContent.trim();
            sendMessage();
        });
    });

    /* ── Auto greeting ── */
    setTimeout(() => {
        if (msgCount === 0) {
            appendMessage(
                "👋 Hello! I'm **Lacso AI**, LACSO HUB's intelligent assistant.\n\nI can help you learn about our **services**, **team**, **pricing**, or **contact details**. What can I help you with today?",
                'bot'
            );
            showBadge();
        }
    }, GREET_DELAY);

})();
