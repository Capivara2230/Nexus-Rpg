// ========================
// RPG Nexus — Main App JS
// ========================

document.addEventListener('DOMContentLoaded', () => {
  
  // ---- AUTH / LOGIN / CADASTRO ----
  const authOverlay = document.getElementById('authOverlay');
  const authTabs = document.querySelectorAll('.auth-tab');
  const authLogin = document.getElementById('authLogin');
  const authRegister = document.getElementById('authRegister');

  const loginEmail = document.getElementById('loginEmail');
  const loginPassword = document.getElementById('loginPassword');
  const rememberMe = document.getElementById('rememberMe');
  const btnLogin = document.getElementById('btnLogin');
  const loginError = document.getElementById('loginError');

  const regName = document.getElementById('regName');
  const regEmail = document.getElementById('regEmail');
  const regPassword = document.getElementById('regPassword');
  const regConfirm = document.getElementById('regConfirm');
  const acceptTerms = document.getElementById('acceptTerms');
  const btnRegister = document.getElementById('btnRegister');
  const registerError = document.getElementById('registerError');
  const regStrengthFill = document.getElementById('regStrengthFill');
  const regStrengthLabel = document.getElementById('regStrengthLabel');

  const btnGuest = document.getElementById('btnGuest');

  // Usuários em memória (sem localStorage)
  const USERS_DB = [
    { email: 'teste@email.com', password: '12345678', name: 'Mestre Alric' }
  ];

  function getUsers() {
    return USERS_DB;
  }

  function saveUsers(users) {
    // sem persistência no GitHub Pages — apenas memória
  }

  function getCurrentUser() {
    return null; // sempre começa deslogado
  }

  function setCurrentUser(user, keepLogged = true) {
    // sem persistência
  }

  function generateHandle(name, email) {
    const base = name || email.split('@')[0] || 'aventureiro';

    return '@' + base
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '');
  }

  function updateUserInterface(user) {
    if (!user) return;

    const displayName = user.name || 'Visitante';
    const initial = displayName.charAt(0).toUpperCase();
    const handle = user.handle || generateHandle(displayName, user.email || 'visitante@email.com');

    const sidebarName = document.querySelector('.user-name');
    const sidebarAvatar = document.getElementById('userAvatar');
    const profileName = document.getElementById('profileDisplayName');
    const profileHandle = document.getElementById('profileHandle');
    const profileAvatar = document.getElementById('profileAvatarBig');
    const editName = document.getElementById('editDisplayName');
    const editHandle = document.getElementById('editHandle');

    if (sidebarName) sidebarName.textContent = displayName;
    if (sidebarAvatar) sidebarAvatar.textContent = initial;

    if (profileName) profileName.textContent = displayName;
    if (profileHandle) profileHandle.textContent = handle;
    if (profileAvatar) profileAvatar.textContent = initial;

    if (editName) editName.value = displayName;
    if (editHandle) editHandle.value = handle.replace('@', '');
  }

  function enterApp(user, keepLogged = true) {
    updateUserInterface(user);
    if (authOverlay) {
      authOverlay.classList.add('hidden');
    }
    document.body.classList.add('is-authenticated');
  }

  
  function showAuthTab(type) {
  authTabs.forEach(tab => {
    tab.classList.toggle('active', tab.dataset.auth === type);
  });

  if (authLogin) {
    authLogin.classList.toggle('active', type === 'login');
  }

  if (authRegister) {
    authRegister.classList.toggle('active', type === 'register');
  }

  if (loginError) {
    loginError.textContent = '';
    loginError.classList.remove('success');
  }

  if (registerError) {
    registerError.textContent = '';
    registerError.classList.remove('success');
  }
}


  function showAuthMessage(element, message, type = 'error') {
    if (!element) return;

    element.textContent = message;
    element.classList.toggle('success', type === 'success');
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function checkPasswordStrength(password) {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) {
      return { label: 'Fraca', width: '25%', color: 'var(--accent-red)' };
    }

    if (score === 2 || score === 3) {
      return { label: 'Média', width: '65%', color: 'var(--accent-gold)' };
    }

    return { label: 'Forte', width: '100%', color: 'var(--accent-green)' };
  }

  authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      showAuthTab(tab.dataset.auth);
    });
  });

  document.querySelectorAll('.pass-toggle').forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault();

      const targetId = button.dataset.target;
      const input = document.getElementById(targetId);

      if (!input) return;

      input.type = input.type === 'password' ? 'text' : 'password';
      button.textContent = input.type === 'password' ? '👁️' : '🙈';
    });
  });

  regPassword?.addEventListener('input', () => {
    const password = regPassword.value;
    const strength = checkPasswordStrength(password);

    if (regStrengthFill) {
      regStrengthFill.style.width = password ? strength.width : '0%';
      regStrengthFill.style.background = strength.color;
    }

    if (regStrengthLabel) {
      regStrengthLabel.textContent = password ? strength.label : '—';
      regStrengthLabel.style.color = password ? strength.color : 'var(--text-muted)';
    }
  });

  btnRegister?.addEventListener('click', () => {
    const name = regName.value.trim();
    const email = regEmail.value.trim().toLowerCase();
    const password = regPassword.value;
    const confirm = regConfirm.value;

    if (!name) {
      showAuthMessage(registerError, 'Digite seu nome de aventureiro.');
      return;
    }

    if (!isValidEmail(email)) {
      showAuthMessage(registerError, 'Digite um e-mail válido.');
      return;
    }

    if (password.length < 8) {
      showAuthMessage(registerError, 'A senha precisa ter pelo menos 8 caracteres.');
      return;
    }

    if (password !== confirm) {
      showAuthMessage(registerError, 'As senhas não são iguais.');
      return;
    }

    if (!acceptTerms.checked) {
      showAuthMessage(registerError, 'Você precisa aceitar os Termos de Uso.');
      return;
    }

    const users = getUsers();
    const alreadyExists = users.some(user => user.email === email);

    if (alreadyExists) {
      showAuthMessage(registerError, 'Já existe uma conta com esse e-mail.');
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      handle: generateHandle(name, email),
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);

    showAuthMessage(registerError, 'Conta criada com sucesso! Entrando...', 'success');

    setTimeout(() => {
      enterApp(newUser, true);
    }, 700);
  });

  btnLogin?.addEventListener('click', () => {
    const email = loginEmail.value.trim().toLowerCase();
    const password = loginPassword.value;

    if (!isValidEmail(email)) {
      showAuthMessage(loginError, 'Digite um e-mail válido.');
      return;
    }

    if (!password) {
      showAuthMessage(loginError, 'Digite sua senha.');
      return;
    }

    const users = getUsers();
    const user = users.find(item => item.email === email && item.password === password);

    if (!user) {
      showAuthMessage(loginError, 'E-mail ou senha incorretos.');
      return;
    }

    showAuthMessage(loginError, 'Login realizado com sucesso!', 'success');

    setTimeout(() => {
      enterApp(user, rememberMe.checked);
    }, 500);
  });

  btnGuest?.addEventListener('click', () => {
    const guestUser = {
      id: 'guest',
      name: 'Visitante',
      email: 'visitante@rpgnexus.local',
      handle: '@visitante',
      guest: true
    };

    enterApp(guestUser, false);
  });

  const savedUser = getCurrentUser();

  if (savedUser) {
    enterApp(savedUser, true);
  } else if (authOverlay) {
    authOverlay.classList.remove('hidden');
  }


  // ---- NAVIGATION ----
  const navItems = document.querySelectorAll('.nav-item');
  const pages = document.querySelectorAll('.page');
  const topbarTitle = document.getElementById('topbarTitle');

  const pageLabels = {
    'discover':    { icon: '🧭', label: 'Descobrir' },
    'sessions':    { icon: '🎲', label: 'Sessões' },
    'players':     { icon: '🛡️', label: 'Players' },
    'worlds':      { icon: '🌍', label: 'Mundos' },
    'my-sessions': { icon: '📜', label: 'Minhas Sessões' },
    'characters':  { icon: '🧙', label: 'Personagens' },
    'invites':     { icon: '✉️', label: 'Convites' },
    'guilds':      { icon: '🏰', label: 'Guildas' },
    'events':      { icon: '🎉', label: 'Eventos' },
    'profile':     { icon: '👤', label: 'Meu Perfil' },
  };

  function navigateTo(pageId) {
    navItems.forEach(i => i.classList.remove('active'));
    pages.forEach(p => p.classList.remove('active'));

    const targetNav = document.querySelector(`[data-page="${pageId}"]`);
    const targetPage = document.getElementById(`page-${pageId}`);

    if (targetNav) targetNav.classList.add('active');
    if (targetPage) targetPage.classList.add('active');

    const meta = pageLabels[pageId];
    if (meta && topbarTitle) {
      topbarTitle.innerHTML = `<span>${meta.icon}</span><span>${meta.label}</span>`;
    }

    // Close mobile sidebar
    document.getElementById('sidebar').classList.remove('open');
  }

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(item.dataset.page);
    });
  });

  // ---- MOBILE MENU ----
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const sidebar = document.getElementById('sidebar');

  mobileMenuBtn?.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  // Close sidebar clicking outside
  document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  });

  // ---- MODAL ----
  const modalOverlay = document.getElementById('modalOverlay');
  const createBtn    = document.getElementById('createSessionBtn');
  const modalClose   = document.getElementById('modalClose');
  const cancelBtn    = document.getElementById('cancelBtn');

  function openModal()  { modalOverlay.classList.add('open'); }
  function closeModal() { modalOverlay.classList.remove('open'); }

  createBtn?.addEventListener('click', openModal);
  modalClose?.addEventListener('click', closeModal);
  cancelBtn?.addEventListener('click', closeModal);

  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // ---- FILTER CHIPS ----
  const chips = document.querySelectorAll('.chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      filterSessions(chip.dataset.filter);
    });
  });

  function filterSessions(filter) {
    const filtered = filter === 'all'
      ? SESSIONS
      : SESSIONS.filter(s => s.system.toLowerCase().includes(filter) ||
                               s.tags.some(t => t.toLowerCase().includes(filter)));
    renderSessions(filtered);
  }

  // ---- RENDER SESSIONS ----
  function renderSessions(sessions) {
    const grid = document.getElementById('sessionsGrid');
    if (!grid) return;

    grid.innerHTML = '';

    sessions.forEach((s, i) => {
      const isFull = s.filled >= s.slots;
      const slotsHTML = Array.from({ length: s.slots }, (_, idx) =>
        `<span class="slot ${idx < s.filled ? 'filled' : 'empty'}"></span>`
      ).join('');

      const card = document.createElement('div');
      card.className = `session-card${s.featured ? ' featured' : ''}`;
      card.style.animationDelay = `${i * 0.05}s`;
      card.innerHTML = `
        <div class="card-banner" style="background: ${s.bannerGradient}">
          <span style="filter: drop-shadow(0 0 12px rgba(0,0,0,0.5))">${s.emoji}</span>
          ${s.featured ? '<span style="position:absolute;top:10px;right:10px;background:rgba(201,168,76,0.15);border:1px solid rgba(201,168,76,0.4);color:#c9a84c;font-size:10px;font-weight:700;padding:3px 8px;border-radius:10px;letter-spacing:0.05em">✦ DESTAQUE</span>' : ''}
        </div>
        <div class="card-body">
          <div class="card-system">${s.system}</div>
          <div class="card-title">${s.title}</div>
          <div class="card-desc">${s.description}</div>
          <div class="card-meta">
            <span>🌐 ${s.mode}</span>
            <span>📅 ${s.frequency}</span>
            <span>⚡ ${s.xp}</span>
          </div>
        </div>
        <div class="card-footer">
          <div class="card-dm">
            <div class="dm-avatar" style="background: ${s.dm.color}20; color: ${s.dm.color}; border: 1px solid ${s.dm.color}40">${s.dm.initials}</div>
            <div>
              <div style="font-size:11px;color:var(--text-muted)">Mestre</div>
              <div style="font-size:12px;font-weight:600">${s.dm.name}</div>
            </div>
          </div>
          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px">
            <div class="card-slots">${slotsHTML}</div>
            <button class="btn-join" ${isFull ? 'disabled style="opacity:0.4;cursor:not-allowed"' : ''}>
              ${isFull ? '🔒 Lotado' : '⚔️ Entrar'}
            </button>
          </div>
        </div>
      `;

      card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('btn-join')) {
          showSessionDetail(s);
        }
      });

      grid.appendChild(card);
    });
  }

  // ---- RENDER PLAYERS ----
  function renderPlayers() {
    const row = document.getElementById('playersRow');
    if (!row) return;

    PLAYERS.forEach((p, i) => {
      const card = document.createElement('div');
      card.className = 'player-card';
      card.style.animationDelay = `${0.1 + i * 0.05}s`;
      card.innerHTML = `
        <div class="player-avatar-wrap">
          <div class="player-avatar" style="background: ${p.avatarColor}">${p.initials}</div>
          <span class="player-status-dot" style="background: ${p.statusColor}; border-color: var(--bg-card)"></span>
        </div>
        <div class="player-name">${p.name}</div>
        <div class="player-class">${p.class}</div>
        <div class="player-tags">
          ${p.tags.map(t => `<span class="player-tag">${t}</span>`).join('')}
        </div>
      `;
      row.appendChild(card);
    });
  }

  // ---- SESSION DETAIL (simple toast-like preview) ----
  function showSessionDetail(session) {
    // Remove existing detail if any
    const existing = document.getElementById('sessionDetail');
    if (existing) existing.remove();

    const detail = document.createElement('div');
    detail.id = 'sessionDetail';
    detail.style.cssText = `
      position: fixed; bottom: 24px; right: 24px; z-index: 500;
      background: var(--bg-card); border: 1px solid var(--border-accent);
      border-radius: 14px; padding: 20px 24px; width: 320px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.6);
      animation: modalIn 0.25s cubic-bezier(0.34,1.56,0.64,1);
    `;
    detail.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px">
        <div>
          <div style="font-size:11px;color:var(--accent-gold);font-weight:700;text-transform:uppercase;letter-spacing:0.07em;margin-bottom:4px">${session.system}</div>
          <div style="font-family:var(--font-display);font-size:15px;color:var(--text-primary);font-weight:600">${session.title}</div>
        </div>
        <button onclick="this.parentElement.parentElement.remove()" style="background:none;border:none;color:var(--text-muted);font-size:18px;cursor:pointer;padding:0 0 0 12px;line-height:1">✕</button>
      </div>
      <p style="font-size:13px;color:var(--text-secondary);line-height:1.5;margin-bottom:14px">${session.description}</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px">
        ${session.tags.map(t => `<span style="font-size:11px;padding:2px 8px;border-radius:10px;background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);color:var(--accent-gold)">${t}</span>`).join('')}
      </div>
      <button onclick="this.parentElement.remove()" style="width:100%;background:var(--accent-gold);color:#1a1200;border:none;border-radius:8px;padding:9px;font-family:var(--font-body);font-size:13px;font-weight:700;cursor:pointer">⚔️ Solicitar Entrada</button>
    `;
    document.body.appendChild(detail);

    // Auto remove after 8s
    setTimeout(() => { if (detail.parentNode) detail.remove(); }, 8000);
  }

  // ---- SEARCH ----
  const searchInput = document.getElementById('searchInput');
  let searchTimer;

  searchInput?.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      const q = searchInput.value.toLowerCase().trim();
      if (!q) {
        renderSessions(SESSIONS);
        return;
      }
      const filtered = SESSIONS.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.system.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.tags.some(t => t.toLowerCase().includes(q))
      );
      renderSessions(filtered);

      // Navigate to discover page if not already there
      const discoverPage = document.getElementById('page-discover');
      if (!discoverPage.classList.contains('active')) {
        navigateTo('discover');
      }
    }, 300);
  });
  // ---- PROFILE BTN ----
  document.getElementById('profileBtn')?.addEventListener('click', () => navigateTo('profile'));

  // ---- PROFILE PAGE LOGIC ----

  const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
  const periods = ['Manhã', 'Tarde', 'Noite'];
  const defaultOn = { 'Sex-Noite':true, 'Sáb-Manhã':true, 'Sáb-Tarde':true, 'Sáb-Noite':true, 'Dom-Noite':true };
  const availGrid = document.getElementById('availabilityGrid');

  if (availGrid) {
    availGrid.innerHTML = '<div></div>' + periods.map(p =>
      `<div class="avail-label" style="justify-content:center;font-weight:700">${p}</div>`
    ).join('');
    days.forEach(day => {
      availGrid.innerHTML += `<div class="avail-label">${day}</div>`;
      periods.forEach(period => {
        const key = `${day}-${period}`;
        const isOn = defaultOn[key] || false;
        availGrid.innerHTML += `<div class="avail-slot${isOn ? ' on' : ''}" data-key="${key}">${isOn ? '✓' : ''}</div>`;
      });
    });
    availGrid.addEventListener('click', e => {
      const slot = e.target.closest('.avail-slot');
      if (!slot) return;
      slot.classList.toggle('on');
      slot.textContent = slot.classList.contains('on') ? '✓' : '';
    });
  }

  document.querySelectorAll('.role-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  document.querySelectorAll('.xp-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.xp-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  document.querySelectorAll('.status-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.status-opt').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  document.querySelectorAll('.avatar-color-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.avatar-color-opt').forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      const colors = opt.dataset.colors;
      const avatarBig = document.getElementById('profileAvatarBig');
      const sidebarAvatar = document.getElementById('userAvatar');
      if (avatarBig) avatarBig.style.background = colors;
      if (sidebarAvatar) sidebarAvatar.style.background = colors;
    });
  });

  document.getElementById('bannerColorPicker')?.addEventListener('input', e => {
    const c = e.target.value;
    const bg = document.getElementById('profileBannerBg');
    if (bg) bg.style.background = `linear-gradient(135deg, ${c}55, ${c}22)`;
  });

  const editBio = document.getElementById('editBio');
  const bioCount = document.getElementById('bioCount');
  editBio?.addEventListener('input', () => {
    const len = editBio.value.length;
    if (bioCount) {
      bioCount.textContent = `${len} / 200`;
      bioCount.style.color = len > 180 ? 'var(--accent-red)' : 'var(--text-muted)';
    }
  });

  document.getElementById('editDisplayName')?.addEventListener('input', e => {
    const v = e.target.value || 'Aventureiro';
    const el = document.getElementById('profileDisplayName');
    const sidebar = document.querySelector('.user-name');
    const avatarBig = document.getElementById('profileAvatarBig');
    const sidebarAvatar = document.getElementById('userAvatar');
    if (el) el.textContent = v;
    if (sidebar) sidebar.textContent = v;
    const initial = v.charAt(0).toUpperCase();
    if (avatarBig) avatarBig.textContent = initial;
    if (sidebarAvatar) sidebarAvatar.textContent = initial;
  });

  document.getElementById('editHandle')?.addEventListener('input', e => {
    const el = document.getElementById('profileHandle');
    if (el) el.textContent = '@' + (e.target.value || 'usuario');
  });

  editBio?.addEventListener('input', e => {
    const el = document.getElementById('profileBioDisplay');
    if (el) el.textContent = e.target.value;
  });

  const tagInput = document.getElementById('tagInputField');
  const tagsInputContainer = document.getElementById('profileTagsInput');
  const tagsDisplay = document.getElementById('profileTagsDisplay');

  function syncTagsDisplay() {
    if (!tagsDisplay || !tagsInputContainer) return;
    const tags = [...tagsInputContainer.querySelectorAll('.tag')].map(t =>
      t.textContent.replace('✕', '').trim()
    );
    tagsDisplay.innerHTML = tags.map(t => `<span class="profile-tag">${t}</span>`).join('');
  }

  tagInput?.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.value.trim()) {
      e.preventDefault();
      const tagText = tagInput.value.trim().replace(',', '');
      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.innerHTML = `${tagText} <button class="tag-remove">✕</button>`;
      tag.querySelector('.tag-remove').addEventListener('click', () => {
        tag.remove();
        syncTagsDisplay();
      });
      tagsInputContainer.insertBefore(tag, tagInput);
      tagInput.value = '';
      syncTagsDisplay();
    }
  });

  document.querySelectorAll('#profileTagsInput .tag-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.tag').remove();
      syncTagsDisplay();
    });
  });

  document.getElementById('saveProfileBtn')?.addEventListener('click', () => {
    const toast = document.createElement('div');
    toast.className = 'save-toast';
    toast.textContent = '✅ Perfil salvo com sucesso!';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2800);
  });
  // ---- INIT ----
  // Sempre mostra a tela de login ao abrir
  if (authOverlay) {
    authOverlay.classList.remove('hidden');
  }

  renderSessions(SESSIONS);
  renderPlayers();

});


