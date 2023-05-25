import { useState } from "react";
import { MOCK_PROJECTS } from "./MockProjects";
import { Project } from "./Project";
import ProjectList from "./ProjectList";

// ProjectList에 MockProjects를 props해줌 
const ProjectsPage = () => {
  // const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS)
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  
  const saveProject = (project: Project) => {
      // console.log('Saving project: ', project);
      // 목업 id 랑 매개변수로 받아온 id가 같으면 받아온값을 projects에 담음
      let updatedProjects = projects.map((p: Project) => {
        return p.id === project.id ? project : p;
      });
      setProjects(updatedProjects); 
    };

  return (
      <>
        <h1>Projects</h1>
        <ProjectList projects={projects} onSave={saveProject}/>
      </>
    );
}

export default ProjectsPage;