import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { collection, addDoc, getDocs, query, where, doc, updateDoc } from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db } from "../services/firebase/config"
import type { Task, CreateTaskData } from "../types/task"

interface TaskState {
  tasks: Task[]
  loading: boolean
  error: string | null
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
}

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData: CreateTaskData & { userId: string }, { rejectWithValue }) => {
    try {
      const { attachment, ...taskDetails } = taskData
      let attachmentUrl = ""

      if (attachment) {
        const storage = getStorage()
        const storageRef = ref(storage, `tasks/${Date.now()}_${attachment.name}`)
        await uploadBytes(storageRef, attachment)
        attachmentUrl = await getDownloadURL(storageRef)
      }

      const docRef = await addDoc(collection(db, "tasks"), {
        ...taskDetails,
        attachmentUrl,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })

      return {
        id: docRef.id,
        ...taskDetails,
        attachmentUrl,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Task
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  },
)

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (userId: string, { rejectWithValue }) => {
  try {
    const q = query(collection(db, "tasks"), where("userId", "==", userId))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Task[]
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (taskData: Task & { attachment?: File | null }, { rejectWithValue }) => {
    try {
      const { attachment, ...taskDetails } = taskData
      let attachmentUrl = taskDetails.attachmentUrl || ""

      if (attachment) {
        const storage = getStorage()
        const storageRef = ref(storage, `tasks/${Date.now()}_${attachment.name}`)
        await uploadBytes(storageRef, attachment)
        attachmentUrl = await getDownloadURL(storageRef)
      }

      const taskRef = doc(db, "tasks", taskDetails.id)
      await updateDoc(taskRef, {
        ...taskDetails,
        attachmentUrl,
        updatedAt: new Date().toISOString(),
      })

      return {
        ...taskDetails,
        attachmentUrl,
        updatedAt: new Date().toISOString(),
      } as Task
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  },
)

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false
        state.tasks.push(action.payload)
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false
        state.tasks = action.payload
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false
        const index = state.tasks.findIndex((task) => task.id === action.payload.id)
        if (index !== -1) {
          state.tasks[index] = action.payload
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default taskSlice.reducer