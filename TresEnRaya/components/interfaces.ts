// File: ./components/interfaces.ts

export interface FormField {
  id: number;
  label: string;
  type: "text";
}

export interface FormSubmission {
  id: number;
  data: { [fieldId: number]: string };
  submittedAt: Date;
}

export interface Project {
  id?: number;
  name: string;
  owner: string; // Added Project Owner field
  fields: FormField[];
  submissions?: FormSubmission[];
}
