"use client";
import { getCurrentTime } from "@/app/config";
import Footer from "@/components/Footer";
import {
  faCaretLeft,
  faCaretRight,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Error({ errorText = "" }) {
  return (
    <motion.p
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="p-1 text-error"
    >
      {errorText}
    </motion.p>
  );
}

export default function NewDelivery() {
  const [step, setStep] = useState(1);
  const [reachedStep, setReachedStep] = useState(1);
  const currentTime = getCurrentTime();
  // const soonestCallableTime = currentTime.getTime +

  const pratkaTypeDescriptions = new Map();
  pratkaTypeDescriptions.set(
    "пратка",
    "Пратка от адрес до адрес | Нормална пратка. От определен от вас адрес, до този на получателя!"
  );
  pratkaTypeDescriptions.set(
    "купи",
    "Купи ми | Шофьорът отговорен за изпълнението на поръчката ти ще закупи желаните от теб продукти. Цената не може да надвишава 50лв."
  );
  pratkaTypeDescriptions.set(
    "насрочен час",
    "Пратка с насрочен час | Пратка от адрес до адрес, като може да избереш в колко часа колата да е на адреса на изпращача и в колко на получателя."
  );

  const validators = new Map([
    // === TYPE SERVICE FORM VALIDATORS ===
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
        validators.forEach((verifier, key) => {
          if (key.startsWith("serviceType.") && !verifier()) {
            failed = true;
            return;
          }
        });
        return !failed;
      },
    ],
    // ====================================
    // === RECIEVER FORM VALIDATORS ===
    [
      "recieverForm.phone",
      () =>
        recieverForm.phone?.length === 8 || recieverForm.phone?.length === 9,
    ],
    [
      "recieverForm.description",
      () =>
        recieverForm.description.length > 15 &&
        recieverForm.description.length < 250,
    ],
    [
      "recieverForm.title",
      () => recieverForm.title.length > 5 && recieverForm.title.length < 30,
    ],
    [
      "reciever",
      () => {
        let failed = false;
        validators.forEach((verifier, key) => {
          if (key.startsWith("recieverForm.") && !verifier()) {
            failed = true;
            return;
          }
        });
        return !failed;
      },
    ],
    // ================================
    // === ADDRESSES FORM VALIDATORS ===
    [
      "addressesForm.senderAddress",
      () =>
        addressesForm.senderAddress &&
        addressesForm.senderAddress.length > 5 &&
        addressesForm.senderAddress.length < 100,
    ],
    [
      "addressesForm.senderSendingTime",
      () =>
        addressesForm.senderSendingTime &&
        (addressesForm.senderSendingTime === "sooner" ||
          (addressesForm.senderSendingTime.includes(":") &&
            parseInt(addressesForm.senderSendingTime.split(":")[0]) * 60 +
              parseInt(addressesForm.senderSendingTime.split(":")[1]) >
              currentTime.getHours() * 60 + currentTime.getMinutes() + 90)),
    ],
    [
      "addresses",
      () => {
        let failed = false;
        validators.forEach((verifier, key) => {
          if (key.startsWith("addressesForm.") && !verifier()) {
            failed = true;
            return;
          }
        });
        return !failed;
      },
    ],
    // =================================
  ]);

  const [typeServiceForm, setTypeServiceForm] = useState({
    type: "пратка",
    description: "",
    shop: "",
    customShop: false,
    activateValidators: false,
  });

  const verifyServiceForm = () => {
    const verified = validators.get("serviceType")!();
    if (verified) {
      setReachedStep((step) => Math.max(step + 1, reachedStep));
      setStep(step + 1);
      return;
    }
    setTypeServiceForm((service) => ({
      ...service,
      activateValidators: true,
    }));
  };

  const [recieverForm, setRecieverForm] = useState({
    phone: "",
    phoneStarter: "+359",
    title: "",
    description: "",
    activateValidators: false,
  });
  const verifyRecieverForm = () => {
    const verified = validators.get("reciever")!();
    if (verified) {
      setReachedStep((step) => Math.max(step + 1, reachedStep));
      setStep(step + 1);
      return;
    }
    setRecieverForm((reciever) => ({
      ...reciever,
      activateValidators: true,
    }));
  };

  const [addressesForm, setAddressesForm] = useState({
    senderAddress: "",
    senderSendingTime: "sooner",
    recieverAddress: "",
    recieverRecievingTime: "sooner",
    activateValidators: false,
  });
  const verifyAddressesForm = () => {
    const verified = validators.get("addresses")!();
    if (verified) {
      setReachedStep((step) => Math.max(step + 1, reachedStep));
      setStep(step + 1);
      return;
    }
    setAddressesForm((addresses) => ({
      ...addresses,
      activateValidators: true,
    }));
  };

  let steps = useRef(
    new Map([
      ["serviceType", 1],
      ["reciever", 2],
      ["addresses", 3],
      ["payments", 4],
    ])
  );
  useEffect(() => {
    steps.current = new Map(
      typeServiceForm.type === "купи"
        ? [
            ["serviceType", 1],
            ["addresses", 2],
            ["payments", 3],
          ]
        : [
            ["serviceType", 1],
            ["reciever", 2],
            ["addresses", 3],
            ["payments", 4],
          ]
    );
  }, [typeServiceForm]);

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
                (step === steps.current.get("serviceType")
                  ? "tab-active "
                  : "") +
                (!validators.get("serviceType")!() ? "text-red-500 " : "")
              }
              onClick={() =>
                reachedStep >= steps.current.get("serviceType")!
                  ? setStep(steps.current.get("serviceType")!)
                  : null
              }
            >
              Вид доставка
            </a>
            {steps.current.has("reciever") && (
              <a
                className={
                  "tab tab-lifted max-sm:text-[0.6rem] " +
                  (step === steps.current.get("reciever")
                    ? "tab-active "
                    : "") +
                  (reachedStep < steps.current.get("reciever")!
                    ? "text-base-300 "
                    : "") +
                  (!validators.get("reciever")!() &&
                  reachedStep >= steps.current.get("reciever")!
                    ? "text-red-500 "
                    : "")
                }
                onClick={() =>
                  reachedStep >= steps.current.get("reciever")!
                    ? setStep(steps.current.get("reciever")!)
                    : null
                }
              >
                Получател
              </a>
            )}
            <a
              className={
                "tab tab-lifted max-sm:text-[0.6rem] " +
                (step === steps.current.get("addresses") ? "tab-active " : "") +
                (reachedStep < steps.current.get("addresses")!
                  ? "text-base-300 "
                  : "")
              }
              onClick={() =>
                reachedStep >= steps.current.get("addresses")!
                  ? setStep(steps.current.get("addresses")!)
                  : null
              }
            >
              Адреси
            </a>
            <a
              className={
                "tab tab-lifted max-sm:text-[0.6rem] " +
                (step === steps.current.get("payments") ? "tab-active " : "") +
                (step === steps.current.get("payments") ? "tab-active " : "") +
                (reachedStep < steps.current.get("payments")!
                  ? "text-base-300 "
                  : "")
              }
              onClick={() =>
                reachedStep >= steps.current.get("payments")!
                  ? setStep(steps.current.get("payments")!)
                  : null
              }
            >
              Плащане
            </a>
            <a className={"tab tab-lifted flex-grow cursor-default p-0"}></a>
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
                exit={{ opacity: 0, x: -200 }}
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
                      value={typeServiceForm?.type}
                    >
                      <option value="пратка">Пратка от адрес до адрес </option>
                      <option value="насрочен час">
                        Пратка с насрочен час
                      </option>
                      <option value="купи">Купи ми</option>
                    </select>
                  </label>
                </div>
                {typeServiceForm?.type === "купи" && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="form-control"
                    >
                      <label className="input-group input-group-vertical">
                        <span className="w-full text-center flex justify-around">
                          Предложете магазин
                        </span>
                        <div className="flex justify-between p-2 border-l border-r border-b border-neutral-content px-5">
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
                            value={typeServiceForm.shop}
                            placeholder="Пример: Lidl до гара Филипово"
                            className="input input-bordered w-full"
                          />
                        )}
                      </label>
                      {!validators.get("serviceType.shop")!() &&
                        typeServiceForm.activateValidators && (
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
                          value={typeServiceForm.description}
                        ></textarea>
                      </label>
                      {!validators.get("serviceType.description")!() &&
                        typeServiceForm.activateValidators && (
                          <Error errorText="Описанието трябва да е между 15 и 250 знака" />
                        )}
                    </motion.div>
                  </>
                )}
                <button
                  className={
                    "btn btn-block btn-primary " +
                    (!validators.get("serviceType")!()
                      ? "active:bg-red-500"
                      : "")
                  }
                >
                  Следваща стъпка <FontAwesomeIcon icon={faCaretRight} />
                </button>
              </motion.section>
            </form>
          )}
          {steps.current.has("reciever") &&
            step === steps.current.get("reciever") && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  verifyRecieverForm();
                }}
              >
                <motion.section
                  initial={{ opacity: 0, x: 200 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -200 }}
                  className="flex flex-col gap-2"
                >
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-lg">
                        Телефон на получател:
                      </span>
                    </label>
                    <label className="input-group input-group-lg w-full">
                      <select
                        className="select select-bordered select-lg"
                        onChange={(e: any) =>
                          setRecieverForm((form: any) => ({
                            ...form,
                            phoneStarter: e.target.value,
                          }))
                        }
                        value={recieverForm.phoneStarter}
                      >
                        <option data-countryCode="BG" value="+359">
                          🇧🇬 +359
                        </option>
                      </select>
                      <input
                        type="text"
                        placeholder="896405024"
                        className="input input-bordered input-lg w-full"
                        onChange={(e: any) =>
                          setRecieverForm((form: any) => ({
                            ...form,
                            phone: e.target.value,
                          }))
                        }
                        value={recieverForm.phone}
                      />
                    </label>
                    {!validators.get("recieverForm.phone")!() &&
                      recieverForm.activateValidators && (
                        <Error errorText="Моля въведете валиден телевизиран номер!" />
                      )}
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
                        onChange={(e: any) =>
                          setRecieverForm((form: any) => ({
                            ...form,
                            title: e.target.value,
                          }))
                        }
                        value={recieverForm.title}
                      />
                      <textarea
                        className="textarea textarea-bordered"
                        placeholder="Описание на пратката"
                        onChange={(e: any) =>
                          setRecieverForm((form: any) => ({
                            ...form,
                            description: e.target.value,
                          }))
                        }
                        value={recieverForm.description}
                      ></textarea>
                    </label>
                    {!validators.get("recieverForm.title")!() &&
                      recieverForm.activateValidators && (
                        <Error errorText="Заглавието на пратката трябва да е между 5 и 30 знака!" />
                      )}
                    {!validators.get("recieverForm.description")!() &&
                      recieverForm.activateValidators && (
                        <Error errorText="Описанието на пратката трябва да е между 15 и 250 знака!" />
                      )}
                  </div>
                  <div className="btn-group w-full">
                    <button
                      className="btn w-1/2"
                      type="button"
                      onClick={() => setStep(1)}
                    >
                      <FontAwesomeIcon icon={faCaretLeft} /> Върни Назад
                    </button>
                    <button
                      className={
                        "btn w-1/2 btn-primary " +
                        (!validators.get("reciever")!()
                          ? "active:bg-red-500"
                          : "")
                      }
                    >
                      Продължи <FontAwesomeIcon icon={faCaretRight} />
                    </button>
                  </div>
                </motion.section>
              </form>
            )}
          {steps.current.has("addresses") &&
            step === steps.current.get("addresses") && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  verifyAddressesForm();
                }}
              >
                <motion.section
                  initial={{ opacity: 0, x: 200 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -200 }}
                  className="flex flex-col gap-2"
                >
                  <div className="form-control">
                    <label className="input-group input-group-vertical">
                      <span className="flex w-full justify-center gap-1">
                        Информация за{" "}
                        <strong className="w-fit">изпращач</strong>
                      </span>
                      <input
                        type="text"
                        placeholder="Адрес на изпращача"
                        className="input input-bordered"
                        onChange={(e: any) =>
                          setAddressesForm((form: any) => ({
                            ...form,
                            senderAddress: e.target.value,
                          }))
                        }
                        value={addressesForm.senderAddress}
                      />
                      {typeServiceForm.type === "насрочен час" && (
                        <>
                          <div className="flex justify-between p-2 border-l border-r border-b border-neutral-content px-5">
                            <div className="flex gap-3 max-sm:gap-1">
                              <input
                                type="radio"
                                name="shop"
                                className="radio radio-primary radio-sm"
                                onChange={(e: any) =>
                                  setAddressesForm((form: any) => ({
                                    ...form,
                                    senderSendingTime: e.target.checked
                                      ? "sooner"
                                      : "",
                                  }))
                                }
                                checked={
                                  addressesForm.senderSendingTime === "sooner"
                                }
                              />
                              <p className="w-full flex justify-around text-sm max-sm:text-xs">
                                Възможно най-скоро
                              </p>
                            </div>
                            <div className="flex gap-3 max-sm:gap-1">
                              <p className="w-full flex justify-around text-sm max-sm:text-xs">
                                Точен час
                              </p>
                              <input
                                type="radio"
                                name="shop"
                                className="radio radio-primary radio-sm"
                                onChange={(e: any) =>
                                  setAddressesForm((form: any) => ({
                                    ...form,
                                    senderSendingTime: e.target.checked
                                      ? ""
                                      : "sooner",
                                  }))
                                }
                                checked={
                                  addressesForm.senderSendingTime !== "sooner"
                                }
                              />
                            </div>
                          </div>
                          {addressesForm.senderSendingTime !== "sooner" && (
                            <div className="gap-3 flex max-sm:flex-col justify-between p-2 border-l border-r border-b border-neutral-content px-5">
                              <label className="label w-fit">
                                <div className="label-text">
                                  Час за пристигане на адрес на{" "}
                                  <strong>изпращач</strong>
                                </div>
                              </label>
                              <input
                                type="time"
                                className="input flex flex-grow min-w-fit"
                                onChange={(e: any) => {
                                  setAddressesForm(e.target.value);
                                }}
                                value={addressesForm.senderSendingTime}
                              />
                            </div>
                          )}
                        </>
                      )}
                    </label>
                    {addressesForm.activateValidators &&
                      !validators.get("addressesForm.senderAddress")!() && (
                        <Error errorText="Адреса на изпращача трябва да е между 5 и 100 знака!" />
                      )}
                    {addressesForm.activateValidators &&
                      !validators.get("addressesForm.senderSendingTime")!() && (
                        <Error
                          errorText={
                            "Часът трябва да е след " +
                            new Date(
                              currentTime.getTime() + 90 * 60 * 1000
                            ).getHours() +
                            ":" +
                            new Date(
                              currentTime.getTime() + 90 * 60 * 1000
                            ).getMinutes() +
                            "ч !"
                          }
                        />
                      )}
                  </div>
                  <div className="btn-group w-full">
                    <button
                      className="btn w-1/2"
                      type="button"
                      onClick={() => setStep(step - 1)}
                    >
                      <FontAwesomeIcon icon={faCaretLeft} /> Върни Назад
                    </button>
                    <button
                      className={
                        "btn w-1/2 btn-primary " +
                        (!validators.get("addresses")!()
                          ? "active:bg-red-500"
                          : "")
                      }
                    >
                      Продължи <FontAwesomeIcon icon={faCaretRight} />
                    </button>
                  </div>
                </motion.section>
              </form>
            )}
        </main>
      </div>
      <Footer />
    </>
  );
}
