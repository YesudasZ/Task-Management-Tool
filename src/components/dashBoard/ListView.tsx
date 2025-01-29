import {
  Box,
  Paper,
  Typography,
  Collapse,
  Button,
} from "@mui/material";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { useState } from "react";
import type { Task, TaskSection } from "../../types/task";
import { TaskCard } from "./TaskCard";

interface ListViewProps {
  sections: TaskSection[];
  onTaskStatusChange: (taskId: string, newStatus: Task["status"]) => void;
  onTaskSelect: (taskId: string, isSelected: boolean) => void;
  selectedTasks: string[];
}

export const ListView = ({ sections, onTaskStatusChange, onTaskSelect, selectedTasks }: ListViewProps) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    sections.reduce((acc, section) => ({ ...acc, [section.status]: true }), {}),
  );

  const toggleSection = (status: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [status]: !prev[status],
    }));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {sections.map((section) => (
        <Paper
          key={section.status}
          sx={{
            overflow: "hidden",
            boxShadow: "none",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "12px",
          }}
        >
          <Box
            sx={{
              px: 2,
              py: 1.5,
              backgroundColor: section.status === "todo" ? "#FFC0CB" : section.color,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onClick={() => toggleSection(section.status)}
          >
            <Typography
              sx={{
                fontSize: "1rem",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              {section.title} <span style={{ opacity: 0.7 }}>({section.tasks.length})</span>
            </Typography>
            {expandedSections[section.status] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </Box>

          <Collapse in={expandedSections[section.status]}>
            {section.tasks.length === 0 ? (
              <Box sx={{ p: 4, textAlign: "center" }}>
                <Typography color="text.secondary">No Tasks in {section.title}</Typography>
                <Button
                  startIcon={<Plus size={20} />}
                  sx={{
                    mt: 2,
                    color: "#9C27B0",
                    "&:hover": {
                      bgcolor: "rgba(156, 39, 176, 0.04)",
                    },
                  }}
                >
                  ADD TASK
                </Button>
              </Box>
            ) : (
              <Box>
                {section.tasks.map((task: Task) => (
                <TaskCard
                key={task.id}
                task={task}
                onStatusChange={onTaskStatusChange}
                onSelect={(taskId) => onTaskSelect(taskId, selectedTasks.includes(taskId))} // Corrected function signature
                selected={selectedTasks.includes(task.id)}
                variant="list"
              />
              
                ))}
                <Button
                  startIcon={<Plus size={20} />}
                  sx={{
                    mx: 2,
                    my: 1,
                    color: "#9C27B0",
                    "&:hover": {
                      bgcolor: "rgba(156, 39, 176, 0.04)",
                    },
                  }}
                >
                  ADD TASK
                </Button>
              </Box>
            )}
          </Collapse>
        </Paper>
      ))}
    </Box>
  );
};
