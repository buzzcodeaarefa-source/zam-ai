// MedZamanti Application Controller
import { DRUGS_DB, INTERACTIONS_DB, SYMPTOM_FLOWCHART } from './data.js';
import { getAIResponse } from './ai-engine.js';

// --- APPLICATION STATE ---
const state = {
  currentUserEmail: null,
  currentTab: 'dashboard',
  profile: {
    name: '',
    age: '',
    gender: 'Unspecified',
    allergies: [],
    conditions: [],
    medications: []
  },
  reminders: [],
  geminiKey: '',
  chatHistory: [],
  theme: 'dark',
  symptomWizard: {
    currentNode: 'start',
    history: []
  },
  interactionChecker: {
    selectedIds: []
  }
};

// --- DOM ELEMENTS REFERENCE ---
const DOM = {
  // Authentication Portal Elements
  authContainer: document.getElementById('authContainer'),
  appContainer: document.getElementById('appContainer'),
  loginEmail: document.getElementById('loginEmail'),
  loginPassword: document.getElementById('loginPassword'),
  loginBtn: document.getElementById('loginBtn'),
  signupName: document.getElementById('signupName'),
  signupEmail: document.getElementById('signupEmail'),
  signupPassword: document.getElementById('signupPassword'),
  signupConfirmPassword: document.getElementById('signupConfirmPassword'),
  signupBtn: document.getElementById('signupBtn'),
  switchToSignup: document.getElementById('switchToSignup'),
  switchToLogin: document.getElementById('switchToLogin'),
  logoutBtn: document.getElementById('logoutBtn'),
  loginFormView: document.getElementById('loginFormView'),
  signupFormView: document.getElementById('signupFormView'),

  // Sidebar elements
  sidebar: document.getElementById('sidebar'),
  sidebarToggle: document.getElementById('sidebarToggle'),
  sidebarClose: document.getElementById('sidebarClose'),
  sidebarOverlay: document.getElementById('sidebarOverlay'),
  mobileMenuOpen: document.getElementById('mobileMenuOpen'),
  themeToggle: document.getElementById('themeToggle'),
  avatarInitials: document.getElementById('avatarInitials'),
  userNameLabel: document.getElementById('userNameLabel'),
  userWarningLabel: document.getElementById('userWarningLabel'),
  viewTitle: document.getElementById('viewTitle'),
  
  // Navigation links
  navItems: document.querySelectorAll('.nav-item'),
  appViews: document.querySelectorAll('.app-view'),
  
  // Network and badges
  networkDot: document.getElementById('networkDot'),
  networkText: document.getElementById('networkText'),
  apiKeyStatus: document.getElementById('apiKeyStatus'),
  
  // Dashboard view
  welcomeGreeting: document.getElementById('welcomeGreeting'),
  statsReminders: document.getElementById('statsReminders'),
  statsAllergies: document.getElementById('statsAllergies'),
  statsConditions: document.getElementById('statsConditions'),
  dashboardRemindersList: document.getElementById('dashboardRemindersList'),
  dashViewRemindersLink: document.getElementById('dashViewRemindersLink'),
  shortcutCards: document.querySelectorAll('.shortcut-card'),
  
  // Chat view
  chatMessages: document.getElementById('chatMessages'),
  chatInput: document.getElementById('chatInput'),
  chatSendBtn: document.getElementById('chatSendBtn'),
  clearChatBtn: document.getElementById('clearChatBtn'),
  voiceInputBtn: document.getElementById('voiceInputBtn'),
  
  // Database view
  dbSearchInput: document.getElementById('dbSearchInput'),
  classFilters: document.querySelectorAll('.class-filters .filter-badge'),
  drugsGrid: document.getElementById('drugsGrid'),
  
  // Interaction checker view
  interactionSelect: document.getElementById('interactionSelect'),
  interactionChips: document.getElementById('interactionChips'),
  checkInteractionsBtn: document.getElementById('checkInteractionsBtn'),
  interactionResults: document.getElementById('interactionResults'),
  
  // Symptom checker view
  wizardProgressBar: document.getElementById('wizardProgressBar'),
  step1: document.getElementById('step-1'),
  step1Question: document.getElementById('step-1-question'),
  step1Options: document.getElementById('step-1-options'),
  step2: document.getElementById('step-2'),
  step2Question: document.getElementById('step-2-question'),
  step2Options: document.getElementById('step-2-options'),
  step3: document.getElementById('step-3'),
  step3Question: document.getElementById('step-3-question'),
  step3Options: document.getElementById('step-3-options'),
  step4: document.getElementById('step-4'),
  triageResultContainer: document.getElementById('triageResultContainer'),
  wizardBackBtn: document.getElementById('wizardBackBtn'),
  wizardRestartBtn: document.getElementById('wizardRestartBtn'),
  node1: document.getElementById('node-1'),
  node2: document.getElementById('node-2'),
  node3: document.getElementById('node-3'),
  node4: document.getElementById('node-4'),
  
  // Reminders view
  remMedSelect: document.getElementById('remMedSelect'),
  remDosage: document.getElementById('remDosage'),
  remTime: document.getElementById('remTime'),
  remFrequency: document.getElementById('remFrequency'),
  reminderForm: document.getElementById('reminderForm'),
  remindersList: document.getElementById('remindersList'),
  
  // Pill Identifier view
  pillColorSelect: document.getElementById('pillColorSelect'),
  pillShapeSelect: document.getElementById('pillShapeSelect'),
  pillImprintInput: document.getElementById('pillImprintInput'),
  pillIdentifierResults: document.getElementById('pillIdentifierResults'),
  pillSvg: document.getElementById('pillSvg'),
  
  // Profile settings view
  profName: document.getElementById('profName'),
  profAge: document.getElementById('profAge'),
  profGender: document.getElementById('profGender'),
  profGeminiKey: document.getElementById('profGeminiKey'),
  saveProfileBtn: document.getElementById('saveProfileBtn'),
  customAllergyInput: document.getElementById('customAllergyInput'),
  addCustomAllergyBtn: document.getElementById('addCustomAllergyBtn'),
  customAllergiesList: document.getElementById('customAllergiesList'),
  customConditionInput: document.getElementById('customConditionInput'),
  addCustomConditionBtn: document.getElementById('addCustomConditionBtn'),
  customConditionsList: document.getElementById('customConditionsList'),
  
  // Emergency view
  emergencyPhoneCallBtn: document.getElementById('emergencyPhoneCallBtn'),
  
  // Detail modal
  drugDetailModal: document.getElementById('drugDetailModal'),
  modalCloseBtn: document.getElementById('modalCloseBtn'),
  modalDrugClass: document.getElementById('modalDrugClass'),
  modalDrugName: document.getElementById('modalDrugName'),
  modalDrugBrand: document.getElementById('modalDrugBrand'),
  modalDrugBody: document.getElementById('modalDrugBody'),

  // PWA Install elements
  pwaInstallBtn: document.getElementById('pwaInstallBtn'),
  pwaInstallBanner: document.getElementById('pwaInstallBanner'),
  pwaInstallBannerBtn: document.getElementById('pwaInstallBannerBtn'),
  pwaInstallBannerClose: document.getElementById('pwaInstallBannerClose'),
  iosInstallBanner: document.getElementById('iosInstallBanner'),
  iosInstallBannerClose: document.getElementById('iosInstallBannerClose')
};

// Speech Recognition & Text-to-Speech Setup
let recognition;
let isRecording = false;

