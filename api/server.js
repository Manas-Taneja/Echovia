import * as build from "../build/server/index.js";
import { createRequestListener } from "@react-router/node";

const handleRequest = build.entry.module.default;

const listener = createRequestListener({
  build,
  mode: process.env.NODE_ENV || "production",
  getLoadContext: () => ({}),
});

export default async function(req, res) {
  return listener(req, res);
}

