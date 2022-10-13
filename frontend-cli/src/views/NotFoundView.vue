<template>
  <StarBackground />
  <div class="notFound-layout">
    <div :span="24" class="notFound-container">
      <div class="stack notFound-animation" data-text="404" style="--stacks: 3;" @click="toHome">
        <span style="--index: 0;">404</span>
        <span style="--index: 1;">404</span>
        <span style="--index: 2;">404</span>
      </div>
      <span class="notFound-text">
        <span style="margin-right: 1.4rem;">NOT</span>
        <span>FOUND</span>
      </span>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import StarBackground from '@/components/StarBackground.vue'

const router = useRouter()

const toHome = () => {
  router.push({ name: 'home' })
}
</script>

<style>
.notFound-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  font-family: "pressStart2p";
  font-size: 2.5rem;
  letter-spacing: 1rem;
}

.notFound-container {
  color: whitesmoke;
  display: flex;
  flex-direction: column;
}

.notFound-text {
  letter-spacing: 0.1rem;
  animation: fadein 1s;
}

.notFound-animation {
  cursor: pointer;
  color: #fff;
  font-size: 7rem;
  z-index: 1;
}

.notFound-animation::before,
.notFound-animation::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.notFound-animation::before {
  color: transparent;
  z-index: -1;
}

.notFound-animation::after {
  color: transparent;
  z-index: -2;
}

.notFound-animation:hover::before {
  color: yellow;
  animation: glitchy 0.3s ease 0.3s infinite;
}

.notFound-animation:hover:after {
  color: blue;
  animation: glitchy 0.3s ease infinite reverse;
}

@keyframes glitchy {
  0% {
    transform: translate(-3px, 3px);
  }

  25% {
    transform: translate(-3px, -3px);
  }

  50% {
    transform: translate(3px, 3px);
  }

  75% {
    transform: translate(3px, -3px);
  }

  100% {
    transform: translate(-3px, 3px);
  }
}

.stack {
  display: grid;
  grid-template-columns: 1fr;
}

.stack span {
  grid-row-start: 1;
  grid-column-start: 1;
  font-size: 7rem;
  --stack-height: calc(100% / var(--stacks) - 1px);
  --inverse-index: calc(calc(var(--stacks) - 1) - var(--index));
  --clip-top: calc(var(--stack-height) * var(--index));
  --clip-bottom: calc(var(--stack-height) * var(--inverse-index));
  clip-path: inset(var(--clip-top) 0 var(--clip-bottom) 0);
  animation: stack 340ms cubic-bezier(.46, .29, 0, 1.24) 1 backwards calc(var(--index) * 120ms), glitch 2s ease infinite 2s alternate-reverse;
}

.stack span:nth-child(odd) {
  --glitch-translate: 8px;
}

.stack span:nth-child(even) {
  --glitch-translate: -8px;
}

@keyframes stack {
  0% {
    opacity: 0;
    transform: translateX(-50%);
    text-shadow: -2px 3px 0 red, 2px -3px 0 blue;
  }

  ;

  60% {
    opacity: 0.5;
    transform: translateX(50%);
  }

  80% {
    transform: none;
    opacity: 1;
    text-shadow: 2px -3px 0 red, -2px 3px 0 blue;
  }

  100% {
    text-shadow: none;
  }
}

@keyframes glitch {
  0% {
    text-shadow: -2px 3px 0 red, 2px -3px 0 blue;
    transform: translate(var(--glitch-translate));
  }

  2% {
    text-shadow: 2px -3px 0 red, -2px 3px 0 blue;
  }

  4%,
  100% {
    text-shadow: none;
    transform: none;
  }
}
</style>