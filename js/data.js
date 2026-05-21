// =============================================
// KidsTrack — Data Management (LocalStorage)
// =============================================

const DB_KEY = 'kidstrack_db';

const DEFAULT_DATA = {
  users: [
    { id: 'u1', role: 'guru', name: 'Bu Sari', email: 'guru@kidstrack.id', password: 'guru123', avatar: '👩‍🏫' },
    { id: 'u2', role: 'orang_tua', name: 'Pak Ahmad', email: 'ahmad@kidstrack.id', password: 'ortu123', avatar: '👨', childId: 's1' },
    { id: 'u3', role: 'orang_tua', name: 'Bu Dewi', email: 'dewi@kidstrack.id', password: 'ortu123', avatar: '👩', childId: 's2' },
    { id: 'u4', role: 'orang_tua', name: 'Pak Budi', email: 'budi@kidstrack.id', password: 'ortu123', avatar: '👨', childId: 's3' },
    { id: 'u5', role: 'orang_tua', name: 'Bu Rina', email: 'rina@kidstrack.id', password: 'ortu123', avatar: '👩', childId: 's4' },
  ],
  students: [
    { id: 's1', name: 'Arif Pratama', kelas: 'Kelas A', usia: 7, avatar: '🧒', parentId: 'u2' },
    { id: 's2', name: 'Bunga Sari', kelas: 'Kelas A', usia: 8, avatar: '👧', parentId: 'u3' },
    { id: 's3', name: 'Candra Wijaya', kelas: 'Kelas B', usia: 7, avatar: '🧒', parentId: 'u4' },
    { id: 's4', name: 'Dita Amelia', kelas: 'Kelas B', usia: 8, avatar: '👧', parentId: 'u5' },
    { id: 's5', name: 'Eko Santoso', kelas: 'Kelas A', usia: 7, avatar: '🧒', parentId: null },
  ],
  attendance: generateAttendance(),
  tasks: [
    { id: 't1', studentId: 's1', judul: 'Mewarnai Gambar Hewan', mapel: 'Seni', status: 'selesai', dueDate: '2026-05-10', submittedDate: '2026-05-09', catatan: 'Bagus sekali!' },
    { id: 't2', studentId: 's1', judul: 'Latihan Berhitung 1-20', mapel: 'Matematika', status: 'selesai', dueDate: '2026-05-12', submittedDate: '2026-05-12', catatan: 'Sudah memahami konsep' },
    { id: 't3', studentId: 's1', judul: 'Membaca Cerita Pendek', mapel: 'Bahasa Indonesia', status: 'terlambat', dueDate: '2026-05-14', submittedDate: '2026-05-16', catatan: 'Perlu latihan lebih' },
    { id: 't4', studentId: 's1', judul: 'Mengenal Huruf Hijaiyah', mapel: 'Agama', status: 'selesai', dueDate: '2026-05-18', submittedDate: '2026-05-18', catatan: '' },
    { id: 't5', studentId: 's1', judul: 'Proyek Kolase', mapel: 'Seni', status: 'dalam_proses', dueDate: '2026-05-22', submittedDate: null, catatan: '' },

    { id: 't6', studentId: 's2', judul: 'Latihan Berhitung 1-20', mapel: 'Matematika', status: 'selesai', dueDate: '2026-05-12', submittedDate: '2026-05-11', catatan: 'Excellent!' },
    { id: 't7', studentId: 's2', judul: 'Mewarnai Gambar Hewan', mapel: 'Seni', status: 'selesai', dueDate: '2026-05-10', submittedDate: '2026-05-10', catatan: '' },
    { id: 't8', studentId: 's2', judul: 'Membaca Cerita Pendek', mapel: 'Bahasa Indonesia', status: 'selesai', dueDate: '2026-05-14', submittedDate: '2026-05-13', catatan: 'Bacaannya sangat lancar' },
    { id: 't9', studentId: 's2', judul: 'Proyek Kolase', mapel: 'Seni', status: 'dalam_proses', dueDate: '2026-05-22', submittedDate: null, catatan: '' },

    { id: 't10', studentId: 's3', judul: 'Latihan Berhitung 1-20', mapel: 'Matematika', status: 'selesai', dueDate: '2026-05-12', submittedDate: '2026-05-12', catatan: '' },
    { id: 't11', studentId: 's3', judul: 'Mewarnai Gambar Hewan', mapel: 'Seni', status: 'terlambat', dueDate: '2026-05-10', submittedDate: '2026-05-13', catatan: 'Perlu lebih semangat' },
    { id: 't12', studentId: 's3', judul: 'Proyek Kolase', mapel: 'Seni', status: 'dalam_proses', dueDate: '2026-05-22', submittedDate: null, catatan: '' },

    { id: 't13', studentId: 's4', judul: 'Latihan Berhitung 1-20', mapel: 'Matematika', status: 'selesai', dueDate: '2026-05-12', submittedDate: '2026-05-10', catatan: 'Sangat pintar!' },
    { id: 't14', studentId: 's4', judul: 'Mewarnai Gambar Hewan', mapel: 'Seni', status: 'selesai', dueDate: '2026-05-10', submittedDate: '2026-05-10', catatan: 'Kreatif sekali' },
    { id: 't15', studentId: 's4', judul: 'Membaca Cerita Pendek', mapel: 'Bahasa Indonesia', status: 'selesai', dueDate: '2026-05-14', submittedDate: '2026-05-14', catatan: '' },
    { id: 't16', studentId: 's4', judul: 'Proyek Kolase', mapel: 'Seni', status: 'selesai', dueDate: '2026-05-22', submittedDate: '2026-05-20', catatan: 'Luar biasa!' },

    { id: 't17', studentId: 's5', judul: 'Latihan Berhitung 1-20', mapel: 'Matematika', status: 'belum_dikumpul', dueDate: '2026-05-12', submittedDate: null, catatan: '' },
    { id: 't18', studentId: 's5', judul: 'Mewarnai Gambar Hewan', mapel: 'Seni', status: 'selesai', dueDate: '2026-05-10', submittedDate: '2026-05-10', catatan: '' },
  ],
  notes: [
    { id: 'n1', studentId: 's1', guruId: 'u1', tanggal: '2026-05-15', kategori: 'positif', isi: 'Arif sangat aktif dan antusias saat kegiatan belajar kelompok hari ini. Ia dengan sabar membantu teman-temannya yang kesulitan.', isRead: false },
    { id: 'n2', studentId: 's1', guruId: 'u1', tanggal: '2026-05-18', kategori: 'perhatian', isi: 'Perlu perhatian lebih dalam pelajaran membaca. Disarankan untuk berlatih membaca 15 menit setiap malam di rumah.', isRead: false },
    { id: 'n3', studentId: 's2', guruId: 'u1', tanggal: '2026-05-16', kategori: 'positif', isi: 'Bunga menunjukkan perkembangan luar biasa dalam matematika! Ia berhasil menjawab semua soal berhitung dengan tepat.', isRead: false },
    { id: 'n4', studentId: 's3', guruId: 'u1', tanggal: '2026-05-17', kategori: 'perhatian', isi: 'Candra perlu lebih fokus saat pelajaran berlangsung. Sering terlihat melamun. Mohon dukungan dari rumah.', isRead: false },
    { id: 'n5', studentId: 's4', guruId: 'u1', tanggal: '2026-05-19', kategori: 'positif', isi: 'Dita adalah bintang kelas minggu ini! Ia dipilih sebagai pemimpin kelompok dan menjalankannya dengan sangat baik.', isRead: false },
    { id: 'n6', studentId: 's1', guruId: 'u1', tanggal: '2026-05-10', kategori: 'positif', isi: 'Arif berhasil menyelesaikan puzzle pertamanya dengan cepat. Logika berpikirnya sangat baik!', isRead: true },
    { id: 'n7', studentId: 's5', guruId: 'u1', tanggal: '2026-05-20', kategori: 'perhatian', isi: 'Eko belum mengumpulkan beberapa tugas. Mohon konfirmasi kepada wali murid.', isRead: false },
  ],
  milestones: [
    { id: 'm1', studentId: 's1', judul: 'Bisa Membaca 3 Kata', emoji: '📖', tanggal: '2026-04-15', kategori: 'akademik' },
    { id: 'm2', studentId: 's1', judul: 'Berani Presentasi', emoji: '🎤', tanggal: '2026-05-02', kategori: 'sosial' },
    { id: 'm3', studentId: 's1', judul: 'Berhitung sampai 20', emoji: '🔢', tanggal: '2026-05-10', kategori: 'akademik' },
    { id: 'm4', studentId: 's2', judul: 'Juara Kelas Berhitung', emoji: '🏆', tanggal: '2026-05-01', kategori: 'prestasi' },
    { id: 'm5', studentId: 's2', judul: 'Bisa Membaca 3 Kata', emoji: '📖', tanggal: '2026-04-10', kategori: 'akademik' },
    { id: 'm6', studentId: 's2', judul: 'Aktif Bertanya di Kelas', emoji: '🙋', tanggal: '2026-04-25', kategori: 'sosial' },
    { id: 'm7', studentId: 's3', judul: 'Bisa Membaca 3 Kata', emoji: '📖', tanggal: '2026-04-20', kategori: 'akademik' },
    { id: 'm8', studentId: 's4', judul: 'Pemimpin Kelompok', emoji: '⭐', tanggal: '2026-05-19', kategori: 'sosial' },
    { id: 'm9', studentId: 's4', judul: 'Juara Kelas Berhitung', emoji: '🏆', tanggal: '2026-05-01', kategori: 'prestasi' },
    { id: 'm10', studentId: 's4', judul: 'Bisa Membaca 3 Kata', emoji: '📖', tanggal: '2026-04-08', kategori: 'akademik' },
    { id: 'm11', studentId: 's4', judul: 'Paling Rajin Mengumpulkan Tugas', emoji: '✅', tanggal: '2026-05-20', kategori: 'prestasi' },
  ],
  allMilestones: [
    { id: 'am1', judul: 'Bisa Membaca 3 Kata', emoji: '📖', kategori: 'akademik' },
    { id: 'am2', judul: 'Berhitung sampai 20', emoji: '🔢', kategori: 'akademik' },
    { id: 'am3', judul: 'Bisa Menulis Namanya', emoji: '✏️', kategori: 'akademik' },
    { id: 'am4', judul: 'Mengenal Warna', emoji: '🎨', kategori: 'akademik' },
    { id: 'am5', judul: 'Berani Presentasi', emoji: '🎤', kategori: 'sosial' },
    { id: 'am6', judul: 'Aktif Bertanya di Kelas', emoji: '🙋', kategori: 'sosial' },
    { id: 'am7', judul: 'Pemimpin Kelompok', emoji: '⭐', kategori: 'sosial' },
    { id: 'am8', judul: 'Juara Kelas Berhitung', emoji: '🏆', kategori: 'prestasi' },
    { id: 'am9', judul: 'Paling Rajin Mengumpulkan Tugas', emoji: '✅', kategori: 'prestasi' },
    { id: 'am10', judul: 'Bintang Minggu Ini', emoji: '🌟', kategori: 'prestasi' },
  ]
};

