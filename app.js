import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const config = window.APP_CONFIG || {};

function normalizeSupabaseUrl(value) {
  return String(value || '').trim()
    .replace(/\/+(rest\/v1\/?$)/i, '')
    .replace(/\/$/, '');
}

const supabaseUrl = normalizeSupabaseUrl(config.SUPABASE_URL);
const supabaseKey = config.SUPABASE_PUBLISHABLE_KEY || config.SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

const translations = {
  en: {
    eyebrow: 'COLLABORATIVE ARCHIVE', title: 'Ánima: The Inner Landscape',
    subtitle: 'Preserve the story of an object and share it with the community.',
    tabAdd: 'Add object', tabArchive: 'Archive', adminAccess: 'Administration',
    registerTitle: 'Register an object',
    registerIntro: 'Complete the three fields. The photograph and memory will be associated with the stated place and date.',
    photoLabel: 'Photograph of the object', photoHint: 'JPG, PNG or WEBP. Maximum 8 MB.',
    memoryLabel: 'Story or memory of the object',
    memoryHint: 'Write it here or load a text file (.txt or .md).', loadText: 'Load text',
    placeDateLabel: 'Place and date', placeLabel: 'Place', dateLabel: 'Date', save: 'Save to the archive',
    privacyNote: 'To let you delete your own submissions without requiring an account, this site uses an anonymous identity linked to this browser. If you clear site data or switch devices, you will not be able to recover those submissions from the new device.',
    archiveTitle: 'Object archive', loading: 'Loading…', searchLabel: 'Search', searchPlaceholder: 'Search by place or memory…',
    emptyTitle: 'There are no archived objects yet', emptyText: 'When someone completes the form, it will appear here.',
    footer: 'Objects and memories archive', adminEyebrow: 'RESTRICTED AREA', adminTitle: 'Administrative access',
    adminIntro: 'Administrators can delete any object from the archive.', emailLabel: 'Email address', passwordLabel: 'Password',
    login: 'Sign in', adminSessionEyebrow: 'ADMINISTRATION ACTIVE', adminSignedIn: 'Administrative session active', logout: 'Sign out',
    saveLoading: 'Saving…', saved: 'The object was saved to the archive.', fillAll: 'Please complete all fields.',
    photoTooBig: 'The photograph exceeds the 8 MB limit.', textTooBig: 'The text file exceeds the 200 KB limit.',
    textReadError: 'The text file could not be read.', photoPreviewAlt: 'Object preview', submitError: 'The object could not be saved.',
    archiveLoadError: 'The archive could not be loaded.', oneObject: 'archived object', manyObjects: 'archived objects', memoryTitle: 'Object memory',
    delete: 'Delete', own: 'Your object', admin: 'Administrator',
    deleteConfirm: 'Delete this object and its photograph from the archive? This action cannot be undone.', deleteLoading: 'Deleting…',
    deleteSuccess: 'The object was deleted.', deleteError: 'The object could not be deleted.', myObject: 'Object uploaded by you',
    adminObject: 'Administrative deletion', loginNeeded: 'Sign in as an administrator to use this function.',
    invalidCredentials: 'Sign-in failed. Check the email and password.', notAdmin: 'The account is signed in but does not have administrator permissions.',
    loggedOut: 'Administrative session closed.', authError: 'Could not create this browser’s anonymous identity. Make sure Anonymous Sign-Ins are enabled in Supabase.',
    configError: 'Configure config.js with your Supabase URL and Publishable key.', publicPhotoAlt: 'Photograph of archived object', close: 'Close'
  },
  de: {
    eyebrow: 'KOLLABORATIVES ARCHIV', title: 'Ánima: Die innere Landschaft',
    subtitle: 'Bewahre die Geschichte eines Gegenstands und teile sie mit der Gemeinschaft.',
    tabAdd: 'Objekt hinzufügen', tabArchive: 'Archiv', adminAccess: 'Administration',
    registerTitle: 'Objekt registrieren',
    registerIntro: 'Fülle die drei Felder aus. Foto und Erinnerung werden mit dem angegebenen Ort und Datum verbunden.',
    photoLabel: 'Foto des Objekts', photoHint: 'JPG, PNG oder WEBP. Maximal 8 MB.',
    memoryLabel: 'Geschichte oder Erinnerung des Objekts', memoryHint: 'Hier schreiben oder eine Textdatei (.txt oder .md) laden.', loadText: 'Text laden',
    placeDateLabel: 'Ort und Datum', placeLabel: 'Ort', dateLabel: 'Datum', save: 'Im Archiv speichern',
    privacyNote: 'Damit du deine eigenen Einträge löschen kannst, ohne ein Konto anlegen zu müssen, verwendet diese Seite eine anonyme Identität, die an diesen Browser gebunden ist. Wenn du die Websitedaten löschst oder das Gerät wechselst, kannst du diese Einträge auf dem neuen Gerät nicht wiederherstellen.',
    archiveTitle: 'Objektarchiv', loading: 'Wird geladen…', searchLabel: 'Suchen', searchPlaceholder: 'Nach Ort oder Erinnerung suchen…',
    emptyTitle: 'Noch keine Objekte archiviert', emptyText: 'Sobald jemand das Formular ausfüllt, erscheint der Eintrag hier.',
    footer: 'Archiv für Objekte und Erinnerungen', adminEyebrow: 'GESCHÜTZTER BEREICH', adminTitle: 'Administrativer Zugang',
    adminIntro: 'Administratoren können jedes Objekt aus dem Archiv löschen.', emailLabel: 'E-Mail-Adresse', passwordLabel: 'Passwort', login: 'Anmelden',
    adminSessionEyebrow: 'ADMINISTRATION AKTIV', adminSignedIn: 'Administrative Sitzung aktiv', logout: 'Abmelden',
    saveLoading: 'Wird gespeichert…', saved: 'Das Objekt wurde im Archiv gespeichert.', fillAll: 'Bitte fülle alle Felder aus.',
    photoTooBig: 'Das Foto überschreitet das Limit von 8 MB.', textTooBig: 'Die Textdatei überschreitet das Limit von 200 KB.',
    textReadError: 'Die Textdatei konnte nicht gelesen werden.', photoPreviewAlt: 'Vorschau des Objekts', submitError: 'Das Objekt konnte nicht gespeichert werden.',
    archiveLoadError: 'Das Archiv konnte nicht geladen werden.', oneObject: 'archiviertes Objekt', manyObjects: 'archivierte Objekte', memoryTitle: 'Erinnerung an das Objekt',
    delete: 'Löschen', own: 'Dein Objekt', admin: 'Administrator',
    deleteConfirm: 'Dieses Objekt und sein Foto aus dem Archiv löschen? Diese Aktion kann nicht rückgängig gemacht werden.', deleteLoading: 'Wird gelöscht…',
    deleteSuccess: 'Das Objekt wurde gelöscht.', deleteError: 'Das Objekt konnte nicht gelöscht werden.', myObject: 'Von dir hochgeladenes Objekt',
    adminObject: 'Administrative Löschung', loginNeeded: 'Melde dich als Administrator an, um diese Funktion zu verwenden.',
    invalidCredentials: 'Anmeldung fehlgeschlagen. Prüfe E-Mail und Passwort.', notAdmin: 'Das Konto ist angemeldet, hat aber keine Administratorrechte.',
    loggedOut: 'Administrative Sitzung beendet.', authError: 'Die anonyme Identität dieses Browsers konnte nicht erstellt werden. Aktiviere Anonymous Sign-Ins in Supabase.',
    configError: 'Konfiguriere config.js mit der Supabase-URL und dem Publishable Key.', publicPhotoAlt: 'Foto des archivierten Objekts', close: 'Schließen'
  }
};

