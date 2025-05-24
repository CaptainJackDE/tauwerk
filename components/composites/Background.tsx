export function Background() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1E3A8A]/40 to-[#0F172A]/80" />

      <div className="absolute inset-0 backdrop-blur-[100px] bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20" />

      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />
    </div>
  );
}
