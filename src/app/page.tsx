import { DEFAULT_SEO } from "@/lib/constants";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-4 px-6 py-12">
      <h1 className="text-4xl font-semibold">{DEFAULT_SEO.siteName}</h1>
      <p className="text-lg">{DEFAULT_SEO.description}</p>
    </main>
  );
}
