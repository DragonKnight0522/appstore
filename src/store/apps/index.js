import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// ** Fetch Apps
export const fetchApps = createAsyncThunk('apps/fetchApps', async () => {
  // const response = await axios.get('/apps')
  // return response.data // should contain { installed: [], allData: [] }
  return {
    frequentlyUsedApps: ["2", "1", "4", "3"],
    installedApps: ["2", "3", "5", "7"],
    allData: [
      { id: "1", title: "Accelerate System", desc: "Accelerate system", icon: "lucide:rocket" },
      { id: "2", title: "Powerflow", desc: "An advanced AI assistant", icon: "tabler:message-circle-2-filled" },
      { id: "3", title: "My Files", desc: "A simple file manager", icon: "solar:folder-with-files-bold" },
      { id: "4", title: "Knowledge Graph", desc: "Knowledge graph viewer", icon: "ph:graph-bold" },
      { id: "5", title: "Tenants App", desc: "Tenants application", icon: "tabler:user" },
      { id: "6", title: "Access Control", desc: "Access control app for Accelerate", icon: "cbi:adgaurd" },
      { id: "7", title: "Audit Logs", desc: "Manage Audit Logs", icon: "ri:menu-search-line" },
      { id: "8", title: "User Management", desc: "Effortlessly manage user accounts", icon: "tabler:user-cog" },
      { id: "9", title: "Workgroup Management", desc: "Easily assign users to specific workgroup", icon: "fa-solid:users" },
    ]
  }
})

// ** Install App
export const installApp = createAsyncThunk('apps/installApp', async (appId, { dispatch }) => {
  // await axios.patch(`/app/install/${appId}`)
  dispatch(handleInstallApp(appId))
})

// ** Uninstall App
export const uninstallApp = createAsyncThunk('apps/uninstallApp', async (appId, { dispatch }) => {
  // await axios.delete(`/app/uninstall/${appId}`)
  dispatch(handleUninstallApp(appId))
})

export const appsSlice = createSlice({
  name: 'apps',
  initialState: {
    frequentlyUsedApps: [],
    installedApps: [],
    allData: []
  },
  reducers: {
    handleInstallApp: (state, action) => {
      state.installedApps.push(action.payload)
    },
    handleUninstallApp: (state, action) => {
      state.installedApps = state.installedApps.filter((appId) => appId !== action.payload)
    },
    handleAddFrequentlyUsedApp: (state, action) => {
      let newFrequentlyUsedApps = state.frequentlyUsedApps.filter((appId) => appId !== action.payload)
      newFrequentlyUsedApps = [action.payload, ...newFrequentlyUsedApps];
      const maxApps = 5;
      state.frequentlyUsedApps = newFrequentlyUsedApps.slice(0, maxApps);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchApps.fulfilled, (state, action) => {
      state.allData = action.payload.allData;
      state.installedApps = action.payload.installedApps;
      state.frequentlyUsedApps = action.payload.frequentlyUsedApps;
    })
  }
})

export const { handleInstallApp, handleUninstallApp, handleAddFrequentlyUsedApp } = appsSlice.actions

export default appsSlice.reducer
