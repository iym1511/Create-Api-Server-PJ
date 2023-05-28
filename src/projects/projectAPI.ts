import { Project } from './Project';
const baseUrl = 'http://localhost:4000';
const url = `${baseUrl}/projects`;
// const url = `${baseUrl}/fail`;

function translateStatusToErrorMessage(status: number) {
  switch (status) {
    case 401:
      return 'Please login again.';
    case 403:
      return 'You do not have permission to view the project(s).';
    default:
      return 'There was an error retrieving the project(s). Please try again.';
  }
}

function checkStatus(response: any) {
  if (response.ok) {
    return response;
  } else {
    const httpErrorInfo = {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    };
    console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

    let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
    throw new Error(errorMessage);
  }
}

function parseJSON(response: Response) {
  return response.json();
}

// eslint-disable-next-line
function delay(ms: number) {
  return function (x: any): Promise<any> {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms));
  };
}

function convertToProjectModels(data: any[]): Project[] {
  let projects: Project[] = data.map(convertToProjectModel);
  return projects;
}

function convertToProjectModel(item: any): Project {
  return new Project(item);
}

const projectAPI = {
  // 프로젝트 데이터를 가져오는 역할
  get(page = 1, limit = 20) {
    return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
      .then(delay(600)) // 응답 지연
      .then(checkStatus) // 응답상태확인
      .then(parseJSON) // JSON 문자열을 JavaScript 객체로 변환
      .then(convertToProjectModels) // Project 모델의 배열로 변환
      .catch((error: TypeError) => {
        console.log('log client error ' + error);
        throw new Error(
          'There was an error retrieving the projects. Please try again.'
        );
      });
  },

  // 프로젝트를 업데이트하는 역할
  put(project: Project) {
    return fetch(`${url}/${project.id}`, {
      method: 'PUT',
      body: JSON.stringify(project),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(checkStatus)
      .then(parseJSON)
      .catch((error: TypeError) => {
        console.log('log client error ' + error);
        throw new Error(
          'There was an error updating the project. Please try again.'
        );
      });
  },

  // 특정 프로젝트를 검색하는 역할
  // 단일 프로젝트 데이터를 Project 모델 객체로 변환
  find(id: number) {
        return fetch(`${url}/${id}`)
          .then(checkStatus)
          .then(parseJSON)
          .then(convertToProjectModel);
      },
};

export { projectAPI };