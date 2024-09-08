export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-2 grid-rows-3 gap-5 bg-slate-600 p-5">
      {/* Main Content */}
      <div className="row-span-1 col-span-1 border-4 border-slate-700 rounded "></div>
      <div className="row-span-1 col-span-1 border-4 border-slate-700 rounded"></div>
      <main className="col-span-2 row-span-2">{children}</main>
    </div>
  );
}
