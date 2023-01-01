import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  useColorMode,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";

export const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const Mode = () => {
    return (
      <Box
        sx={{
          borderStyle: "solid",
          borderWidth: "0 2px",
          borderColor: "white",
          padding: "0 10px",
          m: "0 10px",
        }}
        _hover={{
          cursor: "pointer",
        }}
      >
        {colorMode === "dark" ? (
          <MoonIcon onClick={toggleColorMode} />
        ) : (
          <SunIcon onClick={toggleColorMode} />
        )}
      </Box>
    );
  };

  const Big = (
    <>
      <Flex
        justifyContent={"end"}
        alignItems={"center"}
        backdropFilter={"blur(3px)"}
        p="10px"
      >
        {navItem.map((item, idx) => {
          return (
            <Link href={item.link} key={idx}>
              <Box
                sx={{
                  padding: "10px",
                }}
                _hover={{
                  color: "teal.500",
                }}
              >
                {item.name}
              </Box>
            </Link>
          );
        })}
        <Mode />
        {navIcon.map((item, idx) => {
          const l = idx === navIcon.length - 1;
          return (
            <Box m={"0 10px"} mr={l ? "60px" : "10px"} key={idx}>
              <a href={item.link} target="_blank" rel="noreferrer">
                {item.icon}
              </a>
            </Box>
          );
        })}
      </Flex>
    </>
  );

  const small = (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        Open
      </Button>
      <Drawer placement={"top"} onClose={onClose} isOpen={isOpen} isFullHeight>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody></DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
  return <>{isLargerThan1280 ? Big : small}</>;
};

const navItem = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Projects",
    link: "/project",
  },
  {
    name: "Contact",
    link: "/contact",
  },
];

const navIcon = [
  {
    name: "twitter",
    icon: <FaTwitter />,
    link: "https://twitter.com/anujzzZtw",
  },
  {
    name: "gitHub",
    icon: <AiFillGithub />,
    link: "https://github.com/AnujSsStw",
  },
];