const form = document.getElementById('object-form');
const photoInput = document.getElementById('photo');
const photoPreview = document.getElementById('photo-preview');
const memory = document.getElementById('memory');
const memoryFile = document.getElementById('memory-file');
const memoryFileName = document.getElementById('memory-file-name');
const formStatus = document.getElementById('form-status');
const submitButton = document.getElementById('submit-button');
const gallery = document.getElementById('gallery');
const archiveCount = document.getElementById('archive-count');
const emptyState = document.getElementById('empty-state');
const searchInput = document.getElementById('search');
const tabs = document.querySelectorAll('.tab');
const languageButtons = document.querySelectorAll('.language-button');
const views = { submit: document.getElementById('view-submit'), archive: document.getElementById('view-archive') };
const adminModal = document.getElementById('admin-modal');
const adminLoginView = document.getElementById('admin-login-view');
const adminSessionView = document.getElementById('admin-session-view');
const adminLoginForm = document.getElementById('admin-login-form');
const adminLoginButton = document.getElementById('admin-login-button');
const adminStatus = document.getElementById('admin-status');
const adminEmailInput = document.getElementById('admin-email');
const adminSessionEmail = document.getElementById('admin-session-email');
const adminOpenButtons = [document.getElementById('admin-open'), document.getElementById('admin-open-footer')];
const adminClose = document.getElementById('admin-close');
const adminLogout = document.getElementById('admin-logout');

