import { Box, Flex, Link, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";

export const BlogPost = (props: any) => {
  const { query } = props;
  const [heading, setHeadings] = useState<NodeListOf<HTMLElement>>();

  const { data, isFetching } = trpc.post.getPostData.useQuery(
    {
      query: {
        id: query.id,
        topic: query.topic,
      },
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (data) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, "text/html");
      const headingElements = doc.querySelectorAll("h2");
      setHeadings(headingElements as NodeListOf<HTMLHeadingElement>);
    }
  }, [data]);

  return (
    <>
      {isFetching ? (
        "Loading..."
      ) : (
        <Flex p={"80px"} pt={"40px"} id="heading-div" flexDir={"row"}>
          {/* <ReactMarkdown children={data?.markdown as any} /> */}
          <Box pr={"50px"} dangerouslySetInnerHTML={{ __html: data as any }} />

          {/* <Flex justifyContent={"space-between"}>
            {prev.length > 1 && (
              <Button
                size="md"
                border="2px"
                borderColor="green.500"
                flexDir={"column"}
              >
                <Box>prev</Box>
                <Box>{prev.split("/")[2]?.split(".")[0]}</Box>
              </Button>
            )}

            {next.length > 1 && (
              <Button
                size="md"
                border="2px"
                borderColor="green.500"
                flexDir={"column"}
                onClick={() => {
                  router.push("/[topic]/[id]", next);
                }}
              >
                <Box>next</Box>
                <Box>{next.split("/")[2]?.split(".")[0]}</Box>
              </Button>
            )}
          </Flex> */}

          {heading && (
            <Stack maxW={"228.2px"} position={"sticky"} top={"80px"} h={"100%"}>
              {Array.from(heading).map((heading: HTMLElement) => (
                <Link
                  key={heading.textContent}
                  onClick={() => {
                    const a = heading.id;
                    document.getElementById(a)?.scrollIntoView({
                      block: "center",
                      behavior: "smooth",
                      inline: "start",
                    });
                  }}
                  _hover={{
                    color: "teal.500",
                  }}
                >
                  {heading.textContent}
                </Link>
              ))}
            </Stack>
          )}
        </Flex>
      )}
    </>
  );
};
