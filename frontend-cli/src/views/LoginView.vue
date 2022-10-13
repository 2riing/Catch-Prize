<template>
<div>{{ name }}</div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AUTH_URL, OAUTH2_REDIRECT_URI } from '../constants';

const route = useRoute();
const name = route.params.name;

onMounted(() => {
  window.location = AUTH_URL + name + OAUTH2_REDIRECT_URI
})
</script>