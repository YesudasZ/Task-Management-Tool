import { Box, Paper, Typography } from "@mui/material"
import type { Task, TaskSection } from "../../types/task"
import { TaskCard } from "./TaskCard"

interface BoardViewProps {
  sections: TaskSection[]
  onTaskStatusChange: (taskId: string, newStatus: Task["status"]) => void
}

export const BoardView = ({ sections, onTaskStatusChange }: BoardViewProps) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
        gap: 2,
        p: 2,
        height: { md: "calc(100vh - 64px)" },
        overflow: "auto",
      }}
    >
      {sections.map((section) => (
        <Paper
          key={section.status}
          sx={{
            p: 2,
            backgroundColor: section.color,
            height: "fit-content",
            minHeight: "200px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {section.title}
            <Typography component="span" variant="body2" sx={{ color: "text.secondary" }}>
              ({section.tasks.length})
            </Typography>
          </Typography>

          {section.tasks.length === 0 ? (
            <Typography color="text.secondary" align="center" sx={{ mt: 4 }}>
              No Tasks in {section.title}
            </Typography>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {section.tasks.map((task:Task) => (
                <TaskCard key={task.id} task={task} onStatusChange={onTaskStatusChange} variant="board" />
              ))}
            </Box>
          )}
        </Paper>
      ))}
    </Box>
  )
}

