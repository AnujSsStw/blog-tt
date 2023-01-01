import { marked } from "marked";
import { z } from "zod";

import { publicProcedure, router } from "../trpc";

export const Post = router({
  getPostName: publicProcedure.query(async () => {
    const response = await fetch(
      `https://api.github.com/repos/AnujSsStw/blog-post/contents`,
      new AppRequestInit()
    );

    const data: post[] = await response.json();
    const a = data.map((item) => {
      const res = fetch(
        `https://api.github.com/repos/AnujSsStw/blog-post/contents/${item.path}`,
        new AppRequestInit()
      ).then((res) => res.json());
      return res;
    });

    const b = Promise.all(a);
    const res = await b;

    const c = res.map((i) => {
      const a = {
        name: i.map((j: { path: string }) => j.path.split("/")[0]),
        subTopic: i.map((j: { name: any }) => j.name),
      };
      return a;
    });

    c.map((i: { name?: string[]; subTopic: string[]; topic?: string }) => {
      if (i.name) {
        i.topic = i.name[0];
        delete i.name;
      }
      /* can also do this way maybe */
      // i.name.length = 1;
      // i.name = i.name[0] as any;

      return i;
    });

    return c as unknown as res[];
  }),
  getPostData: publicProcedure
    .input(
      z.object({
        query: z.object({
          topic: z.string(),
          id: z.string(),
        }),
      })
    )
    .query(async ({ input }) => {
      const { query } = input;
      const response = await fetch(
        `https://api.github.com/repos/AnujSsStw/blog-post/contents/${query.topic}/${query.id}`,
        new AppRequestInit()
      );
      const data = await response.json();
      const markdown = Buffer.from(data.content, "base64").toString("utf8");

      const html = marked(markdown);
      return html;
    }),
});

interface res {
  topic: string;
  subTopic: string[];
}
interface post {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  _links: {
    self: string;
    git: string;
    html: string;
  };
}

export default class AppRequestInit implements RequestInit {
  public method = "GET";
  public headers: Headers = new Headers();
  public mode: RequestMode = "cors";

  constructor() {
    this.headers.set("Content-Type", "application/json");
    this.headers.append("Authorization", `Bearer ${process.env.GITHUB_TOKEN}`);
  }
}
