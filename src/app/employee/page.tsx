import { redirect } from 'next/navigation'

export default function AdminPage() {
  redirect('/employee/dashboard') // Server-side redirect
}