<template lang="pug">
    .main
      .form-field.mb-0(v-if="placeholder")
        input.form-control( :placeholder="placeholder" :value="value" @input="onchange(placeholder, $event.target.value)")
      .options
        .dropdown.d-grid.gap-2(v-for="(option, index) in options" :key="index")
          button.btn.btn-secondary.dropdown-toggle.mt-2(type="button" data-bs-toggle="dropdown" )
            | {{ option.label }}
          ul.dropdown-menu
            li(v-for="(value, index) in option.values" :key="index")
              a.dropdown-item(@click="onchange(option.label, value)") {{ value }}
</template>

<script setup lang="ts">
const props = defineProps({
  placeholder: {
    type: String,
    required: false,
  },
  value: {
    type: String,
    required: false,
  },
  options: {
    type: Array,
    required: true,
  },
  onchange: {
    type: Function,
    required: true,
  },
});
</script>
<style>
.main {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
