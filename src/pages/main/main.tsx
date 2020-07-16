import React from 'react';
import Menu from './menu/menu'
import Table from './table/table'
// import { Container } from './styles';

const main: React.FC = () => {
  return (
    <div>
      <Menu />
      <Table />
    </div>
  );
}

export default main;