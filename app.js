import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const config = window.APP_CONFIG || {};

// Supabase JS necesita la URL raíz del proyecto (https://...supabase.co).
// Si alguien pega por error la URL de REST (/rest/v1/), la normalizamos.
function normalizeSupabaseUrl(value) {
  return String(value || '').trim().replace(/\/+(rest\/v1\/?|$)/i, '').replace(/\/$/, '');
}

const supabaseUrl = normalizeSupabaseUrl(config.SUPABASE_URL);
const supabaseKey = config.SUPABASE_PUBLISHABLE_KEY || config.SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

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
const views = {
  submit: document.getElementById('view-submit'),
  archive: document.getElementById('view-archive')
};

let archiveItems = [];

function setStatus(message, kind = '') {
  formStatus.textContent = message;
  formStatus.className = `status ${kind}`.trim();
}

function formatDate(dateString) {
  const d = new Date(`${dateString}T00:00:00`);
  return new Intl.DateTimeFormat('es', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
}

function safeFileName(name) {
  return name.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/^-+|-+$/g, '');
}

photoInput.addEventListener('change', () => {
  const file = photoInput.files?.[0];
  photoPreview.innerHTML = '';
  photoPreview.classList.add('hidden');
  if (!file) return;
  if (file.size > 8 * 1024 * 1024) {
    setStatus('La fotografía supera el límite de 8 MB.', 'error');
    photoInput.value = '';
    return;
  }
  const img = document.createElement('img');
  img.alt = 'Vista previa del objeto';
  img.src = URL.createObjectURL(file);
  photoPreview.appendChild(img);
  photoPreview.classList.remove('hidden');
});

memoryFile.addEventListener('change', async () => {
  const file = memoryFile.files?.[0];
  if (!file) return;
  if (file.size > 200 * 1024) {
    setStatus('El archivo de texto supera el límite de 200 KB.', 'error');
    memoryFile.value = '';
    return;
  }
  try {
    memory.value = await file.text();
    memoryFileName.textContent = file.name;
    memory.dispatchEvent(new Event('input'));
  } catch {
    setStatus('No se pudo leer el archivo de texto.', 'error');
  }
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  setStatus('Guardando…');
  submitButton.disabled = true;

  try {
    const photo = photoInput.files?.[0];
    const place = document.getElementById('place').value.trim();
    const memoryDate = document.getElementById('memory-date').value;
    const memoryText = memory.value.trim();

    if (!photo || !memoryText || !place || !memoryDate) throw new Error('Completa todos los campos.');
    if (photo.size > 8 * 1024 * 1024) throw new Error('La fotografía supera el límite de 8 MB.');

    const extension = (photo.name.split('.').pop() || 'jpg').toLowerCase();
    const path = `${crypto.randomUUID()}-${safeFileName(photo.name) || `objeto.${extension}`}`;

    const { error: uploadError } = await supabase.storage.from('objects').upload(path, photo, {
      contentType: photo.type,
      cacheControl: '3600',
      upsert: false
    });
    if (uploadError) throw uploadError;

    const { data: publicData } = supabase.storage.from('objects').getPublicUrl(path);
    const photoUrl = publicData.publicUrl;

    const { error: insertError } = await supabase.from('objects_archive').insert({
      photo_url: photoUrl,
      photo_path: path,
      memory: memoryText,
      place,
      memory_date: memoryDate
    });
    if (insertError) {
      // Best effort cleanup if the database row could not be created.
      await supabase.storage.from('objects').remove([path]);
      throw insertError;
    }

    form.reset();
    photoPreview.innerHTML = '';
    photoPreview.classList.add('hidden');
    memoryFileName.textContent = '';
    setStatus('El objeto fue guardado en el archivo.', 'ok');
    archiveItems = [];
    await loadArchive();
  } catch (error) {
    console.error(error);
    setStatus(error.message || 'No se pudo guardar el objeto.', 'error');
  } finally {
    submitButton.disabled = false;
  }
});

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const view = tab.dataset.view;
    tabs.forEach(t => t.classList.toggle('active', t === tab));
    Object.entries(views).forEach(([name, element]) => {
      const active = name === view;
      element.classList.toggle('active-view', active);
      element.hidden = !active;
    });
    if (view === 'archive' && archiveItems.length === 0) loadArchive();
  });
});

searchInput.addEventListener('input', renderArchive);

async function loadArchive() {
  archiveCount.textContent = 'Cargando…';
  const { data, error } = await supabase
    .from('objects_archive')
    .select('id, photo_url, memory, place, memory_date, created_at')
    .order('memory_date', { ascending: false });

  if (error) {
    console.error(error);
    archiveCount.textContent = 'No se pudo cargar el archivo.';
    gallery.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }
  archiveItems = data || [];
  renderArchive();
}

function renderArchive() {
  const query = searchInput.value.trim().toLocaleLowerCase('es');
  const filtered = archiveItems.filter(item => {
    const haystack = `${item.memory} ${item.place} ${item.memory_date}`.toLocaleLowerCase('es');
    return !query || haystack.includes(query);
  });

  archiveCount.textContent = `${filtered.length} ${filtered.length === 1 ? 'objeto archivado' : 'objetos archivados'}`;
  gallery.innerHTML = '';

  if (filtered.length === 0) {
    emptyState.classList.remove('hidden');
    return;
  }
  emptyState.classList.add('hidden');

  for (const item of filtered) {
    const article = document.createElement('article');
    article.className = 'card object-card';

    const img = document.createElement('img');
    img.className = 'object-image';
    img.src = item.photo_url;
    img.alt = 'Fotografía del objeto archivado';
    img.loading = 'lazy';

    const body = document.createElement('div');
    body.className = 'object-body';

    const meta = document.createElement('div');
    meta.className = 'object-date-place';
    meta.textContent = `${item.place} · ${formatDate(item.memory_date)}`;

    const title = document.createElement('h3');
    title.textContent = 'Memoria del objeto';

    const text = document.createElement('p');
    text.className = 'object-memory';
    text.textContent = item.memory;

    body.append(meta, title, text);
    article.append(img, body);
    gallery.appendChild(article);
  }
}

// Validate configuration early.
if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('TU-PROYECTO')) {
  setStatus('Falta configurar config.js con la URL y la Publishable key de Supabase.', 'error');
  submitButton.disabled = true;
}