function generateAttendance() {
  const attendance = [];
  const statuses = ['hadir', 'hadir', 'hadir', 'hadir', 'izin', 'sakit', 'alpha'];
  const studentIds = ['s1', 's2', 's3', 's4', 's5'];
  const year = 2026;
  const month = 4; // May (0-indexed)

  const today = new Date();
  let attId = 1;

  for (let day = 1; day <= 20; day++) {
    const date = new Date(year, month, day);
    if (date.getDay() === 0 || date.getDay() === 6) continue; // skip weekends
    if (date > today) continue;

    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    studentIds.forEach(sid => {
      const weights = sid === 's5'
        ? ['hadir', 'hadir', 'hadir', 'alpha', 'alpha']
        : ['hadir', 'hadir', 'hadir', 'hadir', 'hadir', 'izin'];
      const status = weights[Math.floor(Math.random() * weights.length)];
      attendance.push({
        id: `a${attId++}`,
        studentId: sid,
        tanggal: dateStr,
        status,
        catatan: ''
      });
    });
  }

  return attendance;
}

// ---- DB Access ----
function getDB() {
  const raw = localStorage.getItem(DB_KEY);
  if (!raw) {
    localStorage.setItem(DB_KEY, JSON.stringify(DEFAULT_DATA));
    return DEFAULT_DATA;
  }
  return JSON.parse(raw);
}