if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SpeechGen = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechGen();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  recognition.onstart = () => {
    isRecording = true;
    DOM.voiceInputBtn.classList.add('recording');
    DOM.chatInput.placeholder = "Listening...";
  };

  recognition.onend = () => {
    isRecording = false;
    DOM.voiceInputBtn.classList.remove('recording');
    DOM.chatInput.placeholder = "Ask a pharmacy or medical question...";
  };

  recognition.onresult = (event) => {
    const speechResult = event.results[0][0].transcript;
    DOM.chatInput.value = speechResult;
    // Auto-focus chat input
    DOM.chatInput.focus();
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error', event.error);
    isRecording = false;
    DOM.voiceInputBtn.classList.remove('recording');
    DOM.chatInput.placeholder = "Speech failed. Type query...";
  };
}

// --- INITIALIZATION ---
window.addEventListener('DOMContentLoaded', () => {
  initAuthentication();
  loadStateFromStorage();
  initSidebarBehavior();
  initRouter();
  initTheme();
  initNetworkStatus();
  initProfileSettings();
  initDrugDatabase();
  initInteractionChecker();
  initSymptomChecker();
  initReminders();
  initPillIdentifier();
  initEmergency();
  initModal();
  initPwaInstallation();
  updateDashboardStats();
  
  // Set up continuous alarm checks (every minute)
  setInterval(checkMedicationReminders, 60000);
});

// --- STATE MANAGEMENT ---
function loadStateFromStorage() {
  // Load Theme
  const savedTheme = localStorage.getItem('medzamanti_theme');
  if (savedTheme) {
    state.theme = savedTheme;
  }
  
  // Load Active User Session
  const email = localStorage.getItem('medzamanti_active_user');
  if (email) {
    state.currentUserEmail = email;
    const users = JSON.parse(localStorage.getItem('medzamanti_users')) || [];
    const user = users.find(u => u.email === email);
    
    if (user) {
      state.profile = user.profile || { name: '', age: '', gender: 'Unspecified', allergies: [], conditions: [], medications: [] };
      state.reminders = user.reminders || [];
      state.geminiKey = user.geminiKey || '';
      state.chatHistory = user.chatHistory || [];
      
      DOM.authContainer.style.display = 'none';
      DOM.appContainer.style.display = 'flex';
      renderLoadedChatHistory();
    } else {
      localStorage.removeItem('medzamanti_active_user');
      DOM.authContainer.style.display = 'flex';
      DOM.appContainer.style.display = 'none';
    }
  } else {
    DOM.authContainer.style.display = 'flex';
    DOM.appContainer.style.display = 'none';
  }
}

function saveState() {
  if (state.currentUserEmail) {
    const users = JSON.parse(localStorage.getItem('medzamanti_users')) || [];
    const index = users.findIndex(u => u.email === state.currentUserEmail);
    if (index !== -1) {
      users[index].profile = state.profile;
      users[index].reminders = state.reminders;
      users[index].geminiKey = state.geminiKey;
      users[index].chatHistory = state.chatHistory;
      localStorage.setItem('medzamanti_users', JSON.stringify(users));
    }
  }
  
  updateDashboardStats();
  syncProfileUI();
}

// --- SIDEBAR & NAVIGATION MECHANICS ---
function initSidebarBehavior() {
  // Collapse toggle button (Desktops)
  DOM.sidebarToggle.addEventListener('click', () => {
    DOM.sidebar.classList.toggle('collapsed');
    
    // Toggle icon rotation
    const icon = DOM.sidebarToggle.querySelector('svg');
    if (DOM.sidebar.classList.contains('collapsed')) {
      icon.style.transform = 'rotate(180deg)';
    } else {
      icon.style.transform = 'rotate(0deg)';
    }
  });

  // Mobile menu trigger buttons
  DOM.mobileMenuOpen.addEventListener('click', () => {
    DOM.sidebar.classList.add('active');
    DOM.sidebarOverlay.classList.add('active');
  });

  const closeSidebar = () => {
    DOM.sidebar.classList.remove('active');
    DOM.sidebarOverlay.classList.remove('active');
  };

  DOM.sidebarClose.addEventListener('click', closeSidebar);
  DOM.sidebarOverlay.addEventListener('click', closeSidebar);
}

function initRouter() {
  DOM.navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetTab = item.getAttribute('data-tab');
      switchTab(targetTab);
      
      // Auto close sidebar on mobile
      DOM.sidebar.classList.remove('active');
      DOM.sidebarOverlay.classList.remove('active');
    });
  });

  // Dashboard quick shortcuts routing
  DOM.shortcutCards.forEach(card => {
    card.addEventListener('click', () => {
      const tab = card.getAttribute('data-shortcut');
      switchTab(tab);
    });
  });

  // View reminders link
  DOM.dashViewRemindersLink.addEventListener('click', () => {
    switchTab('reminders');
  });
}

function switchTab(tabId) {
  state.currentTab = tabId;
  
  // Deactivate all nav items and views
  DOM.navItems.forEach(nav => nav.classList.remove('active'));
  DOM.appViews.forEach(view => view.classList.remove('active'));
  
  // Activate selected nav and view
  const activeNav = document.getElementById(`nav-${tabId}`);
  const activeView = document.getElementById(`view-${tabId}`);
  
  if (activeNav) activeNav.classList.add('active');
  if (activeView) activeView.classList.add('active');
  
  // Update header text
  const titles = {
    dashboard: "Patient Dashboard",
    chat: "AI Pharmacist Consultant",
    database: "Medication & Pharmacy Database",
    interaction: "Drug-Drug Interaction Checker",
    symptom: "Symptom Triage Assessment",
    reminders: "Medication Reminders",
    identifier: "Visual Pill Identifier",
    profile: "My Health & AI Settings",
    firstaid: "First Aid Emergency Center"
  };
  
  DOM.viewTitle.textContent = titles[tabId] || "MedZamanti";
  
  // Trigger any layout specific re-renders
  if (tabId === 'chat') {
    scrollChatToBottom();
  }
}

// --- THEME ---
function initTheme() {
  const syncThemeUI = () => {
    const icon = DOM.themeToggle.querySelector('svg');
    if (state.theme === 'light') {
      document.body.classList.add('light-theme');
      icon.innerHTML = `
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      `;
    } else {
      document.body.classList.remove('light-theme');
      icon.innerHTML = `
        <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
      `;
    }
  };

  DOM.themeToggle.addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('medzamanti_theme', state.theme);
    syncThemeUI();
  });

  syncThemeUI();
}

// --- NETWORK STATUS ---
function initNetworkStatus() {
  const updateStatus = () => {
    if (navigator.onLine) {
      DOM.networkDot.classList.remove('offline');
      DOM.networkText.textContent = "Online";
    } else {
      DOM.networkDot.classList.add('offline');
      DOM.networkText.textContent = "Offline Mode";
    }
    syncProfileUI();
  };

  window.addEventListener('online', updateStatus);
  window.addEventListener('offline', updateStatus);
  updateStatus();
}

