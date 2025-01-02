<template lang="pug">
  .main
    .options
      .dropdown
        label(class="form-label") {{ options.label }}
        select.form-select(
          :aria-label="options.label"
          @blur="updateFilter($event, options.label)"
          :value="modelValue"
        )
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

const emit = defineEmits(["update:modelValue"]);

// Update the filter when an option is selected
const updateFilter = (event: Event, label: string) => {
  const value = (event.target as HTMLSelectElement).value;
  emit("update:modelValue", value);
};
</script>
