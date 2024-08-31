import Link from "next/link";

export default function Home() {
  return (
    <main className="w-screen h-screen">
      <div className="hero min-h-screen">
        <div className="hero-content text-left">
          <div className="max-w-md">
            <h1 className="text-6xl font-bold text-slate-500">PlanIt</h1>
            <p className="py-6 text-slate-500">
              The last calendar app you'll ever need (at least I think so!)
              <br />
              My hope is to create a calendar app that will help myself and
              others to organize events, school, work, and more as
              minimalistically as possible, without sacrificing some key
              features!
            </p>
            <Link href="/signin">
              <button className="btn btn-primary">Sign In</button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
