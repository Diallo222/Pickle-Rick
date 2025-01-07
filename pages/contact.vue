<template lang="pug">
    .container-fluid.vh-100.d-flex.flex-column.justify-content-center.align-items-center
        .w-75
          h1.text-light Contact Us
          form(@submit.prevent="sendEmail")
            label.form-label.text-light(for="name") Name
            input.form-control#name(type="text" placeholder="Enter your name" v-model="name" v-bind="nameProps")
            p.text-danger#name-error(v-if="errors.name") {{ errors.name }}
            label.form-label.text-light(for="email") Email
            input.form-control#email(type="email" placeholder="Enter your email" v-model="email" v-bind="emailProps")
            p.text-danger(v-if="errors.email") {{ errors.email }}
            label.form-label.text-light(for="message") Message
            textarea.form-control#message(rows="5" placeholder="Enter your message" v-model="message" v-bind="messageProps")
            p.text-danger(v-if="errors.message") {{ errors.message }}
            button.btn.btn-primary.mt-2(type="submit" :disabled="isSubmitting") {{ isSubmitting ? 'Sending...' : 'Send' }}
</template>

<script setup lang="ts">
import { useToast } from "vue-toastification";
import { useForm } from "vee-validate";
import * as yup from "yup";
import emailjs from "@emailjs/browser";

const formSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  message: yup.string().required("Message is required"),
});

const { errors, defineField, resetForm, handleSubmit, isSubmitting, values } =
  useForm({
    validationSchema: formSchema,
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
  });
const [name, nameProps] = defineField("name");
const [email, emailProps] = defineField("email");
const [message, messageProps] = defineField("message");

const config = useRuntimeConfig();

const toast = useToast();

const sendEmail = handleSubmit(async () => {
  try {
    await emailjs.send(
      config.public.emailJsServiceId,
      config.public.emailJsTemplateId,
      {
        user_name: values.name,
        to_name: "Diallo",
        user_email: values.email,
        to_email: "almahadydiallo@gmail.com",
        message: values.message,
      },
      config.public.emailJsPublicKey
    );
    toast.success("Email sent successfully.");
    resetForm();
  } catch (error) {
    toast.error("An unexpected error occurred.");
  }
});
</script>
