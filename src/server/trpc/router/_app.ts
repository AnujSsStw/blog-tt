import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { Post } from "./getPost";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  post: Post,
});

// export type definition of API
export type AppRouter = typeof appRouter;
