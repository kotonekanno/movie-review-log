function LoadingOverlay({ open }: { open: boolean }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl flex flex-col items-center gap-4">
        <p>通信中...</p>
        <div className="h-6 w-6 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
      </div>
    </div>
  );
}

export default LoadingOverlay;