// --- USER PROFILE & HEALTH PORTAL ---
function initProfileSettings() {
  // Sync profile data to UI
  syncProfileUI();

  // Handle Add Custom Allergy
  DOM.addCustomAllergyBtn.addEventListener('click', () => {
    const allergyVal = DOM.customAllergyInput.value.trim();
    if (allergyVal) {
      // Check if it's already in default options or custom list
      const allCbValues = Array.from(document.querySelectorAll('.profile-allergy-cb')).map(cb => cb.value.toLowerCase());
      if (allCbValues.includes(allergyVal.toLowerCase())) {
        alert("This allergy is already added.");
        return;
      }
      
      // Add custom allergy to profile
      state.profile.allergies.push(allergyVal);
      DOM.customAllergyInput.value = '';
      
      // Re-sync UI immediately
      syncProfileUI();
    }
  });

  // Handle Add Custom Condition
  DOM.addCustomConditionBtn.addEventListener('click', () => {
    const conditionVal = DOM.customConditionInput.value.trim();
    if (conditionVal) {
      const allCbValues = Array.from(document.querySelectorAll('.profile-condition-cb')).map(cb => cb.value.toLowerCase());
      if (allCbValues.includes(conditionVal.toLowerCase())) {
        alert("This condition is already added.");
        return;
      }

      // Add custom condition to profile
      state.profile.conditions.push(conditionVal);
      DOM.customConditionInput.value = '';
      
      // Re-sync UI immediately
      syncProfileUI();
    }
  });

  // Handle Save Health Profile Form
  DOM.saveProfileBtn.addEventListener('click', () => {
    state.profile.name = DOM.profName.value.trim();
    state.profile.age = DOM.profAge.value.trim();
    state.profile.gender = DOM.profGender.value;
    state.geminiKey = DOM.profGeminiKey.value.trim();
    
    // Gather selected allergies
    const selectedAllergies = [];
    document.querySelectorAll('.profile-allergy-cb:checked').forEach(cb => {
      selectedAllergies.push(cb.value);
    });
    state.profile.allergies = selectedAllergies;

    // Gather selected conditions
    const selectedConditions = [];
    document.querySelectorAll('.profile-condition-cb:checked').forEach(cb => {
      selectedConditions.push(cb.value);
    });
    state.profile.conditions = selectedConditions;

    saveState();
    alert("Clinical health profile updated successfully.");
    switchTab('dashboard');
  });
}

function syncProfileUI() {
  // Populate Form Fields
  DOM.profName.value = state.profile.name || '';
  DOM.profAge.value = state.profile.age || '';
  DOM.profGender.value = state.profile.gender || 'Unspecified';
  DOM.profGeminiKey.value = state.geminiKey || '';

  // 1. Render default checkboxes state
  const defaultAllergies = ["Penicillin", "Cephalosporin", "NSAID", "Sulfa"];
  const defaultConditions = ["Hypertension", "Diabetes", "Heart Failure", "Asthma", "Renal Disease", "Liver Disease"];

  document.querySelectorAll('#defaultAllergiesGrid .profile-allergy-cb').forEach(cb => {
    cb.checked = state.profile.allergies.includes(cb.value);
  });
  document.querySelectorAll('#defaultConditionsGrid .profile-condition-cb').forEach(cb => {
    cb.checked = state.profile.conditions.includes(cb.value);
  });

  // 2. Render dynamic/custom checkboxes
  DOM.customAllergiesList.innerHTML = '';
  state.profile.allergies.forEach(allergy => {
    if (!defaultAllergies.includes(allergy)) {
      const label = document.createElement('label');
      label.className = 'checkbox-label';
      label.innerHTML = `<input type="checkbox" class="profile-allergy-cb" value="${allergy}" checked> ${allergy}`;
      DOM.customAllergiesList.appendChild(label);
    }
  });

  DOM.customConditionsList.innerHTML = '';
  state.profile.conditions.forEach(condition => {
    if (!defaultConditions.includes(condition)) {
      const label = document.createElement('label');
      label.className = 'checkbox-label';
      label.innerHTML = `<input type="checkbox" class="profile-condition-cb" value="${condition}" checked> ${condition}`;
      DOM.customConditionsList.appendChild(label);
    }
  });

  // Sidebar widgets
  const name = state.profile.name || "Patient Profile";
  DOM.userNameLabel.textContent = name;
  
  const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || "US";
  DOM.avatarInitials.textContent = initials;
  
  if (state.profile.allergies.length > 0) {
    DOM.userWarningLabel.textContent = `Allergies: ${state.profile.allergies.join(", ")}`;
    DOM.userWarningLabel.style.color = 'var(--status-danger)';
  } else {
    DOM.userWarningLabel.textContent = "Allergies: None declared";
    DOM.userWarningLabel.style.color = 'var(--text-muted)';
  }

  // API Badge status
  if (navigator.onLine) {
    DOM.apiKeyStatus.textContent = "Gemini AI Live";
    DOM.apiKeyStatus.className = "api-badge active";
  } else {
    DOM.apiKeyStatus.textContent = "Offline Local AI";
    DOM.apiKeyStatus.className = "api-badge inactive";
  }

  // Dashboard Greeting
  DOM.welcomeGreeting.textContent = `Hello, ${state.profile.name || 'Patient'}!`;
}

function updateDashboardStats() {
  // Reminders count (doses remaining today)
  const remaining = state.reminders.filter(r => r.loggedToday !== 'taken' && r.loggedToday !== 'skipped').length;
  DOM.statsReminders.textContent = remaining;

  // Allergies count
  DOM.statsAllergies.textContent = state.profile.allergies.length;

  // Conditions count
  DOM.statsConditions.textContent = state.profile.conditions.length;
}

// --- AI CHAT SYSTEM ---
DOM.chatSendBtn.addEventListener('click', handleChatSubmit);
DOM.chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleChatSubmit();
});

DOM.clearChatBtn.addEventListener('click', () => {
  if (confirm("Are you sure you want to clear your conversation history?")) {
    state.chatHistory = [];
    saveState();
    
    // Clear chat logs, reset with welcoming system prompt
    renderLoadedChatHistory();
  }
});

// Voice Input Button trigger
DOM.voiceInputBtn.addEventListener('click', () => {
  if (!recognition) {
    alert("Speech Recognition API is not supported in this browser. Try Chrome or Edge on mobile.");
    return;
  }
  
  if (isRecording) {
    recognition.stop();
  } else {
    recognition.start();
  }
});

async function handleChatSubmit() {
  const text = DOM.chatInput.value.trim();
  if (!text) return;

  // 1. Render User message bubble
  appendChatBubble(text, 'user');
  DOM.chatInput.value = '';

  // 2. Add Typing Indicator Bubble
  const typingIndicator = appendTypingIndicator();
  scrollChatToBottom();

  // 3. Request AI Response
  try {
    const response = await getAIResponse(text, state.geminiKey, state.profile, DRUGS_DB, INTERACTIONS_DB);
    
    // Remove typing indicator and append actual AI bubble
    typingIndicator.remove();
    appendChatBubble(response, 'system');
    
    // Optional TTS (Text-to-speech) reading for accessibility on mobile
    speak(stripHtml(response).substring(0, 200) + "..."); // Short summary
    
    // Save Chat
    state.chatHistory.push({ role: 'user', text }, { role: 'system', text: response });
    if (state.chatHistory.length > 50) state.chatHistory.splice(0, 2); // Cap chat history
    saveState();
  } catch (err) {
    typingIndicator.remove();
    appendChatBubble(`<strong>⚠️ Application Error:</strong> Unable to process response. Please try again.`, 'system');
  }
  scrollChatToBottom();
}

