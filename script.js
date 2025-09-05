const canvas = document.getElementById('pookalamCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 600;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

function drawPetal(x, y, radius, angle, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(-radius / 2, -radius, radius / 2, -radius, 0, 0);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

function drawCirclePattern(layerCount, petalCount) {
  const colors = ['#f44336', '#ffeb3b', '#4caf50', '#ff9800', '#9c27b0'];
  const baseRadius = 40;

  for (let i = 0; i < layerCount; i++) {
    const radius = baseRadius + i * 30;
    const angleStep = (2 * Math.PI) / petalCount;
    const color = colors[i % colors.length];

    for (let j = 0; j < petalCount; j++) {
      const angle = j * angleStep;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      drawPetal(x, y, 30, angle, color);
    }

    petalCount += 4; // Add more petals in outer layers
  }
}

function drawCenter() {
  ctx.beginPath();
  ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
  ctx.fillStyle = '#ffd600';
  ctx.fill();
}

function animatePookalam() {
  let layer = 1;
  let maxLayers = 5;
  let petals = 8;

  function drawLayer() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCirclePattern(layer, petals);
    drawCenter();
    layer++;
    petals += 4;

    if (layer <= maxLayers) {
      setTimeout(drawLayer, 500);
    }
  }

  drawLayer();
}

animatePookalam();