let archiveItems = [];
let currentLang = ['en', 'de'].includes(localStorage.getItem('objectsArchiveLang')) ? localStorage.getItem('objectsArchiveLang') : 'en';
let currentUser = null;
let isAdmin = false;
let authReady = false;

function t(key) { return translations[currentLang][key] ?? translations.en[key] ?? key; }
function setStatus(message, kind = '') { formStatus.textContent = message; formStatus.className = `status ${kind}`.trim(); }
function setAdminStatus(message, kind = '') { adminStatus.textContent = message; adminStatus.className = `status ${kind}`.trim(); }
function escapeDateLocale() { return currentLang === 'de' ? 'de-DE' : 'en-US'; }
function formatDate(dateString) {
  const d = new Date(`${dateString}T00:00:00`);
  return new Intl.DateTimeFormat(escapeDateLocale(), { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
}
function safeFileName(name) {
  return name.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/^-+|-+$/g, '');
}
function isAnonymousUser(user = currentUser) { return !!user?.is_anonymous; }

function applyLanguage(lang) {
  if (!translations[lang]) lang = 'en';
  currentLang = lang;
  localStorage.setItem('objectsArchiveLang', lang);
  document.documentElement.lang = lang;
  document.title = t('title');
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  const placeholders = { memory: currentLang === 'de' ? "Was ist der Gegenstand? Wem gehörte er? Woran erinnerst du dich? Was repräsentiert dieses Objekt in Bezug auf Ihre eigene Geschichte oder die von jemand anderem oder einen bestimmten Kontext?" : "What is the object? Who did it belong to? What do you remember about it? What does that object represent regarding your own or someone else's history, or a particular context?", place: currentLang === 'de' ? 'z. B. Berlin' : 'E.g. New York' };
  document.getElementById('memory').placeholder = placeholders.memory;
  document.getElementById('place').placeholder = placeholders.place;
  searchInput.placeholder = t('searchPlaceholder');
  document.getElementById('admin-close').setAttribute('aria-label', t('close'));
  languageButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.lang === currentLang));
  renderArchive();
}

async function ensureAnonymousSession() {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) return session.user;
  const { data, error } = await supabase.auth.signInAnonymously();
  if (error) throw error;
  return data.user;
}

async function refreshAdminState() {
  currentUser = (await supabase.auth.getUser()).data.user || null;
  isAdmin = false;
  if (currentUser && !isAnonymousUser()) {
    const { data, error } = await supabase.rpc('is_admin');
    isAdmin = !error && data === true;
  }
  if (isAdmin) {
    adminLoginView.classList.add('hidden');
    adminSessionView.classList.remove('hidden');
    adminSessionEmail.textContent = currentUser?.email || '';
  } else {
    adminLoginView.classList.remove('hidden');
    adminSessionView.classList.add('hidden');
    if (currentUser?.email) setAdminStatus(t('notAdmin'), 'error');
  }
  renderArchive();
}

photoInput.addEventListener('change', () => {
  const file = photoInput.files?.[0];
  photoPreview.innerHTML = '';
  photoPreview.classList.add('hidden');
  if (!file) return;
  if (file.size > 8 * 1024 * 1024) {
    setStatus(t('photoTooBig'), 'error'); photoInput.value = ''; return;
  }
  const img = document.createElement('img');
  img.alt = t('photoPreviewAlt');
  img.src = URL.createObjectURL(file);
  photoPreview.appendChild(img);
  photoPreview.classList.remove('hidden');
});