function appendChatBubble(content, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-message ${sender}`;
  
  const icon = sender === 'user' ? '👤' : '🤖';
  
  msgDiv.innerHTML = `
    <div class="message-icon">${icon}</div>
    <div class="message-bubble">${content}</div>
  `;
  DOM.chatMessages.appendChild(msgDiv);
}

function appendTypingIndicator() {
  const msgDiv = document.createElement('div');
  msgDiv.className = 'chat-message system';
  msgDiv.innerHTML = `
    <div class="message-icon">🤖</div>
    <div class="message-bubble typing-bubble">
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    </div>
  `;
  DOM.chatMessages.appendChild(msgDiv);
  return msgDiv;
}

function scrollChatToBottom() {
  DOM.chatMessages.scrollTop = DOM.chatMessages.scrollHeight;
}

function stripHtml(html) {
  let doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
}

function speak(text) {
  if ('speechSynthesis' in window) {
    // Stop any current reading
    window.speechSynthesis.cancel();
    
    // Generate utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  }
}

// --- MEDICATION DATABASE VIEW ---
function initDrugDatabase() {
  renderDrugs(DRUGS_DB);

  // Search input events
  DOM.dbSearchInput.addEventListener('input', () => {
    filterAndRenderDrugs();
  });

  // Class filters toggles
  DOM.classFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      DOM.classFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterAndRenderDrugs();
    });
  });
}

function renderDrugs(drugs) {
  DOM.drugsGrid.innerHTML = '';
  
  if (drugs.length === 0) {
    DOM.drugsGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-secondary);">
        No matching medications found in local database.
      </div>
    `;
    return;
  }

  drugs.forEach(drug => {
    const card = document.createElement('div');
    card.className = 'drug-card';
    
    // Check if allergic to show warning dot/border
    const isAllergic = state.profile.allergies.some(al => drug.name.toLowerCase().includes(al.toLowerCase()) || drug.class.toLowerCase().includes(al.toLowerCase()));
    const allergyWarning = isAllergic ? '<span class="badge danger-badge">ALLERGY CONTRAINDICATION</span>' : '';
    const borderStyle = isAllergic ? 'border-color: var(--status-danger);' : '';

    card.innerHTML = `
      <div class="drug-card-header" style="${borderStyle}">
        <div class="drug-card-class">${drug.class}</div>
        <div class="drug-card-name">${drug.name}</div>
        <div class="drug-card-brand">${drug.brand}</div>
      </div>
      <p class="drug-card-desc">${drug.description}</p>
      <div class="drug-card-footer">
        <div class="pill-preview-indicator">
          <div class="pill-dot" style="background-color: ${getPillColorHex(drug.pill.color)};"></div>
          <span>${drug.pill.shape}</span>
        </div>
        ${allergyWarning}
      </div>
    `;
    
    card.addEventListener('click', () => openDrugModal(drug));
    DOM.drugsGrid.appendChild(card);
  });
}

function filterAndRenderDrugs() {
  const query = DOM.dbSearchInput.value.toLowerCase().trim();
  
  // Get active class filter
  const activeBtn = document.querySelector('.class-filters .filter-badge.active');
  const activeClass = activeBtn ? activeBtn.getAttribute('data-class') : 'all';

  const filtered = DRUGS_DB.filter(drug => {
    // 1. Search Query Match
    const matchesSearch = 
      drug.name.toLowerCase().includes(query) || 
      drug.brand.toLowerCase().includes(query) || 
      drug.class.toLowerCase().includes(query) ||
      drug.indications.some(ind => ind.toLowerCase().includes(query));
      
    // 2. Class Filter Match
    let matchesClass = true;
    if (activeClass !== 'all') {
      const cls = drug.class.toLowerCase();
      if (activeClass === 'antibiotic') matchesClass = cls.includes('antibiotic') || cls.includes('penicillin');
      else if (activeClass === 'nsaid') matchesClass = cls.includes('nsaid') || cls.includes('analgesic') || cls.includes('corticosteroid');
      else if (activeClass === 'cardiovascular') matchesClass = cls.includes('ace inhibitor') || cls.includes('diuretic') || cls.includes('statin') || cls.includes('anticoagulant') || cls.includes('vasodilator');
      else if (activeClass === 'antidiabetic') matchesClass = cls.includes('antidiabetic');
      else if (activeClass === 'other') matchesClass = !['antibiotic', 'penicillin', 'nsaid', 'analgesic', 'corticosteroid', 'ace inhibitor', 'diuretic', 'statin', 'anticoagulant', 'vasodilator', 'antidiabetic'].some(k => cls.includes(k));
    }

    return matchesSearch && matchesClass;
  });

  renderDrugs(filtered);
}

// Convert string colors to Hex for dynamic CSS styles
function getPillColorHex(colorName) {
  const map = {
    'White': '#ffffff',
    'Brown': '#a16207',
    'Blue/Pink': 'linear-gradient(90deg, #38bdf8 50%, #f472b6 50%)',
    'Pink': '#f472b6',
    'Blue': '#38bdf8',
    'Purple': '#c084fc',
    'Peach': '#fdba74',
    'Yellow': '#fde047'
  };
  return map[colorName] || '#94a3b8';
}

// --- DRUG INTERACTIONS CHECKER ---
function initInteractionChecker() {
  // Populate dropdown selection list
  DOM.interactionSelect.innerHTML = '<option value="" disabled selected>Choose a drug to add...</option>';
  DRUGS_DB.forEach(drug => {
    const opt = document.createElement('option');
    opt.value = drug.id;
    opt.textContent = `${drug.name} (${drug.class})`;
    DOM.interactionSelect.appendChild(opt);
  });

  // Handle dropdown selection additions
  DOM.interactionSelect.addEventListener('change', () => {
    const val = DOM.interactionSelect.value;
    if (val && !state.interactionChecker.selectedIds.includes(val)) {
      state.interactionChecker.selectedIds.push(val);
      renderInteractionChips();
    }
    DOM.interactionSelect.value = ''; // Reset dropdown selection
  });

  // Analyze interaction button click
  DOM.checkInteractionsBtn.addEventListener('click', runInteractionCrossCheck);
}

function renderInteractionChips() {
  DOM.interactionChips.innerHTML = '';
  
  state.interactionChecker.selectedIds.forEach(id => {
    const drug = DRUGS_DB.find(d => d.id === id);
    if (!drug) return;

    const chip = document.createElement('div');
    chip.className = 'selected-drug-chip';
    chip.innerHTML = `
      <span>${drug.name}</span>
      <button class="remove-chip-btn" data-id="${id}">&times;</button>
    `;
    
    chip.querySelector('.remove-chip-btn').addEventListener('click', () => {
      state.interactionChecker.selectedIds = state.interactionChecker.selectedIds.filter(selectedId => selectedId !== id);
      renderInteractionChips();
      
      // Auto re-run check if empty or down to 1
      if (state.interactionChecker.selectedIds.length < 2) {
        DOM.interactionResults.innerHTML = `
          <div style="text-align: center; padding: 40px; color: var(--text-secondary); font-style: italic;">
            Add at least two medications to run the clinical cross-check analysis.
          </div>
        `;
      }
    });

    DOM.interactionChips.appendChild(chip);
  });
}

function runInteractionCrossCheck() {
  const ids = state.interactionChecker.selectedIds;
  if (ids.length < 2) {
    alert("Please select at least 2 medications to check.");
    return;
  }

  DOM.interactionResults.innerHTML = '';
  const findings = [];

  // Pairwise check of selected medications
  for (let i = 0; i < ids.length; i++) {
    for (let j = i + 1; j < ids.length; j++) {
      const id1 = ids[i];
      const id2 = ids[j];

      const match = INTERACTIONS_DB.find(inter => 
        (inter.drug1 === id1 && inter.drug2 === id2) || 
        (inter.drug1 === id2 && inter.drug2 === id1)
      );

      if (match) {
        findings.push(match);
      }
    }
  }

  // Display results
  if (findings.length === 0) {
    DOM.interactionResults.innerHTML = `
      <div class="triage-outcome green-bg" style="padding: 24px; text-align: center;">
        <h4 class="triage-title">✅ No Drug-Drug Interactions Detected</h4>
        <p style="font-size: 0.9rem; line-height: 1.5; color: var(--text-secondary);">
          No known drug interactions were found between the selected medications in our database. 
          However, this may not be an exhaustive list. Always consult your clinical pharmacist or doctor.
        </p>
      </div>
    `;
  } else {
    findings.forEach(inter => {
      const card = document.createElement('div');
      card.className = `interaction-card ${inter.severity}-border`;
      const badgeClass = inter.severity === 'severe' ? 'danger-badge' : 'warning-badge';
      
      card.innerHTML = `
        <span class="badge ${badgeClass}">${inter.severity.toUpperCase()} RISK</span>
        <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 8px;">${inter.title}</h4>
        <p style="font-size: 0.85rem; line-height: 1.5; color: var(--text-secondary);">${inter.description}</p>
      `;
      DOM.interactionResults.appendChild(card);
    });

    // Add general alert disclaimer box
    const disclaimer = document.createElement('div');
    disclaimer.className = 'medical-disclaimer-box';
    disclaimer.innerHTML = `
      <strong>🚨 Critical Pharmacy Warning:</strong> If you are prescribed medications that interact, 
      do NOT discontinue them without contacting your physician. They may adjust dosages or monitor blood values closely.
    `;
    DOM.interactionResults.appendChild(disclaimer);
  }
}

