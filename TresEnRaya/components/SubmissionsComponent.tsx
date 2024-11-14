// File: ./components/SubmissionsComponent.tsx

import React from "react";
import "./SubmissionsComponent.css";
import { Project, FormField, FormSubmission } from "./interfaces";

interface SubmissionsComponentProps {
  project: Project;
  onBack: () => void;
}

export const SubmissionsComponent: React.FC<SubmissionsComponentProps> = ({
  project,
  onBack,
}) => {
  const { submissions = [], fields } = project;

  return (
    <div className="submissions-container">
      <h1>Submissions for {project.name}</h1>
      <button className="back-button" onClick={onBack}>
        Back
      </button>
      {submissions.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        <table className="submissions-table">
          <thead>
            <tr>
              <th>Submission ID</th>
              {fields.map((field) => (
                <th key={field.id}>{field.label}</th>
              ))}
              <th>Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission.id}>
                <td>{submission.id}</td>
                {fields.map((field) => (
                  <td key={field.id}>{submission.data[field.id] || ""}</td>
                ))}
                <td>{submission.submittedAt.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