function saveDB(data) {
  localStorage.setItem(DB_KEY, JSON.stringify(data));
}

function resetDB() {
  localStorage.setItem(DB_KEY, JSON.stringify(DEFAULT_DATA));
  return DEFAULT_DATA;
}

// ---- Auth ----
function login(email, password) {
  const db = getDB();
  return db.users.find(u => u.email === email && u.password === password) || null;
}

function getCurrentUser() {
  const raw = sessionStorage.getItem('kidstrack_user');
  return raw ? JSON.parse(raw) : null;
}

function setCurrentUser(user) {
  sessionStorage.setItem('kidstrack_user', JSON.stringify(user));
}

function logout() {
  sessionStorage.removeItem('kidstrack_user');
}

// ---- Students ----
function getStudents() {
  return getDB().students;
}

function getStudentById(id) {
  return getDB().students.find(s => s.id === id);
}

function addStudent(student) {
  const db = getDB();
  const newStudent = { id: 's' + Date.now(), ...student };
  db.students.push(newStudent);
  saveDB(db);
  return newStudent;
}

function updateStudent(id, updates) {
  const db = getDB();
  const idx = db.students.findIndex(s => s.id === id);
  if (idx !== -1) {
    db.students[idx] = { ...db.students[idx], ...updates };
    saveDB(db);
  }
}

// ---- Attendance ----
function getAttendance(studentId) {
  return getDB().attendance.filter(a => a.studentId === studentId);
}

