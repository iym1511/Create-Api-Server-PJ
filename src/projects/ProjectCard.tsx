import { Project } from "./Project";
import React from "react";

// 0번째부터 60번째까지 자르고 그뒤에는 ... 으로 표현
function formatDescription(description: string): string {
  return description.substring(0, 60) + "...";
}

interface ProjectCardProps {
  project: Project;
  // return되는것이 없는 함수를 props해서 받아올때 타입
  // ProjectList에서 project라는 매게변수를 지정하고 받아오기떄문에
  // project(매게변수) 에도 타입을 지정해줌
  onEdit: (project: Project) => void
}

function ProjectCard(props: ProjectCardProps) {
  const { project, onEdit } = props;

  const handleEditClick = (projectBeingEdited: Project) => {
    onEdit(projectBeingEdited);
  };

  return (
    <div className="card">
      <img src={project.imageUrl} alt={project.name} />
      <section className="section dark">
        <h5 className="strong">
          <strong>{project.name}</strong>
        </h5>
        <p>{formatDescription(project.description)}</p>
        <p>Budget : {project.budget.toLocaleString()}</p>
        <button
          className=" bordered"
          onClick={() => {
            handleEditClick(project);
          }}
        >
          <span className="icon-edit "></span>
          Edit
        </button>
      </section>
    </div>
  );
}

export default ProjectCard;
