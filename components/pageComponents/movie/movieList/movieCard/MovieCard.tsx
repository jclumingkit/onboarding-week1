import { FC } from "react";
import { useRouter } from "next/router";
import { useHover } from "@mantine/hooks";

import { Card, Image, Text, Group, Badge, Tooltip } from "@mantine/core";
import { MovieType } from "../../../../../data/movieData";

const MovieCard: FC<{ movieItem: MovieType }> = ({ movieItem }) => {
  const router = useRouter();
  const { hovered, ref } = useHover();

  const handleRouteToIMDB = () => {
    return router.push(`${process.env.IMDB_API}/${movieItem.imdb_id}`);
  };

  return (
    <Card
      shadow={hovered ? "lg" : "sm"}
      p="lg"
      radius="md"
      withBorder
      ref={ref}
    >
      <Card.Section onClick={handleRouteToIMDB}>
        <Tooltip label="See Movie" color="red">
          <Image
            src={movieItem.posterPath}
            alt={movieItem.title}
            withPlaceholder
            style={{ objectFit: "contain" }}
          />
        </Tooltip>
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{movieItem.title}</Text>
        <Badge color="yellow" variant="dot">
          {movieItem.rating.toFixed(2)}
        </Badge>
      </Group>

      <Text size="sm" color="dimmed" lineClamp={3}>
        {movieItem.description}
      </Text>
    </Card>
  );
};

export default MovieCard;
