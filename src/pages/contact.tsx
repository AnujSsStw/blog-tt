import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import AppLayout from "../components/Layout/appLayout";

const Contact: NextPage = () => {
  return (
    <>
      <Head>
        <title>Bang | Ani</title>
        <meta name="description" content="Contact" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <main>
          <div>
            <div>
              <h1>Hey!</h1>
              <blockquote>
                <p>
                  Sorry, I'm not too sure what I'll do with this page just yet.
                </p>
              </blockquote>
              <p>
                Head back to <Link href="/">home</Link> to see a list of my
                social media links.
              </p>
            </div>
          </div>
        </main>
      </AppLayout>
    </>
  );
};

export default Contact;
