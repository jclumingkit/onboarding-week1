import { Center, Image } from "@mantine/core";

const PageNotFound = () => {
  return (
    <Center>
      <Image
        src="https://img.freepik.com/free-vector/error-404-concept-landing-page_52683-18367.jpg"
        alt="404 image"
        withPlaceholder
        style={{ objectFit: "contain" }}
      />
    </Center>
  );
};

export default PageNotFound;
