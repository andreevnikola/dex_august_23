"use client";
import Footer from "@/components/Footer";
import { faCaretRight, faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useState } from "react";

function Error({ errorText = "" }) {
  return (
    <motion.p
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="p-1 text-error"
    >
      {errorText}
    </motion.p>
  );
}

export default function NewDelivery() {
  const [step, setStep] = useState(1);

  const pratkaTypeDescriptions = new Map();
  pratkaTypeDescriptions.set(
    "пратка",
    "Пратка от адрес до адрес | Нормална пратка. От определен от вас адрес, до този на получателя!"
  );
  pratkaTypeDescriptions.set(
    "купи",
    "Купи ми | Шофьорът отговорен за изпълнението на поръчката ти ще закупи желаните от теб продукти. Цената не може да надвишава 50лв."
  );

  const [typeServiceForm, setTypeServiceForm] = useState({
    type: "пратка",
    description: "",
    shop: "",
    customShop: false,
  });
  const serviceFormVerifiers = new Map([
    [
      "serviceType.description",
      () =>
        !(
          typeServiceForm.type === "купи" &&
          (typeServiceForm.description.length < 15 ||
            typeServiceForm.description.length > 250)
        ),
    ],
    [
      "serviceType.shop",
      () =>
        !(
          typeServiceForm.type === "купи" &&
          typeServiceForm.customShop &&
          (typeServiceForm.shop.length < 5 || typeServiceForm.shop.length > 50)
        ),
    ],
    [
      "serviceType",
      () => {
        let failed = false;
        serviceFormVerifiers.forEach((verifier, key) => {
          if (key != "serviceType" && !verifier()) {
            failed = true;
            return;
          }
        });
        return !failed;
      },
    ],
  ]);
  const verifyServiceForm = () => {
    const verified = serviceFormVerifiers.get("serviceType")!();
    if (verified) setStep(2);
  };

  return (
    <>
      <div className="w-full flex min-h-screen justify-around items-center">
        <main className="w-full p-6 h-fit max-w-4xl relative -top-12 flex flex-col gap-3">
          <h1 className="text-neutral-focus font-extrabold text-4xl text-center mb-5 font-mono">
            Нова заявка:
          </h1>
          <div className="tabs w-full sm:text-8xl">
            <a
              className={
                "tab tab-lifted max-sm:text-[0.6rem] " +
                (step === 1 ? "tab-active" : "")
              }
            >
              Вид доставка
            </a>
            <a
              className={
                "tab tab-lifted max-sm:text-[0.6rem] " +
                (step === 2 ? "tab-active" : "")
              }
            >
              Получател
            </a>
            <a
              className={
                "tab tab-lifted max-sm:text-[0.6rem] " +
                (step === 3 ? "tab-active" : "")
              }
            >
              Адреси
            </a>
            <a
              className={
                "tab tab-lifted max-sm:text-[0.6rem] " +
                (step === 4 ? "tab-active" : "")
              }
            >
              Плащане
            </a>
            <a
              className={
                "tab tab-lifted flex-grow cursor-default p-0" +
                (step === 5 ? "tab-active" : "")
              }
            ></a>
          </div>
          {step === 1 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                verifyServiceForm();
              }}
            >
              <motion.section
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 200 }}
                className="flex flex-col gap-4"
              >
                <div className="form-control relative">
                  <label className="input-group input-group-vertical">
                    <span className="w-full text-center flex justify-around">
                      Вид на заявката
                    </span>
                    <div className="border-l border-r border-neutral-content p-4">
                      <p className="text-md">
                        <strong className="text-lg font-bold">
                          {
                            pratkaTypeDescriptions
                              .get(typeServiceForm?.type)
                              .split(" | ")[0]
                          }
                          :
                        </strong>{" "}
                        {
                          pratkaTypeDescriptions
                            .get(typeServiceForm?.type)
                            .split(" | ")[1]
                        }
                      </p>
                    </div>
                    <select
                      className="select select-bordered select-lg"
                      onChange={(e: any) =>
                        setTypeServiceForm((form: any) => ({
                          ...form,
                          type: e.target!.value,
                        }))
                      }
                    >
                      <option value="пратка">Пратка от адрес до адрес </option>
                      <option value="купи">Купи ми</option>
                    </select>
                  </label>
                </div>
                {typeServiceForm?.type === "купи" && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      className="form-control"
                    >
                      <label className="input-group input-group-vertical">
                        <span className="w-full text-center flex justify-around">
                          Предложете магазин
                        </span>
                        <div className="flex justify-between p-2 border-l border-r border-neutral-content px-5">
                          <div className="flex gap-3 max-sm:gap-1">
                            <input
                              type="radio"
                              name="shop"
                              className="radio radio-primary radio-sm"
                              onChange={(e: any) =>
                                setTypeServiceForm((form: any) => ({
                                  ...form,
                                  customShop: !e.target.checked,
                                }))
                              }
                              checked={!typeServiceForm.customShop}
                            />
                            <p className="w-full flex justify-around text-sm max-sm:text-xs">
                              Удобен за изпълнителя
                            </p>
                          </div>
                          <div className="flex gap-3 max-sm:gap-1">
                            <p className="w-full flex justify-around text-sm max-sm:text-xs">
                              Избран от Вас
                            </p>
                            <input
                              type="radio"
                              name="shop"
                              className="radio radio-primary radio-sm"
                              onChange={(e: any) =>
                                setTypeServiceForm((form: any) => ({
                                  ...form,
                                  customShop: e.target.checked,
                                }))
                              }
                              checked={typeServiceForm.customShop}
                            />
                          </div>
                        </div>
                        {typeServiceForm.customShop && (
                          <input
                            type="text"
                            onChange={(e: any) =>
                              setTypeServiceForm((form: any) => ({
                                ...form,
                                shop: e.target!.value,
                              }))
                            }
                            placeholder="Пример: Lidl до гара Филипово"
                            className="input input-bordered w-full"
                          />
                        )}
                      </label>
                      {!serviceFormVerifiers.get("serviceType.shop")!() && (
                        <Error errorText="Моля въведете валиден магазин!" />
                      )}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      className="form-control"
                    >
                      <label className="input-group input-group-vertical">
                        <span className="w-full text-center flex justify-around">
                          Опишете желаните от Вас продукти
                        </span>
                        <textarea
                          onChange={(e: any) =>
                            setTypeServiceForm((form: any) => ({
                              ...form,
                              description: e.target!.value,
                            }))
                          }
                          className="textarea textarea-bordered"
                          placeholder="Опишете продуктите които искате да бъдат закупени."
                        ></textarea>
                      </label>
                      {!serviceFormVerifiers.get(
                        "serviceType.description"
                      )!() && (
                        <Error errorText="Описанието трябва да е между 15 и 250 знака" />
                      )}
                    </motion.div>
                  </>
                )}
                <button
                  className="btn btn-block"
                  disabled={!serviceFormVerifiers.get("serviceType")!()}
                >
                  Следваща стъпка <FontAwesomeIcon icon={faCaretRight} />
                </button>
              </motion.section>
            </form>
          )}
          {step === 2 && (
            <motion.section
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 200 }}
              className="flex flex-col gap-2"
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg">
                    Телефон на получател:
                  </span>
                </label>
                <label className="input-group input-group-lg w-full">
                  <select className="select select-bordered select-lg">
                    <option data-countryCode="BG" value="+359">
                      🇧🇬 +359
                    </option>
                  </select>
                  <input
                    type="text"
                    placeholder="896405024"
                    className="input input-bordered input-lg w-full"
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="input-group input-group-vertical">
                  <span className="w-full text-center flex justify-around">
                    Информация за пратката
                  </span>
                  <input
                    type="text"
                    placeholder="Заглавие съдържащо състава на пратката и причина"
                    className="input input-bordered"
                  />
                  <textarea
                    className="textarea textarea-bordered"
                    placeholder="Описание на пратката"
                  ></textarea>
                </label>
              </div>
            </motion.section>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}
