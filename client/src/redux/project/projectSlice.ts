import {
  createSlice,
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction
} from '@reduxjs/toolkit'

import { AxiosResponseError } from '~/shared/types'
import { catchError } from '~/utils/handleAxiosError'
import projectService from './projectService'

type InitialState = {
  project: any
  sidebarProject: any
  overviewProject: any
  userPermission: any
  newProject: {
    title: string,
    description: string,
    teams: any
  }
  renameTeamData: {
    projectID: number,
    teamID: number,
    name: string
  }
  addNewTeam: {
    projectID: number,
    teamData: any
  }
  removeTeam: {
    projectID: number,
    teamID: number
  }
  projectDescription: {
    id: number,
    title: string,
    description: string
  }
  refresher: {
    teamStateUpdate: boolean,
    memberStateUpdate: boolean,
    projectStateUpdate: boolean,
  }
  update: {
    status: number,
    projectID: number,
  }
  filter: number
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  isSidebarLoading: boolean
  error: AxiosResponseError
};

const initialState: InitialState = {
  project: null,
  sidebarProject: null,
  userPermission: null,
  newProject: {
    title: "",
    description: "",
    teams: [
      { name: "Frontend" },
      { name: "Backend" }
    ]
  },
  overviewProject: {
    teams: []
  },
  renameTeamData: {
    projectID: 0,
    teamID: 0,
    name: ""
  },
  addNewTeam: {
    projectID: 0,
    teamData: []
  },
  removeTeam: {
    projectID: 0,
    teamID: 0
  },
  projectDescription: {
    id: 0,
    title: "",
    description: ""
  },
  refresher: {
    teamStateUpdate: true,
    memberStateUpdate: true,
    projectStateUpdate: true,
  },
  update: {
    status: 0,
    projectID: 0,
  },
  filter: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isSidebarLoading: false,
  error: {
    status: 0,
    content: null
  }
};