// --- SYMPTOM WIZARD TRIAGE ---
function initSymptomChecker() {
  resetSymptomWizard();

  DOM.wizardRestartBtn.addEventListener('click', () => {
    resetSymptomWizard();
  });

  DOM.wizardBackBtn.addEventListener('click', () => {
    handleWizardBack();
  });
}

function resetSymptomWizard() {
  state.symptomWizard.currentNode = 'start';
  state.symptomWizard.history = [];
  
  DOM.wizardRestartBtn.style.display = 'none';
  DOM.wizardBackBtn.style.visibility = 'hidden';
  
  // Reset nodes active status
  DOM.node1.className = 'wizard-step-node active';
  DOM.node2.className = 'wizard-step-node';
  DOM.node3.className = 'wizard-step-node';
  DOM.node4.className = 'wizard-step-node';
  DOM.wizardProgressBar.style.width = '25%';

  // Reset steps displays
  DOM.step1.className = 'wizard-step-content active';
  DOM.step2.className = 'wizard-step-content';
  DOM.step3.className = 'wizard-step-content';
  DOM.step4.className = 'wizard-step-content';

  renderWizardNode('start', DOM.step1Question, DOM.step1Options);
}

function renderWizardNode(nodeId, questionEl, optionsEl) {
  const node = SYMPTOM_FLOWCHART[nodeId];
  if (!node) return;

  questionEl.textContent = node.question;
  optionsEl.innerHTML = '';

  node.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'wizard-option-btn';
    btn.textContent = opt.text;
    btn.addEventListener('click', () => {
      handleWizardSelection(opt.next);
    });
    optionsEl.appendChild(btn);
  });
}

function handleWizardSelection(nextNodeId) {
  state.symptomWizard.history.push(state.symptomWizard.currentNode);
  state.symptomWizard.currentNode = nextNodeId;
  
  DOM.wizardBackBtn.style.visibility = 'visible';

  const nextNode = SYMPTOM_FLOWCHART[nextNodeId];
  
  if (nextNode.type === 'triage') {
    // We reached final screen (Step 4)
    showTriageResult(nextNode);
  } else {
    // We move to step 2 or 3 depending on history length
    const step = state.symptomWizard.history.length + 1; // e.g. 2 or 3
    
    // Hide all steps
    DOM.step1.className = 'wizard-step-content';
    DOM.step2.className = 'wizard-step-content';
    DOM.step3.className = 'wizard-step-content';
    DOM.step4.className = 'wizard-step-content';
    
    if (step === 2) {
      DOM.node1.className = 'wizard-step-node completed';
      DOM.node2.className = 'wizard-step-node active';
      DOM.step2.className = 'wizard-step-content active';
      DOM.wizardProgressBar.style.width = '50%';
      renderWizardNode(nextNodeId, DOM.step2Question, DOM.step2Options);
    } else if (step === 3) {
      DOM.node1.className = 'wizard-step-node completed';
      DOM.node2.className = 'wizard-step-node completed';
      DOM.node3.className = 'wizard-step-node active';
      DOM.step3.className = 'wizard-step-content active';
      DOM.wizardProgressBar.style.width = '75%';
      renderWizardNode(nextNodeId, DOM.step3Question, DOM.step3Options);
    }
  }
}

function handleWizardBack() {
  if (state.symptomWizard.history.length === 0) return;
  
  const prevNodeId = state.symptomWizard.history.pop();
  state.symptomWizard.currentNode = prevNodeId;
  
  const step = state.symptomWizard.history.length + 1;

  if (step === 1) {
    resetSymptomWizard();
  } else {
    DOM.step1.className = 'wizard-step-content';
    DOM.step2.className = 'wizard-step-content';
    DOM.step3.className = 'wizard-step-content';
    DOM.step4.className = 'wizard-step-content';
    
    DOM.wizardRestartBtn.style.display = 'none';

    if (step === 2) {
      DOM.node1.className = 'wizard-step-node completed';
      DOM.node2.className = 'wizard-step-node active';
      DOM.node3.className = 'wizard-step-node';
      DOM.node4.className = 'wizard-step-node';
      DOM.step2.className = 'wizard-step-content active';
      DOM.wizardProgressBar.style.width = '50%';
      renderWizardNode(prevNodeId, DOM.step2Question, DOM.step2Options);
    } else if (step === 3) {
      DOM.node1.className = 'wizard-step-node completed';
      DOM.node2.className = 'wizard-step-node completed';
      DOM.node3.className = 'wizard-step-node active';
      DOM.node4.className = 'wizard-step-node';
      DOM.step3.className = 'wizard-step-content active';
      DOM.wizardProgressBar.style.width = '75%';
      renderWizardNode(prevNodeId, DOM.step3Question, DOM.step3Options);
    }
  }
}

function showTriageResult(outcome) {
  // Hide active steps
  DOM.step1.className = 'wizard-step-content';
  DOM.step2.className = 'wizard-step-content';
  DOM.step3.className = 'wizard-step-content';
  DOM.step4.className = 'wizard-step-content active';

  // Mark all nodes completed
  DOM.node1.className = 'wizard-step-node completed';
  DOM.node2.className = 'wizard-step-node completed';
  DOM.node3.className = 'wizard-step-node completed';
  DOM.node4.className = 'wizard-step-node active';
  DOM.wizardProgressBar.style.width = '100%';

  DOM.wizardRestartBtn.style.display = 'block';

  let bgClass = "green-bg";
  if (outcome.level === 'RED') bgClass = "red-bg";
  else if (outcome.level === 'YELLOW') bgClass = "yellow-bg";

  let tipsHtml = '';
  outcome.tips.forEach(tip => {
    tipsHtml += `<li>${tip}</li>`;
  });

  DOM.triageResultContainer.innerHTML = `
    <div class="triage-outcome ${bgClass}">
      <h3 class="triage-title">${outcome.title}</h3>
      <p class="triage-action">👉 ${outcome.action}</p>
      <h4 style="font-size: 0.85rem; font-weight: 700; margin-bottom: 8px; text-transform: uppercase;">Clinical Triage Guidelines:</h4>
      <ul class="triage-tips-list">
        ${tipsHtml}
      </ul>
    </div>
  `;
}

// --- MEDICATION REMINDERS ---
function initReminders() {
  // Populate reminders drug select dropdown
  DOM.remMedSelect.innerHTML = '<option value="" disabled selected>Select from database...</option>';
  DRUGS_DB.forEach(drug => {
    const opt = document.createElement('option');
    opt.value = drug.name;
    opt.textContent = `${drug.name} (${drug.brand})`;
    DOM.remMedSelect.appendChild(opt);
  });

  // Handle Form Submission to add reminder
  DOM.reminderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const medName = DOM.remMedSelect.value;
    const dosage = DOM.remDosage.value.trim();
    const time = DOM.remTime.value;
    const freq = DOM.remFrequency.value;

    const newReminder = {
      id: Date.now().toString(),
      medName,
      dosage,
      time,
      frequency: freq,
      loggedToday: null // 'taken', 'skipped', or null
    };

    state.reminders.push(newReminder);
    
    // Sort reminders chronologically by time
    state.reminders.sort((a,b) => a.time.localeCompare(b.time));
    
    saveState();
    renderRemindersUI();
    
    // Reset Form fields
    DOM.remMedSelect.value = '';
    DOM.remDosage.value = '';
    DOM.remTime.value = '';
    
    // Request notification permission if not yet granted
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  });

  // Render initial list
  renderRemindersUI();
}

