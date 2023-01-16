import React, { FC, ReactNode } from 'react';
import { Container } from '@mui/material';

interface MainContainerProps {
  children: ReactNode;
}

const MainContainer: FC<MainContainerProps> = (props: MainContainerProps) => {
  const { children } = props;
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {children}
    </Container>
  );
};

export default MainContainer;
