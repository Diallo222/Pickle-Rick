<template lang="pug">
  .main
    .options
      .dropdown
        label(class="form-label") {{ options.label }}
        select.form-select(:aria-label="options.label" @blur="updateFilter($event, options.label)")
          option(value="") -- Select {{ options.label }} --
          option(
            v-for="option in options.values"
            :value="option"
            :key="options.label + option"
          ) {{ option }}
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  options: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits();

const updateFilter = (event: Event, label: string) => {
  const value = (event.target as HTMLSelectElement).value;

  const updatedFilters = {
    [label]: value,
  };

  emit("update:modelValue", updatedFilters);
};
</script>
