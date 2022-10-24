import { FC, Dispatch, SetStateAction } from "react";
import { Button } from "@mantine/core";

type Props = {
  toggleSortButton: boolean;
  setToggleSortButton: Dispatch<SetStateAction<boolean>>;
};

const FoodSortButton: FC<Props> = (props) => {
  const { toggleSortButton, setToggleSortButton } = props;

  return (
    <Button
      size="md"
      type="button"
      color="yellow"
      onClick={() => setToggleSortButton(!toggleSortButton)}
      mx="sm"
    >
      Rating {toggleSortButton ? "↑" : "↓"}
    </Button>
  );
};

export default FoodSortButton;
