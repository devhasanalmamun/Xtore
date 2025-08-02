import LandingsLayout from '@/layouts/landings/landings-layout'

export default function Welcome() {
  return (
    <LandingsLayout title="Welcome to Our Site" description="This is the welcome page.">
      <div className="h-[50vh]">Homepage</div>
    </LandingsLayout>
  )
}
