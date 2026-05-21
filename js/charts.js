// =============================================
// KidsTrack — Charts (Canvas-based, no deps)
// =============================================

function drawBarChart(canvasId, labels, values, color = '#7C6FF7') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const W = rect.width;
  const H = rect.height;
  const padL = 10, padR = 10, padT = 20, padB = 40;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const max = Math.max(...values, 1);
  const barW = chartW / values.length * 0.55;
  const gap = chartW / values.length;

  ctx.clearRect(0, 0, W, H);

  // Grid lines
  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = padT + chartH - (chartH / 4 * i);
    ctx.beginPath();
    ctx.moveTo(padL, y);
    ctx.lineTo(W - padR, y);
    ctx.stroke();
  }

  // Bars
  values.forEach((val, i) => {
    const x = padL + gap * i + (gap - barW) / 2;
    const barH = (val / max) * chartH;
    const y = padT + chartH - barH;

    // Shadow glow
    ctx.shadowColor = color;
    ctx.shadowBlur = 12;

    // Gradient fill
    const grad = ctx.createLinearGradient(x, y, x, y + barH);
    grad.addColorStop(0, color);
    grad.addColorStop(1, color + '44');
    ctx.fillStyle = grad;

    // Rounded top bar
    const r = Math.min(6, barW / 2, barH / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + barW - r, y);
    ctx.quadraticCurveTo(x + barW, y, x + barW, y + r);
    ctx.lineTo(x + barW, y + barH);
    ctx.lineTo(x, y + barH);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;

    // Value label
    if (val > 0) {
      ctx.fillStyle = 'rgba(240,240,255,0.9)';
      ctx.font = `700 11px Plus Jakarta Sans, sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText(val, x + barW / 2, y - 6);
    }

    // X labels
    ctx.fillStyle = 'rgba(240,240,255,0.45)';
    ctx.font = `500 10px Plus Jakarta Sans, sans-serif`;
    ctx.textAlign = 'center';
    const label = labels[i] || '';
    ctx.fillText(label.length > 8 ? label.slice(0, 7) + '…' : label, x + barW / 2, H - padB + 16);
  });
}

function drawDonutChart(canvasId, segments, size = 120) {
  // segments = [{ label, value, color }]
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  ctx.scale(dpr, dpr);

  const cx = size / 2, cy = size / 2;
  const outerR = size / 2 - 8;
  const innerR = outerR * 0.62;
  const total = segments.reduce((s, seg) => s + seg.value, 0) || 1;
  let startAngle = -Math.PI / 2;

  segments.forEach(seg => {
    const sweep = (seg.value / total) * Math.PI * 2;

    ctx.shadowColor = seg.color;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(cx, cy, outerR, startAngle, startAngle + sweep);
    ctx.arc(cx, cy, innerR, startAngle + sweep, startAngle, true);
    ctx.closePath();
    ctx.fillStyle = seg.color;
    ctx.fill();
    ctx.shadowBlur = 0;

    startAngle += sweep;
  });

  // Center hole (clear)
  ctx.beginPath();
  ctx.arc(cx, cy, innerR - 2, 0, Math.PI * 2);
  ctx.fillStyle = 'transparent';
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';
}

function drawLineChart(canvasId, labels, datasets) {
  // datasets = [{ label, values, color }]
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const W = rect.width;
  const H = rect.height;
  const padL = 16, padR = 16, padT = 20, padB = 36;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const allVals = datasets.flatMap(d => d.values);
  const max = Math.max(...allVals, 1);

  ctx.clearRect(0, 0, W, H);

  // Grid
  ctx.strokeStyle = 'rgba(255,255,255,0.05)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = padT + chartH - (chartH / 4 * i);
    ctx.beginPath();
    ctx.moveTo(padL, y);
    ctx.lineTo(W - padR, y);
    ctx.stroke();
  }

  // X labels
  labels.forEach((lbl, i) => {
    const x = padL + (chartW / (labels.length - 1)) * i;
    ctx.fillStyle = 'rgba(240,240,255,0.35)';
    ctx.font = `500 10px Plus Jakarta Sans, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText(lbl, x, H - padB + 16);
  });

  // Lines
  datasets.forEach(ds => {
    if (!ds.values.length) return;
    const pts = ds.values.map((v, i) => ({
      x: padL + (chartW / Math.max(ds.values.length - 1, 1)) * i,
      y: padT + chartH - (v / max) * chartH
    }));

    // Area fill
    ctx.beginPath();
    ctx.moveTo(pts[0].x, padT + chartH);
    pts.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.lineTo(pts[pts.length - 1].x, padT + chartH);
    ctx.closePath();
    const areaGrad = ctx.createLinearGradient(0, padT, 0, padT + chartH);
    areaGrad.addColorStop(0, ds.color + '40');
    areaGrad.addColorStop(1, ds.color + '00');
    ctx.fillStyle = areaGrad;
    ctx.fill();

    // Line
    ctx.beginPath();
    pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
    ctx.strokeStyle = ds.color;
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.shadowColor = ds.color;
    ctx.shadowBlur = 8;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Dots
    pts.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = ds.color;
      ctx.shadowColor = ds.color;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
    });
  });
}

function drawMiniProgressRing(canvasId, pct, color, size = 80) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  ctx.scale(dpr, dpr);

  const cx = size / 2, cy = size / 2, r = size / 2 - 8;
  const startAngle = -Math.PI / 2;
  const endAngle = startAngle + (pct / 100) * Math.PI * 2;

  // Track
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(255,255,255,0.07)';
  ctx.lineWidth = 8;
  ctx.stroke();

  // Fill
  ctx.beginPath();
  ctx.arc(cx, cy, r, startAngle, endAngle);
  ctx.strokeStyle = color;
  ctx.lineWidth = 8;
  ctx.lineCap = 'round';
  ctx.shadowColor = color;
  ctx.shadowBlur = 12;
  ctx.stroke();
  ctx.shadowBlur = 0;
}

// Attendance bar chart (weekly summary)
function drawAttendanceBar(canvasId, summary) {
  const labels = ['Hadir', 'Izin', 'Sakit', 'Alpha'];
  const values = [summary.hadir, summary.izin, summary.sakit, summary.alpha];
  const colors = ['#00D2A8', '#FFB547', '#4FC3F7', '#FF7B7B'];
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const W = rect.width, H = rect.height;
  const padL = 10, padR = 10, padT = 16, padB = 36;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const max = Math.max(...values, 1);
  const barW = chartW / 4 * 0.5;
  const gap = chartW / 4;

  ctx.clearRect(0, 0, W, H);

  values.forEach((val, i) => {
    const x = padL + gap * i + (gap - barW) / 2;
    const barH = (val / max) * chartH;
    const y = padT + chartH - barH;
    const color = colors[i];
    const r = Math.min(6, barW / 2, barH > 0 ? barH / 2 : 6);

    if (barH > 0) {
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;
      const grad = ctx.createLinearGradient(x, y, x, y + barH);
      grad.addColorStop(0, color);
      grad.addColorStop(1, color + '44');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + barW - r, y);
      ctx.quadraticCurveTo(x + barW, y, x + barW, y + r);
      ctx.lineTo(x + barW, y + barH);
      ctx.lineTo(x, y + barH);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    ctx.fillStyle = 'rgba(240,240,255,0.85)';
    ctx.font = `700 11px Plus Jakarta Sans, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText(val, x + barW / 2, y - 6 < padT + 12 ? padT + 12 : y - 6);

    ctx.fillStyle = color;
    ctx.font = `600 10px Plus Jakarta Sans, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText(labels[i], x + barW / 2, H - padB + 16);
  });
}
