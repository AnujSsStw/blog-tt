import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { About } from "../../components/about";
import { BlogPost } from "../../components/blog";
import AppLayout from "../../components/Layout/appLayout";
import { trpc } from "../../utils/trpc";

const Blog = (props: any) => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{router.query.id}</title>
        <meta name="description" content="Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <BlogPost {...props} />
      </AppLayout>
    </div>
  );
};

export default Blog;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // ...
  const { query } = context;

  return {
    props: {
      query,
    },
  };
};
