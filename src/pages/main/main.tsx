import React, { useState, useEffect } from "react";

import Datatable from '../../components/DataTable/DataTable'

import api from "../../services/api";

import "./main.css";

interface User {
  id: number;
  name: string;
  cdcId?: number;
  ridesTotal?: number;
  priceTotal?: string;
  valAVG?: number;
  status?: string;
}

export default function Teste() {
  const token = localStorage.getItem("Token");
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'John Doe', cdcId: 1 },
    { id: 2, name: 'John Tree', cdcId: 10 },
    { id: 3, name: 'John Qua', cdcId: 12 },
    { id: 4, name: 'John Qui', cdcId: 5 },
    { id: 5, name: 'John Sex', cdcId: 150 },
    { id: 6, name: 'John Set', cdcId: 70 },
    { id: 7, name: 'John Oct', cdcId: 3 },
    { id: 8, name: 'John Non', cdcId: 0 },
    { id: 9, name: 'John Doe', cdcId: 123 },
    { id: 10, name: 'John Tree', cdcId: 66 },
    { id: 11, name: 'John Qua', cdcId: 0 },
    { id: 12, name: 'John Qui', cdcId: 102 },
    { id: 13, name: 'John Sex', cdcId: 158 },
    { id: 14, name: 'John Set', cdcId: 250 },
    { id: 15, name: 'John Oct', cdcId: 78 },
    { id: 16, name: 'John Non', cdcId: 90 },
  ]);


  useEffect(() => {
    // async function loaders() {
    //   const response = await api.get("/admin/v1/reports/players?companyId=10", {
    //     headers: {
    //       Authorization:
    //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdhYnJpZWxkaWJhc3RpYW5pQGhvdG1haWwuY29tIiwiaWQiOjU5LCJ1c2VySWQiOjExNywiZXhwIjoxNTk5NzkzODUxLjU0NCwiaWF0IjoxNTk0NjA5ODUxfQ.OTtI51grVrmtrHMhSgGoNikNWTY9xTr1_km-zHu9W0s",
    //     },
    //   });
    //   setUsers(response.data.userReport);
    // }
    // loaders();
  }, []);

  return (
    <div>
      <Datatable data={users} columns={[
        { key: 'id', label: 'Código:' },
        { key: 'name', label: 'Nome:' },
        { key: 'cdcId', label: 'Teste:' }
      ]} />
    </div>
  );
}