import React from "react";
import { Button, Loader } from "decentraland-ui";

interface ConnectProps {
  handleConnect: () => void;
  pending: boolean;
}

export const Connect = ({ handleConnect, pending }: ConnectProps) => {
  return (
    <Button primary onClick={handleConnect}>
      {pending ? <Loader active inline="centered" size="tiny" /> : "Connect"}
    </Button>
  );
};
