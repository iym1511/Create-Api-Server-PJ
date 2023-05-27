import { useEffect, useState } from "react";
import { MOCK_PROJECTS } from "./MockProjects";
import { Project } from "./Project";
import ProjectList from "./ProjectList";
import { projectAPI } from "./projectAPI";

// ProjectList에 MockProjects를 props해줌
const ProjectsPage = () => {
  // 백엔드 api 가져올때
  // const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS)
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleMoreClick = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  // const saveProject = (project: Project) => {
  //   // console.log('Saving project: ', project);
  //   // 목업 id 랑 매개변수로 받아온 id가 같으면 받아온값을 projects에 담음
  //   let updatedProjects = projects.map((p: Project) => {
  //     return p.id === project.id ? project : p;
  //   });
  //   setProjects(updatedProjects);
  // };
  

  const saveProject = (project: Project) => {
    projectAPI
      .put(project)
      .then((updatedProject) => {
        // 백엔드 db.json id 랑 매개변수로 받아온 id가 같으면 받아온값을 projects에 담음
        let updatedProjects = projects.map((p: Project) => {
          return p.id === project.id ? new Project(updatedProject) : p;
        });
        setProjects(updatedProjects);
      })
      .catch((e) => {
        if (e instanceof Error) {
          setError(e.message);
        }
      });
  };


  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      try {
        const data = await projectAPI.get(currentPage);
        setError("");
        if (currentPage === 1) {
          setProjects(data);
        } else {
          setProjects((projects) => [...projects, ...data]);
        }
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, [currentPage]);

  return (
    <>
      <h1>Projects</h1>
      {error && (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse "></span>
                {error}
              </p>
            </section>
          </div>
        </div>
      )}
      <ProjectList projects={projects} onSave={saveProject} />

      {!loading && !error && (
        <div className="row">
          <div className="col-sm-12">
            <div className="button-group fluid">
              <button className="button default" onClick={handleMoreClick}>
                More...
              </button>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      )}
    </>
  );
};

export default ProjectsPage;
