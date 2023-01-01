import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  Link,
  List,
  Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import { trpc } from "../utils/trpc";

const Sidebar = () => {
  const { data, isFetching } = trpc.post.getPostName.useQuery(undefined, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const router = useRouter();

  function checks({ jdx, item, jtem }: any) {
    router.push("/[topic]/[id]", `/${item.topic}/${jtem}`);
  }

  return (
    <Box ml={"60px"} mr={"19px"}>
      <Stack>
        <Heading p={"10px"}>
          <Link href="/">Ani</Link>
        </Heading>
        {isFetching ? (
          <div>Loading...</div>
        ) : (
          <Accordion defaultIndex={[0]} allowMultiple>
            {data?.map((item, idx) => {
              return (
                <AccordionItem key={idx}>
                  {({ isExpanded }) => (
                    <>
                      <h2>
                        <AccordionButton>
                          <Box as="span" flex="1" textAlign="left">
                            {item.topic}
                          </Box>
                          {isExpanded ? (
                            <MinusIcon fontSize="12px" />
                          ) : (
                            <AddIcon fontSize="12px" />
                          )}
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        {item.subTopic.map((jtem, jdx) => {
                          return (
                            <List spacing={3} key={jdx}>
                              <Link
                                onClick={() => {
                                  checks({ item, jdx, jtem });
                                }}
                                _hover={{
                                  // background: "white",
                                  color: "teal.500",
                                }}
                              >
                                {jtem.split(".")[0]}
                              </Link>
                            </List>
                          );
                        })}
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              );
            })}
          </Accordion>
        )}
      </Stack>
    </Box>
  );
};
export default Sidebar;
