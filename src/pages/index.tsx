import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { About } from "../components/about";
import AppLayout from "../components/Layout/appLayout";

const Home: NextPage = () => {
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");
  return (
    <>
      <Head>
        <title>Bang | Ani</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLargerThan1280 ? (
        <AppLayout>
          <About />
        </AppLayout>
      ) : (
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          h={"100vh"}
          flexDir="column"
        >
          I got bored doing mobile CSS.
          <Box>
            Check my blog here -
            <Link href={"https://anichan.hashnode.dev"}> Hashnode </Link>
          </Box>
        </Flex>
      )}
    </>
  );
};

export default Home;
