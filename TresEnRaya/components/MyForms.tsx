import React from "react";
import "./MyForms.css";
import { Project } from "./interfaces";

interface MyFormsProps {
  projects: Project[];
  onNewProject: () => void;
  onEditProject: (project: Project) => void;
  onFillForm: (project: Project) => void;
  onViewSubmissions: (project: Project) => void;
}

export const MyForms: React.FC<MyFormsProps> = ({
  projects,
  onNewProject,
  onEditProject,
  onFillForm,
  onViewSubmissions,
}) => {
  return (
    <div className="myforms-container">
      <h1>Request and Responses</h1>
      <button className="new-project-button" onClick={onNewProject}>
        New Project
      </button>
      <table className="myforms-table">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Submissions</th>
            <th>Project Owner</th>
            <th className="actions-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id || project.name}>
              <td>{project.name}</td>
              <td className="center-text">
                {project.submissions ? project.submissions.length : 0}
              </td>
              <td>{project.owner}</td>
              <td className="actions-cell">
                <button onClick={() => onEditProject(project)}>Edit</button>
                <button onClick={() => onFillForm(project)}>Fill Form</button>
                <button onClick={() => onViewSubmissions(project)}>
                  View Submissions
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
