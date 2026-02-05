export default function LoadingVideo() {
  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-16">
        <div className="animate-pulse rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="h-6 w-48 rounded bg-white/10" />
          <div className="mt-6 h-[60vh] rounded-xl bg-white/5" />
        </div>
      </div>
    </div>
  )
}
