


import { Box, Checkbox, Typography, IconButton, Menu, MenuItem } from "@mui/material"
import { MoreHorizontal, GripVertical, CheckCircle, Circle } from "lucide-react"
import { useState } from "react"
import type { Task } from "../../types/task"
import { EditTaskModal } from "./EditTaskModal"

interface TaskCardProps {
  task: Task
  onStatusChange: (taskId: string, newStatus: Task["status"]) => void
  variant?: "list" | "board"
  selected?: boolean
  onSelect?: (taskId: string) => void
}

export const TaskCard = ({ task, onStatusChange, variant = "board", selected, onSelect }: TaskCardProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [editModalOpen, setEditModalOpen] = useState(false)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return "#E8F7E8"
      case "in-progress":
        return "#E3FCFA"
      default:
        return "#FFE8F7"
    }
  }

  const formatDueDate = (date?: string) => {
    if (!date) return "No due date"

    const dueDate = new Date(date)
    const today = new Date()
    const isToday =
      dueDate.getDate() === today.getDate() &&
      dueDate.getMonth() === today.getMonth() &&
      dueDate.getFullYear() === today.getFullYear()

    return isToday
      ? "Today"
      : dueDate.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        py: 1.5,
        px: variant === "list" ? 2 : 2,
        "&:hover": {
          bgcolor: "rgba(0, 0, 0, 0.02)",
        },
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Checkbox
        checked={selected}
        onChange={() => onSelect?.(task.id)}
        sx={{
          color: "#E0E0E0",
          "&.Mui-checked": {
            color: task.status === "completed" ? "#4CAF50" : "#9C27B0",
          },
        }}
      />
      <IconButton
        size="small"
        sx={{
          color: "text.secondary",
          cursor: "grab",
          "&:hover": { bgcolor: "transparent" },
        }}
      >
        <GripVertical size={16} />
      </IconButton>
      <Box sx={{ display: "flex", alignItems: "center", flex: 1, gap: 1 }}>
        <IconButton size="small" sx={{ color: task.status === "completed" ? "#4CAF50" : "#BDBDBD" }}>
          {task.status === "completed" ? <CheckCircle size={16} /> : <Circle size={16} />}
        </IconButton>
        <Typography
          sx={{
            textDecoration: task.status === "completed" ? "line-through" : "none",
            color: task.status === "completed" ? "text.secondary" : "text.primary",
            fontSize: "0.875rem",
          }}
        >
          {task.title}
        </Typography>
      </Box>
      <Typography
        color="text.secondary"
        sx={{
          fontSize: "0.875rem",
          display: "flex",
          textAlign: "center",
          flex: 1,
          minWidth: 100,
        }}
      >
        {formatDueDate(task.dueDate)}
      </Typography>
      <Box
        sx={{
          px: 1.5,
          py: 0.5,
          bgcolor: getStatusColor(task.status),
          borderRadius: "4px",
          fontSize: "0.75rem",
          color: "text.primary",
          textTransform: "uppercase",
          minWidth: 90,
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {task.status}
      </Box>
      <Typography
        color="text.secondary"
        sx={{
          fontSize: "0.875rem",
          minWidth: 80,
          textAlign: "center",
          flex: 1,
        }}
      >
        {task.category[0].toUpperCase() + task.category.slice(1)}
      </Typography>
      <IconButton
        aria-label="more"
        aria-controls={open ? "task-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ color: "text.secondary" }}
      >
        <MoreHorizontal size={16} />
      </IconButton>
      <Menu
        id="task-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "task-menu-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose()
            setEditModalOpen(true)
          }}
        >
          Edit
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ color: "error.main" }}>
          Delete
        </MenuItem>
      </Menu>
      {editModalOpen && <EditTaskModal open={editModalOpen} onClose={() => setEditModalOpen(false)} task={task} />}
    </Box>
  )
}


