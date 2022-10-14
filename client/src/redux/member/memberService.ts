import { axios } from '~/shared/lib/axios';

const getAllUsers = async (projectID: any): Promise<any> => {
  const response = await axios.get(`/api/user?projectId=${projectID}`);

  if (response.status === 200 || 204) {
    return response.data;
  }
  return "Something went wrong"
};

const filterAllUser = async (searchData: any): Promise<any> => {
  const {projectID, searchValue} = searchData;
  const response = await axios.get(`/api/user?search=${searchValue}&projectId=${projectID}`);

  if (response.status === 200 || 204) {
    return response.data;
  }
  return "Something went wrong"
};

const getMembers = async (projectID: any): Promise<any> => {
  const response = await axios.get(`/api/project/${projectID}/member`);

  if (response.status === 200 || 204) {
    return response.data;
  }
  return "Something went wrong"
};

const filterMembers = async (filterData: any): Promise<any> => {
  const { projectID, teamID } = filterData;
  const response = await axios.get(`/api/project/${projectID}/member?filter=${teamID}`);

  if (response.status === 200 || 204) {
    return response.data;
  }
  return "Something went wrong"
};

const addNewMember = async (memberData: any): Promise<any> => {
  const { user_id, teams, project_id } = memberData;

  const response = await axios.post(`/api/project/${project_id}/member`, { user_id, teams });

  if (response.status === 200 || 204) {
    return "New member was added to the project!";
  }
  return "Something went wrong"
};

const editMemberTeam = async (updateMemberData: any): Promise<any> => {
  const { userID, projectID, teams } = updateMemberData;

  const response = await axios.put(`/api/project/${projectID}/member/${userID}`, {teams});

  if (response.status === 200 || 204) {
    return "Team updated successfully!";
  }
  return "Something went wrong"
}; 

const removeMember = async (removeMemberData: any): Promise<any> => {
  const { userID, projectID } = removeMemberData;

  const response = await axios.delete(`/api/project/${projectID}/member/${userID}`);

  if (response.status === 200 || 204) {
    return "Member removed successfully!";
  }
  return "Something went wrong"
}; 

const memberService = {
  getMembers,
  getAllUsers,
  addNewMember,
  removeMember,
  filterAllUser,
  filterMembers,
  editMemberTeam,
};

export default memberService
