import { FC, useState } from "react";
import { Modal, Button } from "@mantine/core";

type Props = {
  childComponent: React.ReactNode;
  buttonText: string;
};

const CenteredModal: FC<Props> = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const { childComponent, buttonText } = props;
  return (
    <>
      <Modal
        centered
        size="lg"
        opened={openModal}
        onClose={() => setOpenModal(false)}
        title="Share Your Food"
      >
        {childComponent}
      </Modal>
      <Button size="md" color="indigo" onClick={() => setOpenModal(true)}>
        {buttonText}
      </Button>
    </>
  );
};

export default CenteredModal;
