import { FC, FunctionComponent, useState } from "react";
import { Project } from "./Project";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

interface ProjectListProps {
  projects: Project[];
  onSave: (project: Project) => void;
}

// ProjectsPage 에서 MockProjects를 props받아와서 map으로 출력한걸
// ProjectCard에 map으로 풀어준걸 한번더 props 해줌
const ProjectList = ({ projects, onSave }: ProjectListProps) => {
  const [projectBeingEdited, setProjectBeingEdited] = useState({});

  // ProjectCard 에서 클릭한 카드값 projectBeingEdited 에 담음
  const handleEdit = (project: Project) => {
    setProjectBeingEdited(project);
  };

  // projectBeingEdiited 를 빈값으로 만들어서 cancle작동
  const cancelEditing = () => {
    setProjectBeingEdited({});
  };

  const items = projects.map((project) => (
    <div key={project.id} className="cols-sm">
      {/* project 랑 projectBeingEdited랑 같은게 있으면 - */}
      {project === projectBeingEdited ? (
        <ProjectForm onCancel={cancelEditing} onSave={onSave} project={project}/>
      ) : (
        <ProjectCard project={project} onEdit={handleEdit}></ProjectCard>
      )}
    </div>
  ));

  return <div className="row">{items}</div>;
};

export default ProjectList;
