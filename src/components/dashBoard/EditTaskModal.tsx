import { useState, type ChangeEvent, useEffect } from "react"
import {
  Modal,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Stack,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  Divider,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { X, Bold, Italic, List } from "lucide-react"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { useDispatch } from "react-redux"
import { updateTask } from "../../store/taskSlice"
import type { AppDispatch } from "../../store/store"
import type { Task, TaskCategory } from "../../types/task"
import { SelectChangeEvent } from "@mui/material"

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
})

const CategoryButton = styled(ToggleButton)(() => ({
  border: "none !important",
  borderRadius: "20px !important",
  padding: "8px 24px",
  color: "#666",
  backgroundColor: "#F5F5F5",
  textTransform: "none",
  "&.Mui-selected": {
    backgroundColor: "#8B3DFF !important",
    color: "#fff",
  },
}))

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#F8F9FA",
    "& fieldset": {
      border: "none",
    },
  },
})

const UploadArea = styled(Paper)({
  border: "1px dashed #E0E0E0",
  borderRadius: "8px",
  padding: "16px",
  textAlign: "center",
  backgroundColor: "#F8F9FA",
  cursor: "pointer",
})

interface EditTaskModalProps {
  open: boolean
  onClose: () => void
  task: Task
}

export const EditTaskModal = ({ open, onClose, task }: EditTaskModalProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const [formData, setFormData] = useState<Task>(task)
  const [attachment, setAttachment] = useState<File | null>(null)
  const [charCount, setCharCount] = useState(task.description.length)
  const [activityLog] = useState([
    { action: "You created this task", timestamp: "Dec 27 at 1:15 pm" },
    { action: "You changed status from in progress to complete", timestamp: "Dec 28 at 1:15 pm" },
    { action: "You uploaded file", timestamp: "Dec 29 at 1:15 pm" },
  ])

  useEffect(() => {
    setFormData(task)
    setCharCount(task.description.length)
  }, [task])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === "description") {
      setCharCount(value.length)
    }
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (_event: React.MouseEvent<HTMLElement>, newCategory: TaskCategory | null) => {
    if (newCategory !== null) {
      setFormData((prev) => ({ ...prev, category: newCategory }))
    }
  }

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setFormData((prev) => ({ ...prev, dueDate: date.toISOString() }))
    }
  }


  const handleStatusChange = (event: SelectChangeEvent<Task["status"]>) => {
    setFormData((prev) => ({ ...prev, status: event.target.value as Task["status"] }))
  }
  
  const handleSubmit = async () => {
    try {
      await dispatch(updateTask({ ...formData, attachment }))
      setAttachment(null)
      onClose()
    } catch (error) {
      console.error("Error updating task:", error)
    }
  }

  return (
    <StyledModal open={open} onClose={onClose}>
        <>
      <Box
        sx={{
          width: 900,
          bgcolor: "#fff",
          borderRadius: 2,
          display: "flex",
          height: "80vh",
        }}
      >
        <Box sx={{ flex: 1, p: 3, overflowY: "auto" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h6" fontWeight="600">
              Edit Task
            </Typography>
            <IconButton onClick={onClose} size="small">
              <X size={20} />
            </IconButton>
          </Box>

          <Stack spacing={3}>
            <StyledTextField
              fullWidth
              placeholder="Task title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />

            <Box sx={{ position: "relative" }}>
              <Box sx={{ mb: 1 }}>
                <ToggleButtonGroup size="small" aria-label="text formatting">
                  <ToggleButton value="bold" aria-label="bold">
                    <Bold size={16} />
                  </ToggleButton>
                  <ToggleButton value="italic" aria-label="italic">
                    <Italic size={16} />
                  </ToggleButton>
                  <ToggleButton value="list" aria-label="list">
                    <List size={16} />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
              <StyledTextField
                fullWidth
                placeholder="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                multiline
                rows={4}
              />
              <Typography variant="caption" sx={{ position: "absolute", right: 8, bottom: -20 }} color="text.secondary">
                {charCount}/300 characters
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }} color="text.secondary">
                Task Category*
              </Typography>
              <ToggleButtonGroup
                value={formData.category}
                exclusive
                onChange={handleCategoryChange}
                aria-label="task category"
              >
                <CategoryButton value="work">Work</CategoryButton>
                <CategoryButton value="personal">Personal</CategoryButton>
              </ToggleButtonGroup>
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }} color="text.secondary">
                  Due on*
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={new Date(formData.dueDate)}
                    onChange={handleDateChange}
                    format="DD MMM, YYYY"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        sx: { backgroundColor: "#F8F9FA" },
                      },
                    }}
                  />
                </LocalizationProvider>
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }} color="text.secondary">
                  Task Status*
                </Typography>
                <Select
                  fullWidth
                  value={formData.status}
                  onChange={handleStatusChange}
                  sx={{ backgroundColor: "#F8F9FA" }}
                >
                  <MenuItem value="todo">To Do</MenuItem>
                  <MenuItem value="in-progress">In Progress</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </Box>
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }} color="text.secondary">
                Attachment
              </Typography>
              <UploadArea>
                <Typography color="text.secondary">
                  Drop your files here to{" "}
                  <Typography component="span" color="primary" sx={{ textDecoration: "underline" }}>
                    Upload
                  </Typography>
                </Typography>
              </UploadArea>
            </Box>
          </Stack>
        </Box>

        <Divider orientation="vertical" />

        <Box sx={{ width: 300, p: 3, bgcolor: "#FAFBFC" }}>
          <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 2 }}>
            Activity
          </Typography>
          <Stack spacing={2}>
            {activityLog.map((activity, index) => (
              <Box key={index}>
                <Typography variant="body2">{activity.action}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {activity.timestamp}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>

      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          right: 0,
          left: 0,
          p: 2,
          bgcolor: "white",
          borderTop: "1px solid",
          borderColor: "divider",
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
        }}
      >
        <Button onClick={onClose} sx={{ color: "text.secondary" }}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            bgcolor: "#8B3DFF",
            "&:hover": {
              bgcolor: "#7B2FEF",
            },
          }}
        >
          Update
        </Button>
      </Box>
      </>
    </StyledModal>
  )
}

