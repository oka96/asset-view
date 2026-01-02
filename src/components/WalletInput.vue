<template>
  <form class="panel" @submit.prevent="submit">
    <label class="text-muted" for="wallet-input">Sui wallet address</label>
    <div style="display: flex; gap: 1rem; margin-top: 0.5rem; flex-wrap: wrap;">
      <input
        id="wallet-input"
        :value="modelValue"
        placeholder="0x..."
        autocomplete="off"
        spellcheck="false"
        @input="updateValue(($event.target as HTMLInputElement).value)"
      />
      <button type="submit" :disabled="loading" style="min-width: 180px">
        {{ loading ? 'Loading…' : 'View assets' }}
      </button>
    </div>
    <p class="text-muted" style="margin-top: 0.75rem; font-size: 0.85rem;">
      Data is fetched live from the Mysten Gateway RPC endpoint.
    </p>
  </form>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string;
  loading: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'submit'): void;
}>();

const updateValue = (value: string) => {
  emit('update:modelValue', value);
};

const submit = () => {
  if (!props.loading) {
    emit('submit');
  }
};
</script>
