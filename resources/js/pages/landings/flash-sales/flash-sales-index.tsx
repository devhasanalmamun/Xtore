import LandingsLayout from '@/layouts/landings/landings-layout'

export default function FlashSalesIndex() {
  return (
    <LandingsLayout title="Flash Sales" description="This is the flash sales page">
      <div className="mx-auto max-w-7xl space-y-4 px-4 py-8">Filters</div>
      <div className="mx-auto max-w-7xl space-y-4 px-4 py-8">Products</div>
      <div className="mx-auto max-w-7xl space-y-4 px-4 py-8">Pagination</div>
    </LandingsLayout>
  )
}
