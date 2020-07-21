import React, { useState, useEffect } from "react";

import Datatable from '../../components/DataTable/DataTable'
import api from "../../services/api";

import "./main.css";

interface User {
  id: number;
  name: string;
  cdcId: number;
  ridesTotal: number;
  priceTotal: string;
  valAVG: number;
  status: string;
}

export default function Main() {
  const token = localStorage.getItem("Token");
  const [users, setUsers] = useState<User[]>([]);


  useEffect(() => {
    async function loaders() {
      const response = await api.get("/v1/reports/users?companyId=3", {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdhYnJpZWxkaWJhc3RpYW5pQGhvdG1haWwuY29tIiwiaWQiOjU5LCJ1c2VySWQiOjExNywiZXhwIjoxNTk5NzkzODUxLjU0NCwiaWF0IjoxNTk0NjA5ODUxfQ.OTtI51grVrmtrHMhSgGoNikNWTY9xTr1_km-zHu9W0s",
        },
      });
      setUsers(response.data.userReport);
    }
    loaders();
  }, []);

  return (
    <div>
      <Datatable data={users} columns={[
        { key: 'id', label: 'Código:' },
        { key: 'name', label: 'Nome:' },
        { key: 'cdcId', label: 'CDC:' },
        { key: 'ridesTotal', label: 'Corridas:'},
        { key: 'priceTotal', label: 'Valor Total:'},
        { key: 'valAVG', label: 'Valor Médio:'},
        { key: 'status', label: 'Status:'}
      ]} />
    </div>
  );
}