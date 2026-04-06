<script setup>
import { computed, ref, onMounted, onUnmounted, watch } from "vue";
import { formatPercents } from "@framework/utils/format";

const { progress, bgColor } = defineProps({
  progress: {
    type: Number,
    required: true
  },
  bgColor: {
    type: String,
    required: false,
    default: "var(--color-base)"
  }
});

const styleObject = computed(() => ({
  background: bgColor,
  width: `${progress * 100}%`
}));

const barRef = ref(null);
const canvasRef = ref(null);
let ctx = null;
let animationFrame = null;
let particles = [];
const MAX_PARTICLES = 50;

watch(() => progress, (newVal, oldVal) => {
  if (newVal > oldVal) {
    spawnParticles(10, newVal - oldVal);
  }
});

function spawnParticles(count, diff) {
  if (!ctx || !barRef.value) return;
  for (let i = 0; i < count; i++) {
    particles.push({
      x: progress - diff * Math.random(),
      y: Math.random(),
      vx: Math.random() * (0.0005 * Math.min(4, diff * 1000)),
      vy: (Math.random() - 0.5) * 0.002,
      life: 1.0,
      size: Math.random() * 1 + 0.5
    });
    if (particles.length >= MAX_PARTICLES) {
      particles.splice(Math.floor((1 - Math.pow(Math.random(), 2)) * particles.length), 1);
    }
  }
  if (!animationFrame) {
    animationFrame = requestAnimationFrame(animate);
  }
}

function animate() {
  if (!ctx || !barRef.value) return;
  const width = barRef.value.clientWidth;
  const height = barRef.value.clientHeight;
  ctx.clearRect(0, 0, width, height);

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.life -= 0.02;
    if (p.life <= 0 || p.y < 0 || p.x < 0 || p.x > 1) {
      particles.splice(i, 1);
      continue;
    }
    ctx.globalAlpha = p.life;
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(p.x * width, p.y * height, p.size, 0, Math.PI * 2);
    ctx.fill();
  }

  if (particles.length > 0) {
    animationFrame = requestAnimationFrame(animate);
  } else {
    animationFrame = null;
  }
}

onMounted(() => {
  if (canvasRef.value) {
    ctx = canvasRef.value.getContext('2d');
    const resize = () => {
      if (!barRef.value || !canvasRef.value) return;
      canvasRef.value.width = barRef.value.clientWidth;
      canvasRef.value.height = barRef.value.clientHeight;
    }
    window.addEventListener('resize', resize);
    resize();
  }
});

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }
});
</script>

<template>
  <div
    ref="barRef"
    class="bar"
  >
    <canvas
      ref="canvasRef"
      class="bar-canvas"
    />
    <div
      class="bar-bg"
      :style="styleObject"
    />
    <div class="bar-content">
      <slot v-if="$slots.default" />
      <span v-else>{{ formatPercents(progress) }}</span>
    </div>
  </div>
</template>

<style scoped>
.bar {
  position: relative;
  width: 100%;
  height: 3rem;
  background-color: var(--color-base);
  border-radius: 0.5rem;
  overflow: hidden;
  border: 0.2rem solid var(--color-accent);
}

.bar-bg {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: var(--color-base);
  transition: width 0.3s ease;
  border-radius: 0.5rem;
}

.bar-content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  color: var(--color-accent);
  font-size: 1.5rem;
  font-weight: 500;
  text-shadow: 0 0.1rem 0.2rem rgba(0,0,0,0.2);
  z-index: 1;
}

.bar-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
}
</style>