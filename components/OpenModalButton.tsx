import { Button } from "@mantine/core";
import { Dispatch, FC, SetStateAction } from "react";

type Props = {
  innerText: string;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

const OpenModalButton: FC<Props> = ({ innerText, setOpenModal }) => {
  return (
    <Button size="md" color="indigo" onClick={() => setOpenModal(true)}>
      {innerText}
    </Button>
  );
};

export default OpenModalButton;
