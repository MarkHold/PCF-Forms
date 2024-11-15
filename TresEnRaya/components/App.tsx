// File: ./components/App.tsx

import React, { useState } from "react";
import { MyForms } from "./MyForms";
import { FormComponent } from "./FormComponent";
import { FillFormComponent } from "./FillFormComponent";
import { SubmissionsComponent } from "./SubmissionsComponent";
import { Project, FormSubmission } from "./interfaces";

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<
    "list" | "form" | "fillForm" | "submissions"
  >("list");
  const [projects, setProjects] = useState<Project[]>([
    // Initial sample projects (optional)
    {
      id: 1,
      name: "Sample Project",
      owner: "Alice", // Added Project Owner
      fields: [
        { id: 1, label: "First Name", type: "text" },
        { id: 2, label: "Last Name", type: "text" },
      ],
      submissions: [],
    },
  ]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  /** Handles creating a new project */
  const handleNewProject = () => {
    setSelectedProject(null);
    setCurrentView("form");
  };

  /** Handles editing an existing project */
  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setCurrentView("form");
  };

  /** Handles filling out a form for a project */
  const handleFillForm = (project: Project) => {
    setSelectedProject(project);
    setCurrentView("fillForm");
  };

  /** Handles viewing submissions for a project */
  const handleViewSubmissions = (project: Project) => {
    setSelectedProject(project);
    setCurrentView("submissions");
  };

  /** Handles saving a new or edited project */
  const handleFormSubmit = (project: Project) => {
    if (project.id) {
      // Edit existing project
      setProjects((prevProjects) =>
        prevProjects.map((p) => (p.id === project.id ? project : p))
      );
    } else {
      // Add new project
      const newId =
        projects.length > 0
          ? Math.max(...projects.map((p) => p.id || 0)) + 1
          : 1;
      const newProject: Project = { ...project, id: newId };
      setProjects((prevProjects) => [...prevProjects, newProject]);
    }
    setCurrentView("list");
  };

  /** Handles submitting a filled form */
  const handleFillFormSubmit = (
    projectId: number,
    data: { [fieldId: number]: string }
  ) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) => {
        if (project.id === projectId) {
          const newSubmission: FormSubmission = {
            id: project.submissions ? project.submissions.length + 1 : 1,
            data,
            submittedAt: new Date(),
          };
          const updatedSubmissions = project.submissions
            ? [...project.submissions, newSubmission]
            : [newSubmission];
          return { ...project, submissions: updatedSubmissions };
        }
        return project;
      })
    );
    setCurrentView("list");
  };

  /** Handles cancel actions and navigates back to the list view */
  const handleCancel = () => {
    setCurrentView("list");
  };

  return (
    <>
      {currentView === "list" && (
        <MyForms
          projects={projects}
          onNewProject={handleNewProject}
          onEditProject={handleProjectSelect}
          onFillForm={handleFillForm}
          onViewSubmissions={handleViewSubmissions}
        />
      )}
      {currentView === "form" && (
        <FormComponent
          project={selectedProject}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />
      )}
      {currentView === "fillForm" && selectedProject && (
        <FillFormComponent
          project={selectedProject}
          onSubmit={handleFillFormSubmit}
          onCancel={handleCancel}
        />
      )}
      {currentView === "submissions" && selectedProject && (
        <SubmissionsComponent project={selectedProject} onBack={handleCancel} />
      )}
    </>
  );
};