memoryFile.addEventListener('change', async () => {
  const file = memoryFile.files?.[0];
  if (!file) return;
  if (file.size > 200 * 1024) { setStatus(t('textTooBig'), 'error'); memoryFile.value = ''; return; }
  try {
    memory.value = await file.text();
    memoryFileName.textContent = file.name;
  } catch {
    setStatus(t('textReadError'), 'error');
  }
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  setStatus(t('saveLoading'));
  submitButton.disabled = true;
  try {
    const photo = photoInput.files?.[0];
    const place = document.getElementById('place').value.trim();
    const memoryDate = document.getElementById('memory-date').value;
    const memoryText = memory.value.trim();
    if (!photo || !memoryText || !place || !memoryDate) throw new Error(t('fillAll'));
    if (photo.size > 8 * 1024 * 1024) throw new Error(t('photoTooBig'));
    if (!currentUser) currentUser = await ensureAnonymousSession();

    const extension = (photo.name.split('.').pop() || 'jpg').toLowerCase();
    const path = `${crypto.randomUUID()}-${safeFileName(photo.name) || `object.${extension}`}`;
    const { error: uploadError } = await supabase.storage.from('objects').upload(path, photo, {
      contentType: photo.type, cacheControl: '3600', upsert: false
    });
    if (uploadError) throw uploadError;

    const { data: publicData } = supabase.storage.from('objects').getPublicUrl(path);
    const { error: insertError } = await supabase.from('objects_archive').insert({
      photo_url: publicData.publicUrl, photo_path: path, memory: memoryText, place, memory_date: memoryDate,
      owner_id: currentUser.id
    });
    if (insertError) {
      await supabase.storage.from('objects').remove([path]);
      throw insertError;
    }

    form.reset(); photoPreview.innerHTML = ''; photoPreview.classList.add('hidden'); memoryFileName.textContent = '';
    setStatus(t('saved'), 'ok');
    await loadArchive();
  } catch (error) {
    console.error(error);
    if (!authReady && /anonymous/i.test(error?.message || '')) setStatus(t('authError'), 'error');
    else setStatus(error.message || t('submitError'), 'error');
  } finally { submitButton.disabled = false; }
});

tabs.forEach(tab => tab.addEventListener('click', () => {
  const view = tab.dataset.view;
  tabs.forEach(t => t.classList.toggle('active', t === tab));
  Object.entries(views).forEach(([name, element]) => {
    const active = name === view;
    element.classList.toggle('active-view', active); element.hidden = !active;
  });
  if (view === 'archive') loadArchive();
}));

searchInput.addEventListener('input', renderArchive);
languageButtons.forEach(btn => btn.addEventListener('click', () => applyLanguage(btn.dataset.lang)));

function canDelete(item) { return isAdmin || (currentUser && item.owner_id === currentUser.id); }

function makeDeleteButton(item) {
  if (!canDelete(item)) return null;
  const button = document.createElement('button');
  button.type = 'button'; button.className = 'delete-button'; button.textContent = t('delete');
  button.title = isAdmin && item.owner_id !== currentUser?.id ? t('adminObject') : t('myObject');
  button.addEventListener('click', () => deleteItem(item));
  return button;
}

async function deleteItem(item) {
  const confirmation = window.confirm(t('deleteConfirm'));
  if (!confirmation) return;
  const buttons = gallery.querySelectorAll('.delete-button');
  buttons.forEach(btn => { btn.disabled = true; });
  try {
    const { error: storageError } = await supabase.storage.from('objects').remove([item.photo_path]);
    if (storageError && !/not found|does not exist/i.test(storageError.message || '')) throw storageError;
    const { error: rowError } = await supabase.from('objects_archive').delete().eq('id', item.id);
    if (rowError) throw rowError;
    archiveItems = archiveItems.filter(entry => entry.id !== item.id);
    renderArchive();
    setStatus(t('deleteSuccess'), 'ok');
  } catch (error) {
    console.error(error);
    setStatus(error.message || t('deleteError'), 'error');
  } finally {
    gallery.querySelectorAll('.delete-button').forEach(btn => { btn.disabled = false; });
  }
}

async function loadArchive() {
  archiveCount.textContent = t('loading');
  const { data, error } = await supabase.from('objects_archive')
    .select('id, photo_url, photo_path, memory, place, memory_date, created_at, owner_id')
    .order('memory_date', { ascending: false });
  if (error) {
    console.error(error); archiveCount.textContent = t('archiveLoadError'); gallery.innerHTML = ''; emptyState.classList.remove('hidden'); return;
  }
  archiveItems = data || [];
  renderArchive();
}

