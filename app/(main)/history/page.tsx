import { serverClient } from "@/app/_trpc/serverClient";

// export function Records({ records }: any) {
//   return records.map((record: any, index: number) => (
//     <div
//       key={index}
//       className={
//         "w-full max-w-2xl rounded-lg shadow-md p-5 " +
//         (index % 2 === 0 ? "bg-base-200" : "bg-base-100")
//       }
//     >
//       {record.receiver && <p>Получател: {record.receiver}</p>}
//       {record.package_title && (
//         <p>Заглавие на колета: {record.package_title}</p>
//       )}
//       {record.package_description && (
//         <p>Описание на колета: {record.package_description}</p>
//       )}
//       <p>Адрес на изпращач: {record.sender_address}</p>
//       <p>Адрес на получател: {record.receiver_address}</p>
//       <p>Вид на заявка: {record.type}</p>
//       {record.wanted_products && (
//         <p>Оказания за покупка: {record.wanted_products}</p>
//       )}
//       {record.sending_time && (
//         <p>Пристигане на адрес на изпращач: {record.sending_time}</p>
//       )}
//       {record.receiving_time && (
//         <p>Пристигане на адрес на получател: {record.receiving_time}</p>
//       )}
//       <p>Заявено на {record.created_at}</p>
//     </div>
//   ));
// }

export default async function History() {
  const data = await serverClient.getTodos();
  return (
    <section className="w-full flex justify-center items-center gap-5 flex-col p-3">
      <div className="w-full max-w-2xl bg-base-200 rounded-lg shadow-md p-5">
        <h1 className="text-2xl font-bold text-center">История</h1>
      </div>
      <div className="stats stats-horizontal max-sm:stats-vertical shadow w-full max-w-2xl">
        <div className="stat">
          <div className="stat-title">Отказани поръчки</div>
          <div className="stat-value text-error text-5xl">
            {/* {data?.map((d) => d.canceled).reduce((a, b) => a + b, 0) ?? 0} */}
          </div>
          <div className="stat-desc text-[0.7rem]">
            Тези които не изпълнихме
          </div>
        </div>
        <div className="stat">
          <div className="stat-title">Поръчки</div>
          <div className="stat-value text-5xl">{data?.length}</div>
          <div className="stat-desc">Заявени от вас</div>
        </div>

        <div className="stat">
          <div className="stat-title">Време за изпълнение</div>
          <div className="stat-value text-info text-5xl">≈ ? ч.</div>
          <div className="stat-desc">Средно между поръчките</div>
        </div>
      </div>
      {/* <Records records={data ?? []} />
      {error && (
        <div className="toast">
          <div className="alert alert-error">
            <span>{error.message}</span>
          </div>
        </div>
      )} */}
    </section>
  );
}
