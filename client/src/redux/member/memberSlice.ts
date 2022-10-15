import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  ActionReducerMapBuilder
} from '@reduxjs/toolkit'

import memberService from './memberService'
import { InitialState } from './memberType'
import { catchError } from '~/utils/handleAxiosError'

const initialState: InitialState = {
  member: null,
  userList: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  error: {
    status: 0,
    content: null
  }
}

export const getAllUsers = createAsyncThunk(
  'project/getAllUsersStatus',
  async (projectID: any, thunkAPI) => {
    try {
      return await memberService.getAllUsers(projectID)
    } catch (error: any) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)

export const filterAllUser = createAsyncThunk(
  'project/filterAllUserStatus',
  async (searchData: any, thunkAPI) => {
    try {
      return await memberService.filterAllUser(searchData)
    } catch (error: any) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)

export const getMembers = createAsyncThunk(
  'project/getMembersStatus',
  async (projectID: any, thunkAPI) => {
    try {
      return await memberService.getMembers(projectID)
    } catch (error: any) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)

export const filterMembers = createAsyncThunk(
  'project/filterMembersStatus',
  async (filterData: any, thunkAPI) => {
    try {
      return await memberService.filterMembers(filterData)
    } catch (error: any) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)

export const filterMembersByName = createAsyncThunk(
  'project/filterMembersByNameStatus',
  async (filterData: any, thunkAPI) => {
    try {
      return await memberService.filterMembersByName(filterData)
    } catch (error: any) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)

export const addNewMember = createAsyncThunk(
  'project/addNewMemberStatus',
  async (memberData: any, thunkAPI) => {
    try {
      return await memberService.addNewMember(memberData)
    } catch (error: any) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)

export const editMemberTeam = createAsyncThunk(
  'project/editMemberTeamStatus',
  async (updateMemberData: any, thunkAPI) => {
    try {
      return await memberService.editMemberTeam(updateMemberData)
    } catch (error: any) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)

export const removeMember = createAsyncThunk(
  'project/removeMemberStatus',
  async (removeMemberData: any, thunkAPI) => {
    try {
      return await memberService.removeMember(removeMemberData)
    } catch (error: any) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)

export const leaveProject = createAsyncThunk(
  'project/leaveProjectStatus',
  async (projectID: any, thunkAPI) => {

    try {
      return await memberService.leaveProject(projectID);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
);

export const setAsTeamLead = createAsyncThunk(
  'project/setAsTeamLeadStatus',
  async (teamLeadData: any, thunkAPI) => {

    try {
      return await memberService.setAsTeamLead(teamLeadData);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
);

export const setAsMVP = createAsyncThunk(
  'project/setAsMVPStatus',
  async (mvpData: any, thunkAPI) => {

    try {
      return await memberService.setAsMVP(mvpData);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
);

export const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.error = {
        status: 0,
        content: null
      }
    }
  },
  extraReducers: (builder: ActionReducerMapBuilder<any>) => {
    builder
      // Get All Users
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllUsers.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.userList = action.payload
        state.error = {
          status: 0,
          content: null
        }
      })
      .addCase(getAllUsers.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true
        state.isSuccess = false
        state.isLoading = false
        state.error = action.payload
        state.user = null
      })
      // Filter All Users
      .addCase(filterAllUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(filterAllUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.userList = action.payload
        state.error = {
          status: 0,
          content: null
        }
      })
      .addCase(filterAllUser.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true
        state.isSuccess = false
        state.isLoading = false
        state.error = action.payload
        state.user = null
      })
      // Get Members
      .addCase(getMembers.pending, (state) => {
        // state.isLoading = true;
      })
      .addCase(getMembers.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.member = action.payload
        state.error = {
          status: 0,
          content: null
        }
      })
      .addCase(getMembers.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true
        state.isSuccess = false
        state.isLoading = false
        state.error = action.payload
        state.user = null
      })
      // Filter Members
      .addCase(filterMembers.pending, (state) => {
        // state.isLoading = true;
      })
      .addCase(filterMembers.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.member = action.payload
        state.error = {
          status: 0,
          content: null
        }
      })
      .addCase(filterMembers.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true
        state.isSuccess = false
        state.isLoading = false
        state.error = action.payload
        state.user = null
      })
      // Filter Members By Name
      .addCase(filterMembersByName.pending, (state) => {
        // state.isLoading = true;
      })
      .addCase(filterMembersByName.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.member = action.payload
        state.error = {
          status: 0,
          content: null
        }
      })
      .addCase(filterMembersByName.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true
        state.isSuccess = false
        state.isLoading = false
        state.error = action.payload
        state.user = null
      })
      // Add New Member
      .addCase(addNewMember.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addNewMember.fulfilled, (state) => {
        state.isLoading = false
        state.error = {
          status: 0,
          content: null
        }
      })
      .addCase(addNewMember.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true
        state.isSuccess = false
        state.isLoading = false
        state.error = action.payload
        state.user = null
      })
      // Edit Member
      .addCase(editMemberTeam.pending, (state) => {
        // state.isLoading = true;
      })
      .addCase(editMemberTeam.fulfilled, (state) => {
        state.isLoading = false
        state.error = {
          status: 0,
          content: null
        }
      })
      .addCase(editMemberTeam.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true
        state.isSuccess = false
        state.isLoading = false
        state.error = action.payload
        state.user = null
      })
      // Remove Member
      .addCase(removeMember.pending, (state) => {
        state.isLoading = true
      })
      .addCase(removeMember.fulfilled, (state) => {
        state.isLoading = false
        state.error = {
          status: 0,
          content: null
        }
      })
      .addCase(removeMember.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true
        state.isSuccess = false
        state.isLoading = false
        state.error = action.payload
        state.user = null
      })
      // Leave Project
      .addCase(leaveProject.pending, (state) => { 
        state.isLoading = true;
      })
      .addCase(leaveProject.fulfilled, (state) => {
        state.isLoading = false;
        state.error = {
          status: 0,
          content: null
        }
      })
      .addCase(leaveProject.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true
        state.isSuccess = false
        state.isLoading = false
        state.error = action.payload
        state.user = null
      })
      // Set as Team Lead
      .addCase(setAsTeamLead.pending, (state) => { 
        state.isLoading = true;
      })
      .addCase(setAsTeamLead.fulfilled, (state) => {
        state.isLoading = false;
        state.error = {
          status: 0,
          content: null
        }
      })
      .addCase(setAsTeamLead.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true
        state.isSuccess = false
        state.isLoading = false
        state.error = action.payload
        state.user = null
      })
      // Set as MVP
      .addCase(setAsMVP.pending, (state) => { 
        state.isLoading = true;
      })
      .addCase(setAsMVP.fulfilled, (state) => {
        state.isLoading = false;
        state.error = {
          status: 0,
          content: null
        }
      })
      .addCase(setAsMVP.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true
        state.isSuccess = false
        state.isLoading = false
        state.error = action.payload
        state.user = null
      })
  }
})

export const { reset } = memberSlice.actions
export default memberSlice.reducer
