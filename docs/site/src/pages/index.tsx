import Layout from "@theme/Layout";

// You may want to move these components to separate files
const GradientBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-[#111111] to-[#000000]">
      <div className="absolute inset-0 mix-blend-overlay opacity-45 bg-noise" />
      <div className="absolute inset-0 filter blur-[80px]">
        <div
          className="absolute w-[70%] h-[70%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(circle at top center, rgba(41, 199, 209, 0.7) 0%, rgba(41, 199, 209, 0) 40%)",
            mixBlendMode: "hard-light",
            animation: "moveVertical 30s ease infinite",
          }}
        />
        <div
          className="absolute w-[70%] h-[70%] top-1/2 left-[calc(50%-var(--circle-size)/6)]"
          style={{
            background:
              "radial-gradient(circle at top center, rgba(232, 237, 239, 0.6) 0%, rgba(232, 237, 239, 0) 35%)",
            mixBlendMode: "hard-light",
            animation: "moveInCircle 50s reverse infinite",
          }}
        />
      </div>
    </div>
  </div>
);

const Hero = () => (
  <section className="relative z-20 px-20 py-24 text-center text-white">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-6xl font-medium leading-tight font-marketing">
          Cut down your Backstage development time
        </h1>
        <p className="text-3xl font-medium font-marketing">
          Port&#x27;s new plugin for Backstage
        </p>
      </div>
    </div>
  </section>
);

export default function Home(): JSX.Element {
  return (
    <Layout description="Port's Backstage plugin - cut down your Backstage development time">
      <main className="relative min-h-screen">
        <GradientBackground />
        <Hero />
        <div className="absolute w-full flex justify-center">
          <img src="img/pipes.svg" height="450px" />
        </div>
      </main>
    </Layout>
  );
}
