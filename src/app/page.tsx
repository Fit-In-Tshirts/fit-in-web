import HeroSection from "@/components/heroSection/HeroSection";

export default function Home() {
  return (
    <div className="relative h-100 w-full overflow-hidden border bg-linear-to-bl from-violet-500 to-fuchsia-500
    flex flex-row items-center justify-around px-5">
      <HeroSection />
      
    </div>
  );
}
