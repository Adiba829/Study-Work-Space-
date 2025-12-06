export default function ImageViewer({ url }) {
  return (
    <div className="p-6">
      <div className="flex justify-center">
        <img
          src={url}
          alt="Preview"
          className="max-w-full max-h-[80vh] object-contain rounded-lg"
        />
      </div>
    </div>
  )
}