function renderArchive() {
  const query = searchInput.value.trim().toLocaleLowerCase(currentLang);
  const filtered = archiveItems.filter(item => `${item.memory} ${item.place} ${item.memory_date}`.toLocaleLowerCase(currentLang).includes(query));
  archiveCount.textContent = `${filtered.length} ${filtered.length === 1 ? t('oneObject') : t('manyObjects')}`;
  gallery.innerHTML = '';
  if (filtered.length === 0) { emptyState.classList.remove('hidden'); return; }
  emptyState.classList.add('hidden');

  for (const item of filtered) {
    const article = document.createElement('article'); article.className = 'card object-card';
    const img = document.createElement('img'); img.className = 'object-image'; img.src = item.photo_url; img.alt = `${t('publicPhotoAlt')}: ${item.place}`; img.loading = 'lazy';
    const body = document.createElement('div'); body.className = 'object-body';
    const meta = document.createElement('div'); meta.className = 'object-date-place'; meta.textContent = `${item.place} · ${formatDate(item.memory_date)}`;
    const title = document.createElement('h3'); title.textContent = t('memoryTitle');
    const text = document.createElement('p'); text.className = 'object-memory'; text.textContent = item.memory;
    const controls = document.createElement('div'); controls.className = 'object-controls';
    const ownership = document.createElement('span'); ownership.className = 'ownership-badge';
    if (item.owner_id === currentUser?.id) ownership.textContent = t('own');
    else if (isAdmin && canDelete(item)) ownership.textContent = t('admin');
    else ownership.textContent = '';
    if (ownership.textContent) controls.appendChild(ownership);
    const deleteButton = makeDeleteButton(item); if (deleteButton) controls.appendChild(deleteButton);
    if (controls.children.length) body.appendChild(controls);
    body.append(meta, title, text);
    article.append(img, body); gallery.appendChild(article);
  }
}

function openAdminModal() {
  adminModal.classList.remove('hidden');
  adminStatus.textContent = '';
  if (isAdmin) {
    adminLoginView.classList.add('hidden'); adminSessionView.classList.remove('hidden'); adminSessionEmail.textContent = currentUser.email || '';
  } else {
    adminLoginView.classList.remove('hidden'); adminSessionView.classList.add('hidden');
    if (currentUser?.email && !isAdmin) setAdminStatus(t('notAdmin'), 'error');
    setTimeout(() => adminEmailInput.focus(), 0);
  }
}
function closeAdminModal() { adminModal.classList.add('hidden'); }
adminOpenButtons.forEach(btn => btn?.addEventListener('click', openAdminModal));
adminClose.addEventListener('click', closeAdminModal);
document.querySelector('[data-close-admin]').addEventListener('click', closeAdminModal);

document.addEventListener('keydown', event => { if (event.key === 'Escape') closeAdminModal(); });

adminLoginForm.addEventListener('submit', async event => {
  event.preventDefault();
  adminLoginButton.disabled = true; setAdminStatus(t('loading'));
  try {
    const { error } = await supabase.auth.signInWithPassword({ email: adminEmailInput.value.trim(), password: document.getElementById('admin-password').value });
    if (error) throw error;
    await refreshAdminState();
    if (!isAdmin) { setAdminStatus(t('notAdmin'), 'error'); await ensureAnonymousSession().catch(() => {}); return; }
    setAdminStatus('');
  } catch (error) {
    console.error(error); setAdminStatus(t('invalidCredentials'), 'error');
  } finally { adminLoginButton.disabled = false; }
});

adminLogout.addEventListener('click', async () => {
  try {
    await supabase.auth.signOut();
    currentUser = await ensureAnonymousSession();
    await refreshAdminState();
    setAdminStatus(t('loggedOut'), 'ok');
  } catch (error) { console.error(error); }
});

supabase.auth.onAuthStateChange((_event, session) => {
  currentUser = session?.user || null;
  // Defer the follow-up query so it does not run inside Supabase's auth lock.
  setTimeout(() => refreshAdminState().catch(console.error), 0);
});

async function initialize() {
  applyLanguage(currentLang);
  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('TU-PROYECTO')) {
    setStatus(t('configError'), 'error'); submitButton.disabled = true; authReady = false; return;
  }
  try {
    currentUser = await ensureAnonymousSession();
    authReady = true;
    await refreshAdminState();
    await loadArchive();
  } catch (error) {
    console.error(error); authReady = false; setStatus(t('authError'), 'error'); submitButton.disabled = true;
  }
}

initialize();
