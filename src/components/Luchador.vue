<script setup>
import { ref, defineEmits, onMounted } from 'vue';

const props = defineProps({
  stamina: ref(0),
  poderAtaque: ref(0),
  poderCurar: ref(0),
  esTurno1: ref(true),
  swapDisponible: ref(0),
  identidad: ref(false),
});
const emit = defineEmits();

const emitLastimar = () => {
  emit('lastimar');
};

const emitCurar = () => {
  emit('curar');
};

const emitSwap = () => {
  emit('swap');
};

</script>

<template>
  <div class="card" style="width: 18rem;">
    <img class="card-img-top" src="./luchador.jpg" alt="Imagen luchador">
    <div class="card-body">
      <h5 class="card-title">{{ stamina }}</h5>
      <div v-if='esTurno1 && identidad'>
        <button @click="emitLastimar">Ataca!</button>
        <button @click="emitCurar">Curate!</button>
        <button @click="emitSwap" v-if="swapDisponible > 0">SWAP!</button>
      </div>

    </div>
  </div>
</template>

<style scoped>
.card-img-top {
  height: 100px;
  width: 100px;
}
</style>