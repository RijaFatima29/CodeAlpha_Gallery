// Add your own images here: { src, title, category }
const images = [
  { seed: 'forest',   title: 'Forest Path',   category: 'nature' },
  { seed: 'mountain', title: 'Mountain Lake', category: 'nature' },
  { seed: 'beach',    title: 'Quiet Beach',   category: 'nature' },
  { seed: 'street',   title: 'City Street',   category: 'city' },
  { seed: 'bridge',   title: 'Old Bridge',    category: 'city' },
  { seed: 'tower',    title: 'Night Tower',   category: 'city' },
  { seed: 'fox',      title: 'Curious Fox',   category: 'animals' },
  { seed: 'owl',      title: 'Wise Owl',      category: 'animals' },
  { seed: 'horse',    title: 'Wild Horse',    category: 'animals' },
].map(i => ({ ...i, src: `https://picsum.photos/seed/${i.seed}/1000/700`, thumb: `https://picsum.photos/seed/${i.seed}/500/340` }));

const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
const caption = document.getElementById('caption');
let visible = [...images]; // images currently shown (respects filter)
let index = 0;

// Build grid
images.forEach(img => {
  const div = document.createElement('div');
  div.className = 'item';
  div.dataset.category = img.category;
  div.innerHTML = `<img src="${img.thumb}" alt="${img.title}" loading="lazy"><span>${img.title}</span>`;
  div.addEventListener('click', () => open(visible.indexOf(img)));
  img.el = div;
  gallery.appendChild(div);
});

// Filters
document.querySelector('.filters').addEventListener('click', e => {
  const btn = e.target.closest('button');
  if (!btn) return;
  document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const f = btn.dataset.filter;
  visible = images.filter(i => f === 'all' || i.category === f);
  images.forEach(i => i.el.classList.toggle('hide', !visible.includes(i)));
});

// Lightbox
function show() {
  const img = visible[index];
  lbImg.src = img.src;
  lbImg.alt = img.title;
  caption.textContent = `${img.title} (${index + 1}/${visible.length})`;
}
function open(i) { index = i; show(); lightbox.hidden = false; }
function close() { lightbox.hidden = true; }
function next() { index = (index + 1) % visible.length; show(); }
function prev() { index = (index - 1 + visible.length) % visible.length; show(); }

lightbox.querySelector('.next').onclick = next;
lightbox.querySelector('.prev').onclick = prev;
lightbox.querySelector('.close').onclick = close;
lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
document.addEventListener('keydown', e => {
  if (lightbox.hidden) return;
  if (e.key === 'ArrowRight') next();
  if (e.key === 'ArrowLeft') prev();
  if (e.key === 'Escape') close();
});