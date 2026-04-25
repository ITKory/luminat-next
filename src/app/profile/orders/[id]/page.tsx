import  ProfileOrderDetailsPage  from "@/pages/profile-order-details/page"

export default async function OrderDetailsRoute({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return <ProfileOrderDetailsPage orderId={id} />
}
