// File: ./components/FillFormComponent.tsx

import React, { useState } from "react";
import { Project, FormField } from "./interfaces";
import "./FillFormComponent.css";

interface FillFormComponentProps {
  project: Project;
  onSubmit: (projectId: number, data: { [key: string]: string }) => void;
  onCancel: () => void;
}

export const FillFormComponent: React.FC<FillFormComponentProps> = ({
  project,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const handleChange = (fieldId: number, value: string) => {
    setFormData({ ...formData, [fieldId]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(project.id!, formData);
  };

  return (
    <main className="fill-form-container">
      <h1>{project.name}</h1>

      <form onSubmit={handleSubmit}>
        {project.fields.map((field) => (
          <div key={field.id} className="form-field">
            <label htmlFor={`field-${field.id}`}>{field.label}</label>
            <input
              type="text"
              id={`field-${field.id}`}
              value={formData[field.id] || ""}
              onChange={(e) => handleChange(field.id, e.target.value)}
              required
            />
          </div>
        ))}

        <div className="form-buttons">
          <button type="submit">Submit</button>
          <button type="button" onClick={onCancel} className="cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};