function renderRemindersUI() {
  DOM.remindersList.innerHTML = '';
  DOM.dashboardRemindersList.innerHTML = '';

  if (state.reminders.length === 0) {
    const emptyState = `<p style="color: var(--text-secondary); font-style: italic; font-size: 0.9rem; padding: 20px 0;">No active medication reminders scheduled.</p>`;
    DOM.remindersList.innerHTML = emptyState;
    DOM.dashboardRemindersList.innerHTML = `<p style="color: var(--text-secondary); font-style: italic; font-size: 0.85rem;">No active schedules. Go to Pill Reminders to add one.</p>`;
    return;
  }

  state.reminders.forEach(rem => {
    // 1. Render in Pill Reminders Tab
    const card = document.createElement('div');
    card.className = 'reminder-card';
    
    let btnText = "Log Dose";
    let btnClass = "";
    if (rem.loggedToday === 'taken') {
      btnText = "Taken ✓";
      btnClass = "taken";
    } else if (rem.loggedToday === 'skipped') {
      btnText = "Skipped ✗";
      btnClass = "skipped";
    }

    card.innerHTML = `
      <div class="reminder-time-badge">${formatTime(rem.time)}</div>
      <div class="reminder-details">
        <div class="reminder-drug-name">${rem.medName}</div>
        <div class="reminder-meta">
          <span>Dose: ${rem.dosage}</span>
          <span>•</span>
          <span>${rem.frequency}</span>
        </div>
      </div>
      <div class="reminder-actions">
        <button class="dose-log-btn ${btnClass}" data-id="${rem.id}">${btnText}</button>
        <button class="delete-reminder-btn" data-id="${rem.id}">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width: 18px; height: 18px;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </button>
      </div>
    `;

    // Log dose button action
    card.querySelector('.dose-log-btn').addEventListener('click', (e) => {
      toggleDoseLog(rem.id);
    });

    // Delete reminder action
    card.querySelector('.delete-reminder-btn').addEventListener('click', () => {
      deleteReminder(rem.id);
    });

    DOM.remindersList.appendChild(card);

    // 2. Render summary in Dashboard
    if (rem.loggedToday !== 'taken') {
      const dashItem = document.createElement('div');
      dashItem.className = 'reminder-card';
      dashItem.style.padding = '10px 14px';
      dashItem.style.borderRadius = '12px';
      
      dashItem.innerHTML = `
        <div class="reminder-time-badge" style="font-size: 0.9rem; padding: 4px 8px; min-width: 70px;">${formatTime(rem.time)}</div>
        <div class="reminder-details">
          <div class="reminder-drug-name" style="font-size: 0.85rem; margin-bottom: 2px;">${rem.medName}</div>
          <div class="reminder-meta" style="font-size: 0.75rem;">
            <span>Dose: ${rem.dosage}</span>
          </div>
        </div>
      `;
      DOM.dashboardRemindersList.appendChild(dashItem);
    }
  });

  if (DOM.dashboardRemindersList.children.length === 0) {
    DOM.dashboardRemindersList.innerHTML = `<p style="color: var(--status-success); font-style: italic; font-size: 0.85rem; font-weight: 500;">🎉 All doses taken for today!</p>`;
  }
}

function toggleDoseLog(id) {
  const rem = state.reminders.find(r => r.id === id);
  if (!rem) return;

  if (rem.loggedToday === null) {
    rem.loggedToday = 'taken';
  } else if (rem.loggedToday === 'taken') {
    rem.loggedToday = 'skipped';
  } else {
    rem.loggedToday = null;
  }

  saveState();
  renderRemindersUI();
}

function deleteReminder(id) {
  state.reminders = state.reminders.filter(r => r.id !== id);
  saveState();
  renderRemindersUI();
}

function formatTime(time24) {
  const [hours, minutes] = time24.split(':');
  let h = parseInt(hours);
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  h = h ? h : 12; // 0 should be 12
  return `${h}:${minutes} ${ampm}`;
}

// Check if any medication scheduled for now needs trigger notification
function checkMedicationReminders() {
  const now = new Date();
  const currentTimeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  
  state.reminders.forEach(rem => {
    if (rem.time === currentTimeString && rem.loggedToday === null) {
      triggerLocalNotification(rem);
    }
  });

  // Daily reset check: Reset logged doses at midnight
  if (currentTimeString === '00:00') {
    state.reminders.forEach(rem => rem.loggedToday = null);
    saveState();
    renderRemindersUI();
  }
}

function triggerLocalNotification(reminder) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(`MedZamanti Pill Alert`, {
      body: `Time to take your ${reminder.medName} (${reminder.dosage})`,
      icon: './icon.png',
      tag: reminder.id
    });
  }
  // Fallback fallback audio beep
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioContext.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, audioContext.currentTime); // A4 note
    osc.connect(audioContext.destination);
    osc.start();
    osc.stop(audioContext.currentTime + 0.5); // Beep for 0.5s
  } catch (e) {
    console.log("Audio alert blocked by browser autoplay rules");
  }
}

// --- PILL TRAITS & IDENTIFIER ---
function initPillIdentifier() {
  DOM.pillColorSelect.addEventListener('change', runPillSearchAndPreview);
  DOM.pillShapeSelect.addEventListener('change', runPillSearchAndPreview);
  DOM.pillImprintInput.addEventListener('input', runPillSearchAndPreview);
  
  runPillSearchAndPreview();
}

function runPillSearchAndPreview() {
  const selectedColor = DOM.pillColorSelect.value;
  const selectedShape = DOM.pillShapeSelect.value;
  const imprintFilter = DOM.pillImprintInput.value.toLowerCase().trim();

  // 1. Update visual SVG Pill Preview
  updatePillSVGPreview(selectedColor, selectedShape, imprintFilter || "MED");

  // 2. Query matches from database
  const matches = DRUGS_DB.filter(drug => {
    let matchesColor = selectedColor === 'any' || drug.pill.color === selectedColor;
    let matchesShape = selectedShape === 'any' || drug.pill.shape === selectedShape;
    let matchesImprint = true;

    if (imprintFilter) {
      matchesImprint = drug.pill.imprint.toLowerCase().includes(imprintFilter);
    }

    return matchesColor && matchesShape && matchesImprint;
  });

  // 3. Render matching drugs list
  DOM.pillIdentifierResults.innerHTML = '';
  if (matches.length === 0) {
    DOM.pillIdentifierResults.innerHTML = `<p style="font-size: 0.85rem; color: var(--text-muted); font-style: italic;">No matching pills in our database.</p>`;
    return;
  }

  matches.forEach(drug => {
    const pillBtn = document.createElement('button');
    pillBtn.className = 'checkbox-label';
    pillBtn.style.width = '100%';
    pillBtn.style.textAlign = 'left';
    pillBtn.style.justifyContent = 'space-between';
    pillBtn.style.marginBottom = '6px';
    
    pillBtn.innerHTML = `
      <div>
        <strong>${drug.name}</strong> (${drug.brand})
        <br><small style="color: var(--text-muted)">Imprint: ${drug.pill.imprint} | Class: ${drug.class}</small>
      </div>
      <span style="font-size: 0.8rem; color: var(--primary);">View &rarr;</span>
    `;

    pillBtn.addEventListener('click', () => {
      openDrugModal(drug);
    });

    DOM.pillIdentifierResults.appendChild(pillBtn);
  });
}

