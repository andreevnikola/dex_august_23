import Footer from "@/components/Footer";

export default function NewDelivery() {
  return (
    <>
      <main className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <img
            alt="stock photo"
            src="/images/stock/istockphoto-1221101939-612x612.jpg"
            className="max-w-lg w-full rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold text-neutral">Create Delivery</h1>
            <p className="py-6 text-neutral">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
