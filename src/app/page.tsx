import Link from "next/link";

export default function Home() {
  return (
      <main>
          <div>Links:</div>
          <div><Link href="/old-form-handling">Old Form</Link></div>
          <div><Link href="/use-form-status">useFormStatus</Link></div>
          <div><Link href="/use-action-state">useActionState</Link></div>
          <div><Link href="/use-optimistic">useOptimistic</Link></div>
          <div><Link href="/use">use</Link></div>
      </main>
  );
}
