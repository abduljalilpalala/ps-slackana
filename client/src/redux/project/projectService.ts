import { axios } from '~/shared/lib/axios';

const filterProjects = async (params: number): Promise<any> => {
  const response = await axios.get(`/api/project?filter=${params}`);

  if (response.status === 200) {
    return response.data;
  }
  return "Something went wrong"
};
const getSidebarProjects = async (): Promise<any> => {
  const response = await axios.get('/api/project');

  if (response.status === 200) {
    return response.data;
  }
  return "Something went wrong"
};
const getProject = async (id: any): Promise<any> => {
  const response = await axios.get(`/api/project/${id}`);

  if (response.status === 200) {
    return response.data;
  }
  return "Something went wrong"
};
const createProject = async (project: any): Promise<any> => {
  const response = await axios.post('/api/project', project);

  if (response.status === 200) {
    return response.data;
  }
  return "Something went wrong"
};
const renameTeamData = async (teamData: any): Promise<any> => {
  const { projectID, teamID, name } = teamData;

  const response = await axios.put(`/api/project/${projectID}/team/${teamID}`, { name });

  if (response.status === 200) {
    return response.data;
  }
  return "Something went wrong"
};
const updateProjectDetails = async (projectData: any): Promise<any> => {
  const { id } = projectData;

  const response = await axios.put(`/api/project/${id}`, projectData);

  if (response.status === 200) {
    return response.data;
  }
  return "Something went wrong"
};
const addNewTeam = async (overviewTeamData: any): Promise<any> => {
  const { projectID, teamData } = overviewTeamData;

  const response = await axios.post(`/api/project/${projectID}/team`, { teams: teamData.map((team: any) => { return { name: team } }) });

  if (response.status === 200) {
    return response.data;
  }
  return "Something went wrong"
};
const removeTeam = async (teamData: any): Promise<any> => {
  const { projectID, teamID } = teamData;

  const response = await axios.delete(`/api/project/${projectID}/team/${teamID}`);

  if (response.status === 200) {
    return response.data;
  }
  return "Something went wrong"
};
const archiveProject = async (id: any): Promise<any> => {
  const response = await axios.delete(`/api/project/${id}/archive`);

  if (response.status === 200) {
    return response.data;
  }
  return "Something went wrong"
};
const unarchiveProject = async (id: any): Promise<any> => {
  const response = await axios.put(`/api/project/${id}/un-archive`);

  if (response.status === 200) {
    return response.data;
  }
  return "Something went wrong"
};
const updateProjectStatus = async (statusData: any): Promise<any> => {
  const { projectID, status } = statusData;

  const response = await axios.put(`/api/project/${projectID}/project-status`, { status });

  if (response.status === 200) {
    return response.data;
  }
  return "Something went wrong"
};

const projectService = {
  getProject,
  addNewTeam,
  removeTeam,
  createProject,
  filterProjects,
  renameTeamData,
  archiveProject,
  unarchiveProject,
  getSidebarProjects,
  updateProjectStatus,
  updateProjectDetails,
};

export default projectService
