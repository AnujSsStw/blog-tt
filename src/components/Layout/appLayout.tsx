import { Box, Flex, Stack } from "@chakra-ui/react";
import { FC } from "react";
import Sidebar from "../sideBar";

interface Props {
  children: React.ReactNode;
}

import React from "react";
import { NavBar } from "../navBar";

const AppLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Flex>
        <Box
          w={"20%"}
          h={"100vh"}
          overflowY={"scroll"}
          _dark={{
            background: "rgb(26, 26, 26)",
          }}
        >
          {/* sidebar */}
          <Sidebar />
        </Box>

        <Stack
          w={"80%"}
          h={"100vh"}
          overflowY={"scroll"}
          /**
           * for white theme
           */
          // background={""}
          _dark={{
            background: "rgb(36, 36, 36)",
          }}
        >
          {/* navbar */}
          <Box position="sticky" top="0" zIndex={1}>
            <NavBar />
          </Box>

          {/* component */}
          <Box>{children}</Box>
        </Stack>
      </Flex>
    </>
  );
};

export default AppLayout;
