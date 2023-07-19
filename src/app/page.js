import FeaturedEvents from "@/components/home/featuredEvents";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col z-10 w-full max-w-5xl items-center font-mono text-sm lg:flex">
        <FeaturedEvents />
      </div>
    </main>
  )
}
