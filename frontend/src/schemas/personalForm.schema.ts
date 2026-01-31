import * as Yup from "yup";
export const personalFormSchema = Yup.object({
  personal: Yup.object({
    age: Yup.number()
      .min(18, "Age must be between 18 and 65")
      .max(65, "Age must be between 18 and 65")
      .required("Age is required"),
    employmentDuration: Yup.number().when("employmentStatus", {
      is: (status: string) =>
        status === "employed" || status === "self_employed",
      then: (schema) =>
        schema
          .required("Months employed is required")
          .min(3, "Minimum 3 months employment required"),
      otherwise: (schema) => schema.notRequired().nullable(),
    }),
    employmentStatus: Yup.string().required(
      "Please select your employment status",
    ),
  }),
});
