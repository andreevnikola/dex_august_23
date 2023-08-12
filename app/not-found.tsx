"use client";

import { useRouter } from "next/navigation";
import { supportMail } from "./config";
import Footer from "@/components/Footer";

export default function Custom404() {
  const router = useRouter();
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src="/images/notFound.png"
            className="max-w-sm rounded-lg shadow-2xl w-full"
          />
          <div>
            <h1 className="text-5xl font-bold text-neutral-focus">
              Страницата не е намерена!
            </h1>
            <p className="py-6 text-neutral">
              Не съществува такава страница. Проверетае URL адреса, въведен от
              Вас. Ако сте сигорни че това е правилния URL адрес е възможно
              страницата да е била изтрита или преместена. За помощ се свържете
              с нас на <strong>{supportMail}</strong>
            </p>
            <button
              className="btn btn-primary"
              onClick={() => {
                router.back();
              }}
            >
              Върни се
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