export const getSidebarProjects = createAsyncThunk(
  'project/sidebarProjectsStatus',
  async (_, thunkAPI) => {
    try {
      return await projectService.getSidebarProjects();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
);
export const filterProjects = createAsyncThunk(
  'project/filterProjectStatus',
  async (_, thunkAPI) => {
    const { project }: any = thunkAPI.getState();

    try {
      return await projectService.filterProjects(project.filter);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
);
export const getProject = createAsyncThunk(
  'project/getProjectStatus',
  async (id: any, thunkAPI) => {
    try {
      return await projectService.getProject(id)
    } catch (error: any) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
);
export const createProject = createAsyncThunk(
  'project/createProjectStatus',
  async (project: any, thunkAPI) => {
    try {
      return await projectService.createProject(project);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
);
export const renameTeamData = createAsyncThunk(
  'project/renameTeamDataStatus',
  async (_, thunkAPI) => {
    const { project }: any = thunkAPI.getState();

    try {
      return await projectService.renameTeamData(project.renameTeamData);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
);
export const updateProjectDetails = createAsyncThunk(
  'project/updateProjectDetailsStatus',
  async (_, thunkAPI) => {
    const { project }: any = thunkAPI.getState();

    try {
      return await projectService.updateProjectDetails(project.projectDescription);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
);
export const addNewTeam = createAsyncThunk(
  'project/addNewTeamStatus',
  async (_, thunkAPI) => {
    const { project }: any = thunkAPI.getState();

    try {
      return await projectService.addNewTeam(project.addNewTeam);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
);
export const removeTeam = createAsyncThunk(
  'project/removeTeamStatus',
  async (_, thunkAPI) => {
    const { project }: any = thunkAPI.getState();

    try {
      return await projectService.removeTeam(project.removeTeam);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
);
export const archiveProject = createAsyncThunk(
  'project/archiveProjectStatus',
  async (_, thunkAPI) => {
    const { project }: any = thunkAPI.getState();
    const { id } = project.overviewProject;

    try {
      return await projectService.archiveProject(id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
);
export const unarchiveProject = createAsyncThunk(
  'project/unarchiveProjectStatus',
  async (_, thunkAPI) => {
    const { project }: any = thunkAPI.getState();
    const { id } = project.overviewProject;

    try {
      return await projectService.unarchiveProject(id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
);
export const updateProjectStatus = createAsyncThunk(
  'project/updateProjectStatus',
  async (statusData: any, thunkAPI) => {
    try {
      return await projectService.updateProjectStatus(statusData);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
);

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.newProject = {
        title: "",
        description: "",
        teams: [
          { name: "Frontend" },
          { name: "Backend" }
        ]
      }
      state.error = {
        status: 0,
        content: null
      }
    },
    resetRefresher: (state) => {
      state.refresher.teamStateUpdate = false;
      state.refresher.memberStateUpdate = false;
      state.refresher.projectStateUpdate = false;
    },
    startRefresher: (state) => {
      state.refresher.teamStateUpdate = true;
      state.refresher.memberStateUpdate = true;
      state.refresher.projectStateUpdate = true;
    },
    teamRefresher: (state) => {
      state.refresher.teamStateUpdate = true;
    },
    memberRefresher: (state) => {
      state.refresher.memberStateUpdate = true;
    },
    projectRefresher: (state) => {
      state.refresher.projectStateUpdate = true;
    },

    setProjectTeam: (state, { payload }) => {
      state.newProject.teams = payload;
    },
    setProjectTitle: (state, { payload }) => {
      state.newProject.title = payload;
    },
    setProjectDescription: (state, { payload }) => {
      state.newProject.description = payload;
    },

    setTeamNewName: (state, { payload }) => {
      state.renameTeamData.name = payload;
    },
    setID: (state, { payload: { teamID, projectID } }) => {
      state.renameTeamData.teamID = teamID;
      state.renameTeamData.projectID = projectID;
    },

    setAddTeam: (state, { payload }) => {
      state.addNewTeam.teamData = payload;
    },
    setProjectId: (state, { payload }) => {
      state.addNewTeam.projectID = payload;
    },

    setEditProjectID: (state, { payload }) => {
      state.projectDescription.id = payload;
    },
    setEditProjectTitle: (state, { payload }) => {
      state.projectDescription.title = payload;
    },
    setEditProjectDescription: (state, { payload }) => {
      state.projectDescription.description = payload;
    },

    setRemoveTeamID: (state, { payload: { teamID, projectID } }) => {
      state.removeTeam.teamID = teamID;
      state.removeTeam.projectID = projectID;
    },
    setFilter: (state, { payload }) => {
      state.filter = payload;
    },

    setUserPermission: (state, { payload }) => {
      state.userPermission = payload;
    }
  },
  extraReducers: (builder: ActionReducerMapBuilder<any>) => {
    builder
      // Get Projects
      .addCase(getSidebarProjects.pending, (state) => {
        state.isLoading = true;
        state.isSidebarLoading = true;
      })
      .addCase(getSidebarProjects.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSidebarLoading = false;
        state.sidebarProject = action.payload;
        state.error = {
          status: 0,
          content: null
        }
      })
      .addCase(getSidebarProjects.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true
        state.isSuccess = false
        state.isLoading = false
        state.error = action.payload
        state.user = null
      })
      // Get Filtered Projects
      .addCase(filterProjects.pending, (state) => {
        state.isLoading = true;
        state.isSidebarLoading = true;
      })
      .addCase(filterProjects.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false; 
        state.isSidebarLoading = false;
        state.project = action.payload;
        state.error = {
          status: 0,
          content: null
        }
      })
      .addCase(filterProjects.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true
        state.isSuccess = false
        state.isLoading = false
        state.error = action.payload
        state.user = null
      })
      // Get Project
      .addCase(getProject.pending, (state) => {
        // state.isLoading = true;
        state.isSidebarLoading = true;
      })
      .addCase(getProject.fulfilled, (state, action: PayloadAction<any>) => {
        // state.isLoading = false;  
        state.isSidebarLoading = false;
        state.overviewProject = action.payload;
        state.error = {
          status: 0,
          content: null
        }
      })
      .addCase(getProject.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true
        state.isSuccess = false
        state.isLoading = false
        state.error = action.payload
        state.user = null
      })
      // Create Project
      .addCase(createProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProject.fulfilled, (state) => {
        state.isLoading = false;
        state.newProject = {
          title: "",
          description: "",
          teams: [
            { name: "Frontend" },
            { name: "Backend" }
          ]
        };
        state.error = {
          status: 0,
          content: null
        }
      })
      .addCase(createProject.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
      })
      // Rename Team
      .addCase(renameTeamData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(renameTeamData.fulfilled, (state) => {
        state.isLoading = false;
        state.error = {
          status: 0,
          content: null
        }
      })
      .addCase(renameTeamData.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
      })
      // Update Project Details
      .addCase(updateProjectDetails.pending, (state) => {
        state.isLoading = true;
        state.isSidebarLoading = true;
      })
      .addCase(updateProjectDetails.fulfilled, (state) => {  
        state.isLoading = false;
        state.isSidebarLoading = false;  
        state.error = {
          status: 0,
          content: null
        }
      })
      .addCase(updateProjectDetails.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
      })
      // Add New Team
      .addCase(addNewTeam.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewTeam.fulfilled, (state) => {
        state.isLoading = false;
        state.addNewTeam = {
          projectID: 0,
          teamData: []
        };
        state.error = {
          status: 0,
          content: null
        }
      })
      .addCase(addNewTeam.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
      })
      // Remove Team
      .addCase(removeTeam.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeTeam.fulfilled, (state) => {
        state.isLoading = false;
        state.removeTeam = {
          projectID: 0,
          teamID: 0
        };
        state.error = {
          status: 0,
          content: null
        }
      })
      .addCase(removeTeam.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
      })
      // Archive Project 
      .addCase(archiveProject.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
      })
      // Unarchive Project 
      .addCase(unarchiveProject.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
      })
      // Update Project Status 
      .addCase(updateProjectStatus.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
      })
  }
})

export const {
  reset,
  setID,
  setFilter,
  setAddTeam,
  setProjectId,
  teamRefresher,
  resetRefresher,
  startRefresher,
  setTeamNewName,
  setProjectTeam,
  setRemoveTeamID,
  setProjectTitle,
  memberRefresher,
  projectRefresher,
  setEditProjectID,
  setUserPermission,
  setEditProjectTitle,
  setProjectDescription,
  setEditProjectDescription,
} = projectSlice.actions
export default projectSlice.reducer
