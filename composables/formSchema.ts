import * as yup from "yup";

export const formSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  message: yup.string().required("Message is required"),
});

export type FormSchema = yup.InferType<typeof formSchema>;