function updatePillSVGPreview(color, shape, imprint) {
  const fillMap = {
    'any': '#f8fafc',
    'White': '#e2e8f0',
    'Brown': '#a16207',
    'Blue/Pink': 'blue-pink', // gradient reference
    'Pink': '#f472b6',
    'Blue': '#38bdf8',
    'Purple': '#c084fc',
    'Peach': '#fdba74',
    'Yellow': '#fde047'
  };

  const fillColor = fillMap[color] || '#f8fafc';
  let svgContent = '';

  // Setup gradient if Blue/Pink is selected
  let defs = '';
  let fillAttr = fillColor;
  
  if (fillColor === 'blue-pink') {
    defs = `
      <defs>
        <linearGradient id="bluePinkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="50%" stop-color="#38bdf8" />
          <stop offset="50%" stop-color="#f472b6" />
        </linearGradient>
      </defs>
    `;
    fillAttr = 'url(#bluePinkGrad)';
  }

  const imprintText = imprint.substring(0, 10).toUpperCase();

  // Render SVG elements based on shape
  if (shape === 'Round' || shape === 'any') {
    svgContent = `
      ${defs}
      <circle cx="50" cy="50" r="28" fill="${fillAttr}" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" />
      <line x1="50" y1="22" x2="50" y2="78" stroke="rgba(0,0,0,0.15)" stroke-width="1" />
      <text x="50" y="54" fill="rgba(0,0,0,0.4)" font-size="7" font-weight="700" text-anchor="middle" font-family="sans-serif">${imprintText}</text>
    `;
  } else if (shape === 'Capsule' || shape === 'Oval') {
    svgContent = `
      ${defs}
      <rect x="18" y="32" width="64" height="36" rx="18" fill="${fillAttr}" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" />
      <line x1="50" y1="32" x2="50" y2="68" stroke="rgba(0,0,0,0.15)" stroke-width="1.5" />
      <text x="50" y="53" fill="rgba(0,0,0,0.4)" font-size="7" font-weight="700" text-anchor="middle" font-family="sans-serif">${imprintText}</text>
    `;
  } else if (shape === 'Diamond') {
    svgContent = `
      ${defs}
      <polygon points="50,15 85,50 50,85 15,50" fill="${fillAttr}" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" />
      <line x1="50" y1="15" x2="50" y2="85" stroke="rgba(0,0,0,0.1)" stroke-width="1" />
      <text x="50" y="53" fill="rgba(0,0,0,0.4)" font-size="6" font-weight="700" text-anchor="middle" font-family="sans-serif">${imprintText}</text>
    `;
  } else if (shape === 'Inhaler') {
    svgContent = `
      ${defs}
      <path d="M40 15h20v45l15 15v10H35v-10l10-10V15z" fill="${fillAttr === 'url(#bluePinkGrad)' ? '#38bdf8' : fillAttr}" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" />
      <path d="M48 60h16v10H48z" fill="#f472b6" />
      <text x="50" y="40" fill="rgba(0,0,0,0.4)" font-size="6" font-weight="700" text-anchor="middle" font-family="sans-serif">${imprintText}</text>
    `;
  }

  DOM.pillSvg.innerHTML = svgContent;
}

// --- EMERGENCY VIEW CALL SIMULATION ---
function initEmergency() {
  DOM.emergencyPhoneCallBtn.addEventListener('click', () => {
    if (confirm("You are about to place a call to Emergency Services (911). Are you sure?")) {
      window.location.href = "tel:911";
    }
  });
}

// --- DRUG DETAILS MODAL ---
function initModal() {
  DOM.modalCloseBtn.addEventListener('click', () => {
    DOM.drugDetailModal.classList.remove('active');
  });

  // Close modal when clicking outside contents
  DOM.drugDetailModal.addEventListener('click', (e) => {
    if (e.target === DOM.drugDetailModal) {
      DOM.drugDetailModal.classList.remove('active');
    }
  });
}

// --- PWA INSTALLATION MANAGEMENT ---
let deferredPrompt;

function initPwaInstallation() {
  // Listen for the beforeinstallprompt event
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the default browser mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    
    // Check if the user has previously dismissed the banner in this session
    const isDismissed = sessionStorage.getItem('pwa_install_dismissed') === 'true';
    
    // Show the custom install UI elements
    if (DOM.pwaInstallBtn) DOM.pwaInstallBtn.style.display = 'flex';
    if (DOM.pwaInstallBanner && !isDismissed) {
      DOM.pwaInstallBanner.style.display = 'flex';
    }
  });

  // Handle the sidebar install button click
  if (DOM.pwaInstallBtn) {
    DOM.pwaInstallBtn.addEventListener('click', () => {
      triggerPwaInstall();
    });
  }

  // Handle the dashboard banner install button click
  if (DOM.pwaInstallBannerBtn) {
    DOM.pwaInstallBannerBtn.addEventListener('click', () => {
      triggerPwaInstall();
    });
  }

  // Handle dismiss click on general install banner
  if (DOM.pwaInstallBannerClose) {
    DOM.pwaInstallBannerClose.addEventListener('click', () => {
      if (DOM.pwaInstallBanner) DOM.pwaInstallBanner.style.display = 'none';
      sessionStorage.setItem('pwa_install_dismissed', 'true');
    });
  }

  // iOS PWA Detection and Guide Banner
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const isStandalone = window.navigator.standalone === true || window.matchMedia('(display-mode: standalone)').matches;
  
  if (isIOS && !isStandalone) {
    const isIosDismissed = sessionStorage.getItem('ios_install_dismissed') === 'true';
    if (DOM.iosInstallBanner && !isIosDismissed) {
      DOM.iosInstallBanner.style.display = 'flex';
    }
  }

  // Handle dismiss click on iOS banner
  if (DOM.iosInstallBannerClose) {
    DOM.iosInstallBannerClose.addEventListener('click', () => {
      if (DOM.iosInstallBanner) DOM.iosInstallBanner.style.display = 'none';
      sessionStorage.setItem('ios_install_dismissed', 'true');
    });
  }

  // Listen for successful installation
  window.addEventListener('appinstalled', (evt) => {
    console.log('MedZamanti was successfully installed!');
    deferredPrompt = null;
    hidePwaInstallUI();
  });
}

function triggerPwaInstall() {
  if (!deferredPrompt) return;
  
  // Show the browser's install prompt
  deferredPrompt.prompt();
  
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    deferredPrompt = null;
    hidePwaInstallUI();
  });
}

function hidePwaInstallUI() {
  if (DOM.pwaInstallBtn) DOM.pwaInstallBtn.style.display = 'none';
  if (DOM.pwaInstallBanner) DOM.pwaInstallBanner.style.display = 'none';
}

