import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { LayoutGridIcon as GridView, List, Search } from "lucide-react";
import { Navbar } from "./Navbar";
import { BoardView } from "./BoardView";
import { ListView } from "./ListView";
import type { Task, TaskSection } from "../../types/task";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchTasks } from "../../store/taskSlice";
import { AddTaskModal } from "./AddTaskModal";
import { useAuth } from "../../hooks/useAuth";

export const Dashboard = () => {
  const [view, setView] = useState<"list" | "board">("list");
  const [category, setCategory] = useState<string>("all");
  const [dueDate, setDueDate] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const { user } = useAuth();
  const dispatch: AppDispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  useEffect(() => {
    if (user?.uid) {
      const response = dispatch(fetchTasks(user.uid));
      console.log(response);
    }
  }, [dispatch, user]);

  useEffect(() => {
    console.log("Fetched tasks:", tasks);
  }, [tasks]);

  const sections: TaskSection[] = [
    {
      status: "todo",
      title: "To-Do",
      tasks: tasks.filter((task) => task.status === "todo"),
      color: "#FFE8F7",
    },
    {
      status: "in-progress",
      title: "In Progress",
      tasks: tasks.filter((task) => task.status === "in-progress"),
      color: "#E3FCFA",
    },
    {
      status: "completed",
      title: "Completed",
      tasks: tasks.filter((task) => task.status === "completed"),
      color: "#E8F7E8",
    },
  ];

  const handleTaskStatusChange = (taskId: string, newStatus: Task["status"]) => {
    console.log("Status changed:", taskId, newStatus);
  };

  const handleTaskSelect = (taskId: string, isSelected: boolean) => {
    setSelectedTasks((prev) =>
      isSelected ? [...prev, taskId] : prev.filter((id) => id !== taskId)
    );
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Navbar />

      <Container
        maxWidth="xl"
        sx={{
          mt: 3,
          px: { xs: 2, sm: 3 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            mb: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="text"
                startIcon={<List size={20} />}
                onClick={() => setView("list")}
                sx={{
                  color: view === "list" ? "primary.main" : "text.secondary",
                  "&:hover": { bgcolor: "transparent" },
                  px: 1,
                }}
              >
                List
              </Button>
              <Button
                variant="text"
                startIcon={<GridView size={20} />}
                onClick={() => setView("board")}
                sx={{
                  color: view === "board" ? "primary.main" : "text.secondary",
                  "&:hover": { bgcolor: "transparent" },
                  px: 1,
                }}
              >
                Board
              </Button>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexWrap: { xs: "wrap", sm: "nowrap" },
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ minWidth: "fit-content" }}
              >
                Filter by:
              </Typography>
              <Select
                size="small"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                sx={{
                  minWidth: 120,
                  bgcolor: "background.paper",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "divider",
                  },
                }}
              >
                <MenuItem value="all">Category</MenuItem>
                <MenuItem value="work">Work</MenuItem>
                <MenuItem value="personal">Personal</MenuItem>
              </Select>
              <Select
                size="small"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                sx={{
                  minWidth: 120,
                  bgcolor: "background.paper",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "divider",
                  },
                }}
              >
                <MenuItem value="all">Due Date</MenuItem>
                <MenuItem value="today">Today</MenuItem>
                <MenuItem value="week">This Week</MenuItem>
                <MenuItem value="month">This Month</MenuItem>
              </Select>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              ml: { xs: 0, sm: "auto" },
              flexDirection: { xs: "column", sm: "row" },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <TextField
              size="small"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={20} />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: "100%",
                maxWidth: { sm: 300 },
                bgcolor: "background.paper",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1,
                },
              }}
            />
            <Button
              variant="contained"
              sx={{
                bgcolor: "#9C27B0",
                "&:hover": {
                  bgcolor: "#7B1FA2",
                },
                minWidth: { xs: "100%", sm: "auto" },
                textTransform: "uppercase",
                fontWeight: 600,
              }}
              onClick={() => setIsAddTaskModalOpen(true)}
            >
              Add Task
            </Button>
          </Box>
        </Box>

        {view === "board" ? (
          <BoardView
            sections={sections}
            onTaskStatusChange={handleTaskStatusChange}
          />
        ) : (
          <ListView
            sections={sections}
            onTaskStatusChange={handleTaskStatusChange}
            onTaskSelect={handleTaskSelect}
            selectedTasks={selectedTasks}
          />
        )}
      </Container>

      {user && (
        <AddTaskModal
          open={isAddTaskModalOpen}
          onClose={() => setIsAddTaskModalOpen(false)}
          userId={user.uid}
        />
      )}
    </Box>
  );
};

export default Dashboard;