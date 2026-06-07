export default function Home() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold text-indigo-600 mb-4">Order Management System</h1>
      <p className="text-gray-500 mb-8">Manage orders across multiple stores</p>
      <div className="flex justify-center gap-4">
        <a href="/create-order" className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">
          Create Order
        </a>
        <a href="/orders" className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300">
          View Orders
        </a>
      </div>
    </div>
  );
}