function openDrugModal(drug) {
  DOM.modalDrugClass.textContent = drug.class;
  DOM.modalDrugName.textContent = drug.name;
  DOM.modalDrugBrand.textContent = drug.brand;

  let indicationsList = '';
  drug.indications.forEach(ind => {
    indicationsList += `<li>${ind}</li>`;
  });

  let sideEffectsList = '';
  drug.sideEffects.forEach(side => {
    sideEffectsList += `<li>${side}</li>`;
  });

  // Assess if allergic or contraindicated to insert dynamic safety warning
  const isAllergic = state.profile.allergies.some(al => drug.name.toLowerCase().includes(al.toLowerCase()) || drug.class.toLowerCase().includes(al.toLowerCase()));
  const matchingContra = state.profile.conditions.filter(cond => {
    return drug.contraindications.some(contra => contra.toLowerCase().includes(cond.toLowerCase()));
  });

  let modalAlertHtml = "";
  if (isAllergic) {
    modalAlertHtml += `
      <div class="alert-box danger-box" style="margin-top: 0; margin-bottom: 16px;">
        <strong>🚨 CRITICAL ALLERGY ALERT:</strong> Your profile indicates allergies to <strong>${state.profile.allergies.join(", ")}</strong>. 
        Taking this medication poses a severe hypersensitivity risk.
      </div>
    `;
  }
  if (matchingContra.length > 0) {
    modalAlertHtml += `
      <div class="alert-box warning-box" style="margin-top: 0; margin-bottom: 16px;">
        <strong>⚠️ PRECAUTION CONTRAINDICATION:</strong> You have chronic conditions: <strong>${matchingContra.join(", ")}</strong>. 
        This medication has contraindications for patients with these disorders.
      </div>
    `;
  }

  DOM.modalDrugBody.innerHTML = `
    ${modalAlertHtml}
    <p style="font-size: 0.95rem; line-height: 1.5; color: var(--text-primary); margin-bottom: 20px;">
      ${drug.description}
    </p>

    <h4 style="font-size: 0.85rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 8px;">Clinical Summary Table</h4>
    <table class="clinical-table">
      <tbody>
        <tr>
          <td><strong>Indications</strong></td>
          <td><ul style="padding-left: 16px;">${indicationsList}</ul></td>
        </tr>
        <tr>
          <td><strong>Standard Adult Dose</strong></td>
          <td>${drug.dosage.adult}</td>
        </tr>
        <tr>
          <td><strong>Standard Child Dose</strong></td>
          <td>${drug.dosage.child}</td>
        </tr>
        <tr>
          <td><strong>Common Side Effects</strong></td>
          <td><ul style="padding-left: 16px;">${sideEffectsList}</ul></td>
        </tr>
        <tr>
          <td><strong>Warnings</strong></td>
          <td style="color: var(--status-warning); font-weight: 500;">${drug.warnings}</td>
        </tr>
        <tr>
          <td><strong>Contraindications</strong></td>
          <td>${drug.contraindications.join("<br>• ")}</td>
        </tr>
        <tr>
          <td><strong>Food Interactions</strong></td>
          <td>${drug.foodInteractions}</td>
        </tr>
        <tr>
          <td><strong>Pill Visuals</strong></td>
          <td>Color: ${drug.pill.color} | Shape: ${drug.pill.shape} | Imprint: ${drug.pill.imprint}</td>
        </tr>
      </tbody>
    </table>
  `;

  DOM.drugDetailModal.classList.add('active');
}

// --- MULTI-USER AUTHENTICATION CONTROLLERS ---
function initAuthentication() {
  // View switches
  DOM.switchToSignup.addEventListener('click', () => {
    DOM.loginFormView.style.display = 'none';
    DOM.signupFormView.style.display = 'block';
  });

  DOM.switchToLogin.addEventListener('click', () => {
    DOM.loginFormView.style.display = 'block';
    DOM.signupFormView.style.display = 'none';
  });

  // Action listeners
  DOM.loginBtn.addEventListener('click', loginUser);
  DOM.signupBtn.addEventListener('click', signupUser);
  DOM.logoutBtn.addEventListener('click', logoutUser);

  // Pressing Enter key to trigger login
  DOM.loginPassword.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') loginUser();
  });
}

function loginUser() {
  const email = DOM.loginEmail.value.trim().toLowerCase();
  const password = DOM.loginPassword.value.trim();

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  const users = JSON.parse(localStorage.getItem('medzamanti_users')) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert("Invalid email or password. Please try again.");
    return;
  }

  // Set active user session
  state.currentUserEmail = email;
  localStorage.setItem('medzamanti_active_user', email);

  // Load user data
  state.profile = user.profile || { name: '', age: '', gender: 'Unspecified', allergies: [], conditions: [], medications: [] };
  state.reminders = user.reminders || [];
  state.geminiKey = user.geminiKey || '';
  state.chatHistory = user.chatHistory || [];

  // Reset forms
  DOM.loginEmail.value = '';
  DOM.loginPassword.value = '';

  // UI transition
  DOM.authContainer.style.display = 'none';
  DOM.appContainer.style.display = 'flex';

  // Navigation and re-renders
  switchTab('dashboard');
  syncProfileUI();
  updateDashboardStats();
  
  if (typeof renderRemindersUI === 'function') {
    renderRemindersUI();
  }
  renderLoadedChatHistory();
}

function signupUser() {
  const name = DOM.signupName.value.trim();
  const email = DOM.signupEmail.value.trim().toLowerCase();
  const password = DOM.signupPassword.value.trim();
  const confirmPassword = DOM.signupConfirmPassword.value.trim();

  if (!name || !email || !password || !confirmPassword) {
    alert("Please fill in all signup fields.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters.");
    return;
  }

  const users = JSON.parse(localStorage.getItem('medzamanti_users')) || [];
  const exists = users.some(u => u.email === email);

  if (exists) {
    alert("This email address is already registered.");
    return;
  }

  const newUser = {
    email,
    password,
    profile: {
      name,
      age: '',
      gender: 'Unspecified',
      allergies: [],
      conditions: [],
      medications: []
    },
    reminders: [],
    geminiKey: '',
    chatHistory: []
  };

  users.push(newUser);
  localStorage.setItem('medzamanti_users', JSON.stringify(users));

  // Set active user session
  state.currentUserEmail = email;
  localStorage.setItem('medzamanti_active_user', email);

  // Load user data
  state.profile = newUser.profile;
  state.reminders = newUser.reminders;
  state.geminiKey = newUser.geminiKey;
  state.chatHistory = newUser.chatHistory;

  // Reset form
  DOM.signupName.value = '';
  DOM.signupEmail.value = '';
  DOM.signupPassword.value = '';
  DOM.signupConfirmPassword.value = '';

  // UI transition
  DOM.authContainer.style.display = 'none';
  DOM.appContainer.style.display = 'flex';

  // Navigation and re-renders
  switchTab('dashboard');
  syncProfileUI();
  updateDashboardStats();
  
  if (typeof renderRemindersUI === 'function') {
    renderRemindersUI();
  }
  renderLoadedChatHistory();
}

function logoutUser() {
  if (confirm("Are you sure you want to sign out?")) {
    saveState();
    
    // Clear session
    state.currentUserEmail = null;
    localStorage.removeItem('medzamanti_active_user');

    // Reset local state to blank
    state.profile = { name: '', age: '', gender: 'Unspecified', allergies: [], conditions: [], medications: [] };
    state.reminders = [];
    state.geminiKey = '';
    state.chatHistory = [];

    // Reset forms
    DOM.loginEmail.value = '';
    DOM.loginPassword.value = '';

    // Switch screens
    DOM.authContainer.style.display = 'flex';
    DOM.appContainer.style.display = 'none';
  }
}

function renderLoadedChatHistory() {
  DOM.chatMessages.innerHTML = '';
  
  if (state.chatHistory.length === 0) {
    DOM.chatMessages.innerHTML = `
      <div class="chat-message system">
        <div class="message-icon">🤖</div>
        <div class="message-bubble">
          <h3>Hello! I am MedZamanti AI.</h3>
          <p>I am your clinical medical and pharmacy assistant. You can ask me any questions about medications, active brand names, dosages, side effects, and warning systems.</p>
        </div>
      </div>
    `;
  } else {
    state.chatHistory.forEach(msg => {
      appendChatBubble(msg.text, msg.role);
    });
  }
  scrollChatToBottom();
}
