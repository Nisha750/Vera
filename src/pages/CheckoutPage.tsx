import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useNavigate, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { Check, ShieldCheck, ArrowRight, ArrowLeft, CreditCard, Smartphone, Building, Truck } from 'lucide-react';
import { OrderItem } from '../types';

export const CheckoutPage: React.FC = () => {
  const { cart, cartSubtotal, cartDiscount, deliveryFee, cartTotal, createOrder } = useShop();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form Fields
  const [formData, setFormData] = useState({
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '9845012345',
    street: 'Plot 45, Lavelle Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    postalCode: '560001',
    paymentMethod: 'UPI' as 'UPI' | 'Card' | 'NetBanking' | 'Cash on Delivery',
  });

  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);
  const [confirmedOrderDate, setConfirmedOrderDate] = useState<string | null>(null);
  const [confirmedOrderItems, setConfirmedOrderItems] = useState<OrderItem[]>([]);
  const [confirmedTotal, setConfirmedTotal] = useState<number>(0);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep((step + 1) as any);
    } else if (step === 3) {
      handleFinalizeOrder();
    }
  };

  const handleFinalizeOrder = () => {
    const orderItems: OrderItem[] = cart.map(item => ({
      productId: item.product.id,
      productName: item.product.name,
      productImage: item.product.images[0],
      price: item.product.salePrice || item.product.price,
      selectedColor: item.selectedColor,
      selectedSize: item.selectedSize,
      quantity: item.quantity,
    }));

    const deliveryEstimate = new Date(Date.now() + 3 * 86400000).toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    const newOrder = createOrder({
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      },
      shippingAddress: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: 'India',
      },
      items: orderItems,
      subtotal: cartSubtotal,
      discount: cartDiscount,
      deliveryFee,
      total: cartTotal,
      paymentMethod: formData.paymentMethod,
      estimatedDelivery: deliveryEstimate,
    });

    setConfirmedOrderId(newOrder.id);
    setConfirmedOrderDate(deliveryEstimate);
    setConfirmedOrderItems(orderItems);
    setConfirmedTotal(cartTotal);
    setStep(4);

    // Trigger subtle celebratory confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ffffff', '#888888', '#222222']
      });
    } catch {
      // ignore
    }
  };

  if (cart.length === 0 && step !== 4) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-serif mb-2">YOUR BAG IS EMPTY</h2>
        <p className="text-sm text-neutral-400 max-w-sm mb-6">
          Add pieces from the collection before initiating checkout.
        </p>
        <Link to="/shop" className="btn-vera px-6 py-3 bg-white text-black text-xs uppercase tracking-widest">
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Stepper */}
        {step < 4 && (
          <div className="mb-12">
            <div className="flex items-center justify-between text-[11px] uppercase tracking-mega-wide font-medium text-neutral-400 mb-3">
              <span className={step >= 1 ? 'text-white' : ''}>01 Contact</span>
              <span className={step >= 2 ? 'text-white' : ''}>02 Delivery</span>
              <span className={step >= 3 ? 'text-white' : ''}>03 Payment</span>
              <span>04 Confirmation</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className={`h-1 transition-colors ${step >= 1 ? 'bg-white' : 'bg-white/15'}`} />
              <div className={`h-1 transition-colors ${step >= 2 ? 'bg-white' : 'bg-white/15'}`} />
              <div className={`h-1 transition-colors ${step >= 3 ? 'bg-white' : 'bg-white/15'}`} />
              <div className="h-1 bg-white/15" />
            </div>
          </div>
        )}

        {/* STEP 1: CONTACT */}
        {step === 1 && (
          <form onSubmit={handleNextStep} className="bg-neutral-950 border border-white/10 p-8 shadow-2xl animate-fade-in">
            <p className="text-xs uppercase tracking-ultra-wide text-neutral-400 mb-1">Step 01</p>
            <h2 className="text-2xl font-serif text-white mb-6">CONTACT INFORMATION</h2>

            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-black border border-white/20 p-3 text-sm text-white focus:outline-none focus:border-white"
                  placeholder="e.g. Aarav Sharma"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">Email Address (Order Confirmation)</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-black border border-white/20 p-3 text-sm text-white focus:outline-none focus:border-white"
                  placeholder="name@domain.com"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">Phone Number (SMS Dispatch Updates)</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-black border border-white/20 p-3 text-sm text-white focus:outline-none focus:border-white"
                  placeholder="10-digit mobile number"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-white/10">
              <button
                type="submit"
                className="btn-vera px-8 py-3.5 bg-white text-black text-xs uppercase tracking-mega-wide font-medium hover:bg-neutral-200 transition-all flex items-center gap-2"
              >
                <span>Continue to Delivery</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: DELIVERY */}
        {step === 2 && (
          <form onSubmit={handleNextStep} className="bg-neutral-950 border border-white/10 p-8 shadow-2xl animate-fade-in">
            <p className="text-xs uppercase tracking-ultra-wide text-neutral-400 mb-1">Step 02</p>
            <h2 className="text-2xl font-serif text-white mb-6">SHIPPING DESTINATION</h2>

            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">Street Address / Landmark</label>
                <input
                  type="text"
                  required
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  className="w-full bg-black border border-white/20 p-3 text-sm text-white focus:outline-none focus:border-white"
                  placeholder="Flat, building number, street"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-black border border-white/20 p-3 text-sm text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-black border border-white/20 p-3 text-sm text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">Postal Code (PIN)</label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full bg-black border border-white/20 p-3 text-sm text-white focus:outline-none focus:border-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs uppercase tracking-widest text-neutral-400 hover:text-white flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                className="btn-vera px-8 py-3.5 bg-white text-black text-xs uppercase tracking-mega-wide font-medium hover:bg-neutral-200 transition-all flex items-center gap-2"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: PAYMENT */}
        {step === 3 && (
          <form onSubmit={handleNextStep} className="bg-neutral-950 border border-white/10 p-8 shadow-2xl animate-fade-in">
            <p className="text-xs uppercase tracking-ultra-wide text-neutral-400 mb-1">Step 03</p>
            <h2 className="text-2xl font-serif text-white mb-6">SECURE PAYMENT METHOD</h2>

            <div className="space-y-3 mb-8">
              {[
                { id: 'UPI', label: 'UPI / QR / Instant App Pay', icon: Smartphone, desc: 'Google Pay, PhonePe, Paytm or any UPI ID' },
                { id: 'Card', label: 'Credit or Debit Card', icon: CreditCard, desc: 'Visa, Mastercard, RuPay, Amex' },
                { id: 'NetBanking', label: 'Net Banking', icon: Building, desc: 'HDFC, ICICI, SBI, Axis & all major Indian banks' },
                { id: 'Cash on Delivery', label: 'Pay On Delivery', icon: Truck, desc: 'Cash or contactless UPI at doorstep' },
              ].map(method => {
                const Icon = method.icon;
                const isSelected = formData.paymentMethod === method.id;
                return (
                  <div
                    key={method.id}
                    onClick={() => setFormData({ ...formData, paymentMethod: method.id as any })}
                    className={`p-4 border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected ? 'border-white bg-white/5' : 'border-white/15 hover:border-white/40 bg-black/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-white" />
                      <div>
                        <p className="text-sm font-medium text-white">{method.label}</p>
                        <p className="text-xs text-neutral-400">{method.desc}</p>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-white bg-white' : 'border-neutral-600'}`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-black" />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary Recap */}
            <div className="p-4 bg-black border border-white/10 mb-8 space-y-2 text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal ({cart.length} items)</span>
                <span className="text-white">₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Editorial VIP Discount</span>
                  <span>-₹{cartDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-400">
                <span>Delivery</span>
                <span className="text-white">{deliveryFee === 0 ? 'Complimentary' : `₹${deliveryFee}`}</span>
              </div>
              <div className="border-t border-white/10 pt-2 flex justify-between font-serif text-base text-white">
                <span>Total Amount Due</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-xs uppercase tracking-widest text-neutral-400 hover:text-white flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                className="btn-vera px-8 py-3.5 bg-white text-black text-xs uppercase tracking-mega-wide font-medium hover:bg-neutral-200 transition-all flex items-center gap-2 shadow-2xl"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Authorize & Place Order</span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: ORDER CONFIRMED */}
        {step === 4 && confirmedOrderId && (
          <div className="bg-neutral-950 border border-white/10 p-8 sm:p-12 text-center animate-fade-in shadow-2xl">
            <div className="w-16 h-16 rounded-full border border-white flex items-center justify-center mx-auto mb-6 bg-white text-black">
              <Check className="w-8 h-8" />
            </div>

            <p className="text-xs uppercase tracking-ultra-wide text-neutral-400 mb-1">
              VÉRA Studio Atelier
            </p>
            <h1 className="text-4xl sm:text-5xl font-serif text-white tracking-tight mb-2">
              ORDER CONFIRMED
            </h1>
            <p className="text-sm text-neutral-300 font-light max-w-md mx-auto mb-6">
              Thank you for choosing VÉRA. Your order has been registered in our Bangalore atelier and is being prepared for dispatch.
            </p>

            {/* Order Card Details */}
            <div className="p-6 bg-black border border-white/10 max-w-lg mx-auto text-left space-y-4 mb-8">
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-xs uppercase tracking-wider text-neutral-400">Order Reference</span>
                <span className="text-sm font-mono text-white font-medium">{confirmedOrderId}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-xs uppercase tracking-wider text-neutral-400">Estimated Delivery</span>
                <span className="text-sm text-white">{confirmedOrderDate}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-xs uppercase tracking-wider text-neutral-400">Total Paid</span>
                <span className="text-base font-serif text-white">₹{confirmedTotal.toLocaleString('en-IN')}</span>
              </div>

              {/* Items List */}
              <div className="pt-2 space-y-3">
                <p className="text-xs uppercase tracking-wider text-neutral-400">Purchased Pieces:</p>
                {confirmedOrderItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <img src={item.productImage} alt={item.productName} className="w-10 h-12 object-cover border border-white/10" />
                    <div className="flex-1 min-w-0 text-xs">
                      <p className="text-white truncate">{item.productName}</p>
                      <p className="text-neutral-400">{item.selectedColor} • {item.selectedSize} (Qty: {item.quantity})</p>
                    </div>
                    <span className="text-xs text-white">₹{item.price.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to={`/order-tracking?id=${confirmedOrderId}`}
                className="btn-vera w-full sm:w-auto px-8 py-3.5 bg-white text-black text-xs uppercase tracking-mega-wide font-medium hover:bg-neutral-200 transition-all shadow-xl"
              >
                Track This Order
              </Link>
              <Link
                to="/shop"
                className="w-full sm:w-auto px-8 py-3.5 border border-white/30 text-white text-xs uppercase tracking-mega-wide font-medium hover:bg-white/10 transition-colors"
              >
                Return to Shop
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
