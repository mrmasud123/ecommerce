"use client"
import { useState } from "react";
import { Truck, ArrowRight } from "lucide-react";

export default function OrderSummary({
                                         subTotal = 20.0,
                                         vatRate = 40,
                                         freeShippingThreshold = 60.0,
                                     }) {
    const [coupon, setCoupon] = useState("");
    const [agreed, setAgreed] = useState(false);

    const vat = subTotal * (vatRate / 100);
    const total = subTotal + vat;
    const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subTotal);

    return (
        <div className="w-full max-w-sm flex flex-col gap-4">
            <div className="flex items-center gap-3 rounded-full bg-teal-50 px-5 py-3">
                <Truck size={20} className="text-teal-700 flex-shrink-0" />
                <p className="text-sm text-gray-700">
                    {remainingForFreeShipping > 0 ? (
                        <>
                            Spend ${remainingForFreeShipping.toFixed(2)} more for{" "}
                            <span className="font-semibold text-teal-700">Free shipping</span>
                        </>
                    ) : (
                        <span className="font-semibold text-teal-700">
              You&#39;ve unlocked free shipping
            </span>
                    )}
                </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h2 className="font-semibold text-gray-900 mb-4">Order summary</h2>

                <div className="flex items-center rounded-full border border-gray-200 pl-5 pr-1.5 py-1.5 mb-5">
                    <input
                        type="text"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        placeholder="Coupon code"
                        className="flex-1 bg-transparent text-sm text-gray-700 outline-none"
                    />
                    <button className="rounded-full bg-teal-700 hover:bg-teal-800 transition-colors text-white text-sm font-medium px-6 py-2.5">
                        Apply
                    </button>
                </div>

                <dl className="flex flex-col gap-3 text-sm">
                    <div className="flex items-center justify-between">
                        <dt className="text-blue-700">Sub-total</dt>
                        <dd className="font-medium text-amber-600">${subTotal.toFixed(2)}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                        <dt className="text-blue-700">VAT ({vatRate}%)</dt>
                        <dd className="font-medium text-amber-600">${vat.toFixed(2)}</dd>
                    </div>
                </dl>

                <div className="border-t border-gray-100 my-4" />

                <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="font-semibold text-gray-900">${total.toFixed(2)}</span>
                </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-700 select-none cursor-pointer">
                <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-teal-700 focus:ring-teal-600"
                />
                I agree with the{" "}
                <a href="#" className="text-teal-700 underline hover:text-teal-800">
                    Terms
                </a>{" "}
                and{" "}
                <a href="#" className="text-teal-700 underline hover:text-teal-800">
                    Conditions
                </a>
            </label>

            <button
                disabled={!agreed}
                className="w-full rounded-full bg-teal-700 hover:bg-teal-800 disabled:cursor-not-allowed transition-colors text-white font-medium py-3.5"
            >
                Proceed to checkout
            </button>

            <button className="w-full flex items-center justify-center gap-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors text-gray-900 font-medium py-3.5">
                Continue shopping
                <ArrowRight size={16} />
            </button>
        </div>
    );
}