import React, {useState, useEffect} from 'react';
import api from '../../services/api'

interface User {
  id: number,
  companyId: string,
  PolicyId: number,
  supervisorId: number,
  name: string,
  email: string,
  phone: string,
  cellphone: string,
  externalId: number,
  cpf: string,
  occupation: string,
  status: number,
  role: number,
  firstAccessAt: string,
  LastAccessAt: string,
  resetPasswordAt: string,
  createdAt: string,
  updatedAt: string
}

export default function Main() {
  const token = localStorage.getItem('Token')
  const [Users, setUsers] = useState<User[]>([])

  useEffect(() => {
    async function loaders(){
      const response = await api.get('/admin/v1/user', {
        headers: { Authorization: token }
      })
      console.log(response.data)
      setUsers(response.data.User)
    }
    loaders()
  } )

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Colaborador</th>
          <th scope="col">Funcional</th>
          <th scope="col">Celular</th>
          <th scope="col">Email</th>
          <th scope="col">Status</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        {Users.map(users => (
          <tr key={users.id}>
            <th scope="col">{users.id}</th>
            <th scope="col">{users.name}</th>
            <th scope="col">{users.externalId}</th>
            <th scope="col">{users.cellphone}</th>
            <th scope="col">{users.email}</th>
            <th scope="col">{users.status}</th>
          </tr>
        ))}       
      </tbody>
    </table>
  );
}