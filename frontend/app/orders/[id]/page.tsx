"use client";

import { useState } from "react";
import { OrderStatus } from "@/types";
import { useRouter, useParams } from "next/navigation";
import { useUpdateStatus } from "@/hooks/useUpdateStauts";

const statuses: OrderStatus[] = ["PLACED", "PREPARING", "COMPLETED"];

const statusConfig: Record<OrderStatus, { color: string; dot: string }> = {
  PLACED:    { color: "text-blue-600",  dot: "bg-blue-400"  },
  PREPARING: { color: "text-amber-600", dot: "bg-amber-400" },
  COMPLETED: { color: "text-green-600", dot: "bg-green-400" },
};

export default function UpdateStatusPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { mutate, isPending, isError, isSuccess } = useUpdateStatus();
  const [status, setStatus] = useState<OrderStatus>("PLACED");

  const handleUpdate = () => {
    mutate({ id, status }, { onSuccess: () => router.push("/orders") });
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Update Status</h1>
          <p className="text-sm text-gray-400 mt-1">Change the fulfillment status for this order</p>
        </div>

        {/* Order ID chip */}
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-lg px-4 py-2.5 mb-8">
          <span className="text-xs text-gray-400 font-medium">Order</span>
          <span className="font-mono text-xs text-gray-600 bg-white border border-gray-200 px-2 py-0.5 rounded">
            #{id?.slice(-6).toUpperCase()}
          </span>
        </div>

        {/* Status selector */}
        <label className="block text-sm font-medium text-gray-700 mb-2">New Status</label>
        <div className="flex flex-col gap-2 mb-8">
          {statuses.map((s) => (
            <label
              key={s}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${
                status === s
                  ? "border-indigo-300 bg-indigo-50"
                  : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
              }`}
            >
              <input
                type="radio"
                name="status"
                value={s}
                checked={status === s}
                onChange={() => setStatus(s)}
                className="accent-indigo-600"
              />
              <span className={`flex items-center gap-2 text-sm font-medium ${statusConfig[s].color}`}>
                <span className={`w-2 h-2 rounded-full ${statusConfig[s].dot}`} />
                {s}
              </span>
            </label>
          ))}
        </div>

        {/* Feedback */}
        {isError && (
          <div className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-4 py-2.5 mb-4">
            Failed to update status. Please try again.
          </div>
        )}
        {isSuccess && (
          <div className="text-sm text-green-600 bg-green-50 border border-green-100 rounded-lg px-4 py-2.5 mb-4">
            Status updated successfully!
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => router.push("/orders")}
            className="flex-1 text-sm font-medium text-gray-500 border border-gray-200 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={isPending}
            className="flex-1 bg-indigo-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isPending ? "Updating..." : "Update Status"}
          </button>
        </div>

      </div>
    </div>
  );
}