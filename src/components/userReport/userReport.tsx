import React, { useState, useEffect} from "react";

import Datatable from '../DataTable/DataTable'
import api from "../../services/api";


interface User {
  id: number;
  name: string;
  cdcId: number;
  ridesTotal: number;
  priceTotal: string;
  valAVG: number;
  status: string;
}

const UserReport: React.FC = () => {
  const token = localStorage.getItem("Token");
  const [users, setUsers] = useState<User[]>([]);


  useEffect(() => {
    async function loaders() {
      const response = await api.get("/v1/reports/users?companyId=3", {
        headers: {
          Authorization: token,
        },
      });
      setUsers(response.data.userReport);
    }
    loaders();
  }, []);
  
  return (
    <Datatable data={users} columns={[
      { key: 'id', label: 'Código:' },
      { key: 'name', label: 'Nome:' },
      { key: 'cdcId', label: 'CDC:' },
      { key: 'ridesTotal', label: 'Corridas:'},
      { key: 'priceTotal', label: 'Valor Total:'},
      { key: 'valAVG', label: 'Valor Médio:'},
      { key: 'status', label: 'Status:'}]} 
      columnsSearch={[
        {key: 'id', label: 'ID', valid: false},
        {key: 'name', label: 'Nome', valid: false},
        {key: 'cdcId', label: 'CDC', valid: false},
      ]}
    />
  );
}
export default UserReport