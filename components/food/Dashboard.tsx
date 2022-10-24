import { FC } from "react";
import { Card, Image, Text, Badge, Group, SimpleGrid } from "@mantine/core";

import { Food } from "../../types/TFood";

const Dashboard: FC<{ foodList: Food[] }> = ({ foodList }) => {
  return (
    <SimpleGrid cols={3}>
      {foodList.map((foodItem) => {
        return (
          <Card
            style={{ width: "200px" }}
            key={foodItem.id}
            shadow="sm"
            p="lg"
            radius="md"
            withBorder
          >
            <Card.Section>
              <Image src={foodItem.image} height={160} alt={foodItem.name} />
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
              <Text weight={500}>{foodItem.name}</Text>
              <Badge
                color={foodItem.is_public ? "green" : "red"}
                variant="light"
              >
                {foodItem.is_public ? "public" : "private"}
              </Badge>
            </Group>

            <Text size="sm" color="dimmed">
              {foodItem.description}
            </Text>
          </Card>
        );
      })}
    </SimpleGrid>
  );
};

export default Dashboard;
