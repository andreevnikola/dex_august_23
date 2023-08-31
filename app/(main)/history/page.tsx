import { db } from "@/app/_db/prisma";
import { currentUser } from "@clerk/nextjs";

export function Record({ record, index }: any) {
  return (
    <div
      key={index}
      className={
        "w-full max-w-2xl rounded-lg shadow-md p-5 " +
        (index % 2 === 0 ? "bg-base-200" : "bg-base-100")
      }
    >
      {record.receiver && <p>Получател: {record.receiverPhone}</p>}
      {record.package_title && <p>Заглавие на колета: {record.packageTitle}</p>}
      {record.packageDescription && (
        <p>Описание на колета: {record.packageDescription}</p>
      )}
      <p>Адрес на изпращач: {record.sender_address}</p>
      <p>Адрес на получател: {record.receiver_address}</p>
      <p>Вид на заявка: {record.type}</p>
      {record.shoppingList && <p>Оказания за покупка: {record.shoppingList}</p>}
      {record.sendingTime && (
        <p>Пристигане на адрес на изпращач: {record.sendingTime}</p>
      )}
      {record.receivingTime && (
        <p>Пристигане на адрес на получател: {record.receivingTime}</p>
      )}
      <p>Заявено на {record.createdAt}</p>
      <p>Статус: {record.stage}</p>
    </div>
  );
}

export default async function History() {
  const user = await currentUser();
  const history = await db.delivery.findMany({
    where: {
      senderId: user?.id,
    },
  });
  let canceled = 0;
  history.forEach((record) => {
    record.canceled ? canceled++ : console.log(record);
  });
  return (
    <section className="w-full flex justify-center items-center gap-5 flex-col p-3">
      <div className="w-full max-w-2xl bg-base-200 rounded-lg shadow-md p-5">
        <h1 className="text-2xl font-bold text-center">История</h1>
      </div>
      <div className="stats stats-horizontal max-sm:stats-vertical shadow w-full max-w-2xl">
        <div className="stat">
          <div className="stat-title">Отказани поръчки</div>
          <div className="stat-value text-error text-5xl">{canceled}</div>
          <div className="stat-desc text-[0.7rem]">
            Тези които не изпълнихме
          </div>
        </div>
        <div className="stat">
          <div className="stat-title">Поръчки</div>
          <div className="stat-value text-5xl">{history?.length}</div>
          <div className="stat-desc">Заявени от вас</div>
        </div>

        <div className="stat">
          <div className="stat-title">Време за изпълнение</div>
          <div className="stat-value text-info text-5xl">≈ ? ч.</div>
          <div className="stat-desc">Средно между поръчките</div>
        </div>
      </div>
      {history.map((record: any, index: number) => (
        <Record index={index} record={record} />
      ))}
    </section>
  );
}
