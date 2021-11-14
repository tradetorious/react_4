import * as React from 'react';
import styled from 'styled-components/macro';

import Chart from './components/Chart';
import Table from './components/Table';

const Wrapper = styled.div`
  color: ${p => p.theme.text};
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-evenly;
`;

export default function WeatherPage() {
  return (
    <Wrapper>
      <Table />
      <Chart />
    </Wrapper>
  );
}
