export default function PayNow() {
  return (
    <div className="w-full max-w-6xl mx-auto mt-10 px-4 flex flex-col lg:flex-row items-start gap-10">

      {/* LEFT SECTION */}
      <div className="flex-1 text-center">
        <h2 className="text-2xl font-bold">Pay using QR Code or UPI ID</h2>
        <p className="mt-1 text-lg">
          UPI ID : <span className="font-semibold">7574882687@sbi</span>
        </p>

        <div className="border-2 border-gray-300 rounded-lg p-5 mt-5 bg-white shadow-sm">
          <img
            src="/upi-qr.jpg"
            alt="qr"
            className="w-64 mx-auto"
          />

          <p className="text-sm mt-4">Merchant Name: CNET TECHNOLOGIES</p>
          <p className="text-sm">UPI ID: 7574882687@sbi</p>
        </div>
      </div>

      {/* Divider */}
      <div className="text-2xl font-bold text-center lg:block hidden">OR</div>
      <div className="text-xl font-bold text-center lg:hidden">OR</div>

      {/* RIGHT SECTION */}
      <div className="flex-1 text-center">
        <h2 className="text-2xl font-bold">Pay via Credit Card or Net Banking</h2>

        <img
          src="/ccavenue.gif"
          alt="cards"
          className="mx-auto mt-3 w-100"
        />

        <form className="mt-5 space-y-3 text-left max-w-md mx-auto">

          <div>
            <label className="block mb-1 font-medium">Name*</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email*</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Phone*</label>
            <input
              type="tel"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-blue-500"
              placeholder="Enter phone number"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Amount*</label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-blue-500"
              placeholder="Amount"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700"
          >
            Pay Now
          </button>
        </form>

        <img
          src="/cards.gif"
          alt="ccavenue"
          className="mx-auto mt-6 w-40"
        />
      </div>

    </div>
  );
}
