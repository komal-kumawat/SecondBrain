
export const ShareModal = ({ link, onClose }: { link: string; onClose: () => void }) => {
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent("Check this out: " + link)}`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(link)}&text=Check+this+out`;
  const emailUrl = `mailto:?subject=Shared Brain&body=Check out this content: ${encodeURIComponent(link)}`;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Share this link</h2>

        <input
          type="text"
          value={link}
          readOnly
          className="w-full p-2 border rounded mb-4"
          onClick={(e) => (e.target as HTMLInputElement).select()}
        />

        <div className="flex justify-around mb-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            WhatsApp
          </a>
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Telegram
          </a>
          <a
            href={emailUrl}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Email
          </a>
        </div>

        <button onClick={onClose} className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
          Close
        </button>
      </div>
    </div>
  );
};
