// File: ./components/FormComponent.tsx

import "./FormComponent.css";
import React, { useState, useEffect } from "react";
import { Project, FormField } from "./interfaces";

interface IFormComponentProps {
  project: Project | null;
  onSubmit: (project: Project) => void;
  onCancel: () => void;
}

export const FormComponent: React.FC<IFormComponentProps> = ({
  project,
  onSubmit,
  onCancel,
}) => {
  const [name, setName] = useState("");
  const [fields, setFields] = useState<FormField[]>([]);

  useEffect(() => {
    if (project) {
      setName(project.name);
      setFields(project.fields);
    } else {
      setName("");
      setFields([]);
    }
  }, [project]);

  const addField = () => {
    const newField: FormField = {
      id: fields.length > 0 ? Math.max(...fields.map((f) => f.id)) + 1 : 1,
      label: "",
      type: "text",
    };
    setFields([...fields, newField]);
  };

  const updateFieldLabel = (id: number, label: string) => {
    setFields(
      fields.map((field) => (field.id === id ? { ...field, label } : field))
    );
  };

  const removeField = (id: number) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject: Project = {
      id: project?.id,
      name,
      fields,
    };
    onSubmit(newProject);
  };

  return (
    <main className="form-container">
      <h1>{project ? "Edit Project" : "New Project"}</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="name">Project Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Project Name"
            required
          />
        </div>

        <h2>Form Fields</h2>
        {fields.map((field) => (
          <div key={field.id} className="form-field">
            <input
              type="text"
              value={field.label}
              onChange={(e) => updateFieldLabel(field.id, e.target.value)}
              placeholder="Enter Field Name"
              required
            />
            <button type="button" onClick={() => removeField(field.id)}>
              Remove
            </button>
          </div>
        ))}

        <button type="button" onClick={addField} className="add-field-button">
          Add Field
        </button>

        <div className="form-buttons">
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel} className="cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};
