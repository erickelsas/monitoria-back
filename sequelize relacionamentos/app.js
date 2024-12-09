const express = require("express");
const app = express();

const {
  courseRoutes,
  studentRoutes,
  teacherRoutes,
  courseTeacherRoutes,
  installRoute
} = require("./routes");

app.use(express.json());
app.use("/", installRoute);
app.use("/", studentRoutes);
app.use("/", teacherRoutes);
app.use("/", courseRoutes);
app.use("/", courseTeacherRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
