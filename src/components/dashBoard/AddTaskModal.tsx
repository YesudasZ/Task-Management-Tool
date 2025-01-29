import {  useState, type ChangeEvent } from "react"
import {
  Modal,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  Stack,
  IconButton,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { X, Bold, Strikethrough, List } from "lucide-react"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { useDispatch } from "react-redux"
import { createTask } from "../../store/taskSlice"
import type { AppDispatch } from "../../store/store"
import type { CreateTaskData } from "../../types/task"
import type { SelectChangeEvent } from "@mui/material"
import type { TaskCategory } from "../../types/task"

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
})

const CategoryButton = styled(ToggleButton)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[200]} !important`,
  borderRadius: "20px !important",
  padding: "6px 16px",
  color: "#666",
  backgroundColor: "#fff",
  textTransform: "none",
  "&.Mui-selected": {
    backgroundColor: "#F8F8F8 !important",
    color: "#000",
  },
}))

const UploadArea = styled(Paper)(({ theme }) => ({
  border: `2px dashed ${theme.palette.grey[200]}`,
  borderRadius: "8px",
  padding: "16px",
  textAlign: "center",
  backgroundColor: "#fff",
  cursor: "pointer",
  "&:hover": {
    borderColor: theme.palette.primary.main,
  },
}))

interface AddTaskModalProps {
  open: boolean
  onClose: () => void
  userId: string
}

export const AddTaskModal = ({ open, onClose, userId }: AddTaskModalProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<CreateTaskData>({
    title: "",
    description: "",
    category: "work",
    status: "todo",
    dueDate: new Date().toISOString(),
  })
  const [attachment, setAttachment] = useState<File | null>(null)
  const [charCount, setCharCount] = useState(0)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === "description") {
      setCharCount(value.length)
    }
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string) => (event: SelectChangeEvent) => {
    setFormData((prev) => ({ ...prev, [name]: event.target.value }))
  }

  const handleCategoryChange = (
    _event: React.MouseEvent<HTMLElement>,
    newCategory: TaskCategory | null
  ) => {
    if (newCategory !== null) {
      setFormData((prev) => ({ ...prev, category: newCategory }))
    }
  }
  

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setFormData((prev) => ({ ...prev, dueDate: date.toISOString() }))
    }
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setAttachment(event.target.files[0])
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await dispatch(createTask({ ...formData, attachment: attachment || undefined, userId }))
      onClose()
    } catch (error) {
      console.error("Error creating task:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <StyledModal open={open} onClose={onClose}>
      <Box
        sx={{
          width: { xs: "90%", sm: 600 },
          bgcolor: "#fff",
          borderRadius: 2,
          p: 3,
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h6">Create Task</Typography>
          <IconButton onClick={onClose} size="small" sx={{ color: "text.secondary" }}>
            <X size={20} />
          </IconButton>
        </Box>

        <Stack spacing={3}>
          <TextField
            fullWidth
            placeholder="Task title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            variant="outlined"
          />

          <Box sx={{ position: "relative" }}>
            <TextField
              fullWidth
              placeholder="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              multiline
              rows={4}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <Box sx={{ position: "absolute", bottom: 8, left: 8 }}>
                    <ToggleButtonGroup size="small" aria-label="text formatting">
                      <ToggleButton value="bold" aria-label="bold">
                        <Bold size={16} />
                      </ToggleButton>
                      <ToggleButton value="strikethrough" aria-label="strikethrough">
                        <Strikethrough size={16} />
                      </ToggleButton>
                      <ToggleButton value="list" aria-label="list">
                        <List size={16} />
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Box>
                ),
              }}
            />
            <Typography variant="caption" sx={{ position: "absolute", right: 8, bottom: 8 }}>
              {charCount}/300 characters
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }} color="text.secondary">
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
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }} color="text.secondary">
                Due on*
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={new Date(formData.dueDate)}
                  onChange={handleDateChange}
                  format="DD/MM/YYYY"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      placeholder: "DD/MM/YYYY",
                    },
                  }}
                />
              </LocalizationProvider>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }} color="text.secondary">
                Task Status*
              </Typography>
              <FormControl fullWidth>
                <Select value={formData.status} onChange={handleSelectChange("status")} displayEmpty>
                  <MenuItem value="todo">To Do</MenuItem>
                  <MenuItem value="in-progress">In Progress</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }} color="text.secondary">
              Attachment
            </Typography>
            <input type="file" id="file-upload" hidden onChange={handleFileChange} />
            <label htmlFor="file-upload">
              <UploadArea>
                {attachment ? (
                  attachment.name
                ) : (
                  <Typography color="text.secondary">
                    Drop your files here or{" "}
                    <Typography component="span" color="primary" sx={{ textDecoration: "underline" }}>
                      Update
                    </Typography>
                  </Typography>
                )}
              </UploadArea>
            </label>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "flex-end",
              mt: 2,
              borderTop: 1,
              borderColor: "grey.200",
              pt: 3,
            }}
          >
            <Button onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={loading || !formData.title}
              startIcon={loading && <CircularProgress size={20} />}
            >
              Create
            </Button>
          </Box>
        </Stack>
      </Box>
    </StyledModal>
  )
}

