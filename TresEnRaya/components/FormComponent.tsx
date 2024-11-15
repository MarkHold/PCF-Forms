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
  const [owner, setOwner] = useState(""); // State for Project Owner
  const [fields, setFields] = useState<FormField[]>([]);

  useEffect(() => {
    if (project) {
      setName(project.name);
      setOwner(project.owner); // Set owner when editing
      setFields(project.fields);
    } else {
      setName("");
      setOwner(""); // Reset owner when creating new project
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
      owner, // Include owner in the project data
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

        <div className="form-field">
          <label htmlFor="owner">Project Owner</label>
          <input
            type="text"
            id="owner"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            placeholder="Enter Project Owner"
            required
          />
        </div>

        <h2>Form Fields</h2>
        {fields.map((field) => (
          <div key={field.id} className="form-field field-row">
            <input
              type="text"
              value={field.label}
              onChange={(e) => updateFieldLabel(field.id, e.target.value)}
              placeholder="Enter Field Name"
              required
            />
            <button
              type="button"
              onClick={() => removeField(field.id)}
              className="remove-field-button"
            >
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
