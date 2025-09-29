import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/new-user.tsx"),
	route("/login", "routes/login.tsx"),
	route("/home", "routes/home.tsx"),
	route("/timeline", "routes/timeline.tsx"),
	route("/knowledge", "routes/knowledge.tsx"),
	route("/knowledge/:slug", "routes/knowledge.$slug.tsx"),
] satisfies RouteConfig;
