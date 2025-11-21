export default function ProductSkeleton() {
  return (
    <div className="border rounded-xl bg-white shadow-sm overflow-hidden animate-pulse">
      {/* Image Placeholder */}
      <div className="w-full h-72 bg-gray-200" />

      {/* Text placeholders */}
      <div className="p-3 space-y-3">
        <div className="h-3 w-16 bg-gray-200 rounded" />
        <div className="h-4 w-3/4 bg-gray-200 rounded" />
        <div className="flex gap-2">
          <div className="h-3 w-10 bg-gray-200 rounded" />
          <div className="h-3 w-12 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Button placeholder */}
      <div className="h-10 bg-gray-100 border-t" />
    </div>
  );
}
