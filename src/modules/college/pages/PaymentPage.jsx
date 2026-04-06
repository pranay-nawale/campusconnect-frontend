import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { confirmEvent } from "../../../api/collegeapi";

function PaymentPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [payment, setPayment] = useState({
    amount: "",
    paymentMethod: "UPI",
    transactionId: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await confirmEvent(id, payment);
      alert("Payment successful!");
      navigate("/college/events");
    } catch (err) {
      alert(err.response?.data || "Payment failed");
    }
  };

  return (
    <div className="section">
      <div className="section-inner max-w-xl">

        <div className="card p-6 space-y-4">

          <h2 className="text-xl font-bold">Payment</h2>

          <input
            className="input"
            placeholder="Amount"
            onChange={(e) =>
              setPayment({ ...payment, amount: e.target.value })
            }
          />

          <input
            className="input"
            placeholder="Transaction ID"
            onChange={(e) =>
              setPayment({
                ...payment,
                transactionId: e.target.value,
              })
            }
          />

          <button onClick={handleSubmit} className="btn-primary">
            Pay Now
          </button>

        </div>
      </div>
    </div>
  );
}

export default PaymentPage;