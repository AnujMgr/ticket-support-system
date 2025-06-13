import { useGetUsersQuery } from "@/redux/features/users/userApiSlice";

function DashboardPage() {
  const { data, isLoading } = useGetUsersQuery({});

  if (isLoading) return <div>Loading...</div>
  if (!data) return <div>Missing post!</div>

  return (
    <div>DashboardPages</div>
  )
}


export default DashboardPage