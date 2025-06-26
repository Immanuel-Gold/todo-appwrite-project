import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/alltodos.tsx"),
  route("new", "routes/newtodo.tsx"),
  route("todos/:id", "routes/todo.tsx"),
] satisfies RouteConfig;