function getAllAttendanceByDate(tanggal) {
  return getDB().attendance.filter(a => a.tanggal === tanggal);
}

function setAttendance(studentId, tanggal, status, catatan = '') {
  const db = getDB();
  const idx = db.attendance.findIndex(a => a.studentId === studentId && a.tanggal === tanggal);
  if (idx !== -1) {
    db.attendance[idx].status = status;
    db.attendance[idx].catatan = catatan;
  } else {
    db.attendance.push({ id: 'a' + Date.now(), studentId, tanggal, status, catatan });
  }
  saveDB(db);
}

function getAttendanceSummary(studentId) {
  const att = getAttendance(studentId);
  const summary = { hadir: 0, izin: 0, sakit: 0, alpha: 0, total: att.length };
  att.forEach(a => { if (summary[a.status] !== undefined) summary[a.status]++; });
  summary.pct = att.length > 0 ? Math.round((summary.hadir / att.length) * 100) : 0;
  return summary;
}

// ---- Tasks ----
function getTasks(studentId) {
  return getDB().tasks.filter(t => t.studentId === studentId);
}

function getAllTasks() {
  return getDB().tasks;
}

function addTask(task) {
  const db = getDB();
  const newTask = { id: 't' + Date.now(), ...task };
  db.tasks.push(newTask);
  saveDB(db);
  return newTask;
}

function updateTask(id, updates) {
  const db = getDB();
  const idx = db.tasks.findIndex(t => t.id === id);
  if (idx !== -1) {
    db.tasks[idx] = { ...db.tasks[idx], ...updates };
    saveDB(db);
  }
}

function deleteTask(id) {
  const db = getDB();
  db.tasks = db.tasks.filter(t => t.id !== id);
  saveDB(db);
}

function getTaskSummary(studentId) {
  const tasks = getTasks(studentId);
  return {
    total: tasks.length,
    selesai: tasks.filter(t => t.status === 'selesai').length,
    terlambat: tasks.filter(t => t.status === 'terlambat').length,
    dalam_proses: tasks.filter(t => t.status === 'dalam_proses').length,
    belum_dikumpul: tasks.filter(t => t.status === 'belum_dikumpul').length,
  };
}

// ---- Notes ----
function getNotes(studentId) {
  return getDB().notes.filter(n => n.studentId === studentId).sort((a, b) => b.tanggal.localeCompare(a.tanggal));
}

function getAllNotes() {
  return getDB().notes;
}

function addNote(note) {
  const db = getDB();
  const newNote = { id: 'n' + Date.now(), isRead: false, ...note };
  db.notes.push(newNote);
  saveDB(db);
  return newNote;
}

function deleteNote(id) {
  const db = getDB();
  db.notes = db.notes.filter(n => n.id !== id);
  saveDB(db);
}

function markNoteRead(id) {
  const db = getDB();
  const idx = db.notes.findIndex(n => n.id === id);
  if (idx !== -1) { db.notes[idx].isRead = true; saveDB(db); }
}

function getUnreadNoteCount(studentId) {
  return getDB().notes.filter(n => n.studentId === studentId && !n.isRead).length;
}

// ---- Milestones ----
function getMilestones(studentId) {
  return getDB().milestones.filter(m => m.studentId === studentId).sort((a, b) => b.tanggal.localeCompare(a.tanggal));
}

function getAllMilestoneTemplates() {
  return getDB().allMilestones;
}

function addMilestone(milestone) {
  const db = getDB();
  const newMs = { id: 'm' + Date.now(), ...milestone };
  db.milestones.push(newMs);
  saveDB(db);
  return newMs;
}

function deleteMilestone(id) {
  const db = getDB();
  db.milestones = db.milestones.filter(m => m.id !== id);
  saveDB(db);
}

// ---- Helpers ----
function formatDate(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

function formatDateShort(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
}

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function getStatusBadge(status) {
  const map = {
    selesai: { label: 'Selesai', cls: 'badge-mint' },
    terlambat: { label: 'Terlambat', cls: 'badge-coral' },
    dalam_proses: { label: 'Dalam Proses', cls: 'badge-amber' },
    belum_dikumpul: { label: 'Belum Dikumpul', cls: 'badge-sky' },
  };
  return map[status] || { label: status, cls: 'badge-primary' };
}

function getKategoriColor(kategori) {
  const map = { positif: 'mint', perhatian: 'amber', info: 'sky' };
  return map[kategori] || 'primary';
}

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function generateColor(str) {
  const colors = ['#7C6FF7', '#00D2A8', '#FF7B7B', '#FFB547', '#4FC3F7', '#A29BFE', '#00CEC9'];
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}
