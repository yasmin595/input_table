// src/App.tsx
import React, { useState } from "react"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { DataTable, Column } from "./components/DataTable"   // ⬅️ Column ইমপোর্ট করতে হবে

interface User {
  id: number
  name: string
  email: string
  role: string
}

const columns: Column<User>[] = [   // ⬅️ টাইপ দেয়া হলো
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email", sortable: true },
  { key: "role", title: "Role", dataIndex: "role", sortable: false },
]

const initialData: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", role: "Admin" },
  { id: 2, name: "Bob", email: "bob@example.com", role: "User" },
  { id: 3, name: "Charlie", email: "charlie@example.com", role: "User" },
]

function App() {
  const [users, setUsers] = useState<User[]>(initialData)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = () => {
    if (formData.name && formData.email) {
      const newUser: User = {
        id: users.length + 1,
        name: formData.name,
        email: formData.email,
        role: "User",
      }
      setUsers([...users, newUser])
      setFormData({ name: "", email: "", password: "", username: "" })
    }
  }

  const handleRowSelect = (rows: User[]) => {
    console.log("Selected Rows:", rows)
  }

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      {/* Input Form */}
      <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 mb-8 space-y-6">
        <h1 className="text-2xl font-bold text-center text-lime-500 ">
          Input Component Showcase
        </h1>

        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="Disabled field"
            disabled
            value={formData.username}
          />
        </div>

        <div className="pt-4">
          <Button className="w-full bg-lime-500 hover:bg-lime-400" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>

      {/* Users Table */}
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-lime-500 dark:text-gray-100 mb-4">
          Users Table
        </h1>
        <DataTable<User>
          data={users}
          columns={columns}
          selectable
          onRowSelect={handleRowSelect}
        />
      </div>
    </div>
  )
}

export default App
