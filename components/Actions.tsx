import { supportMail } from "@/app/config";
import { faBook, faShop, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Action({
  title = "",
  description = <></>,
  button = "",
  icon = faTruck,
  customStyle = "",
}) {
  return (
    <div
      className={
        "card max-w-full w-96 bg-base-100 shadow-xl image-full " + customStyle
      }
    >
      <figure>
        <FontAwesomeIcon icon={icon} className="text-neutral-focus" size="7x" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-2xl">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <a className="btn btn-primary">{button}</a>
        </div>
      </div>
    </div>
  );
}
export default function Actions() {
  return (
    <div className="bg-base-100 flex w-full flex-row flex-wrap justify-around p-5 gap-7">
      {/* <div className="card max-w-full w-96 bg-base-100 shadow-xl">
        <figure className="px-5 pt-5">
          <FontAwesomeIcon
            icon={faTruck}
            className="text-neutral-focus"
            size="7x"
          />
        </figure>
        <div className="card-body items-center text-center mt-0 pt-4">
          <h2 className="card-title text-neutral-focus">Заяви доставка!</h2>
          <p className="text-neutral">
            Започни нова доставка, използвай някой от предварително направените
            ти <strong>template</strong>-и, или избери пратка от историятата ти,
            която да използваш за чернова.
          </p>
          <div className="card-actions">
            <button className="btn btn-primary">Заяви сега!</button>
          </div>
        </div>
      </div> */}
      <Action
        title="Заяви доставка!"
        description={
          <>
            Започни нова доставка, използвай някой от предварително направените
            ти <strong>template</strong>-и, или избери пратка от историятата ти,
            която да използваш за чернова.
          </>
        }
        button="Заяви сега!"
        icon={faTruck}
      />
      <Action
        title="Поръчай от партньор"
        description={
          <>
            <strong>Купи</strong> си и си <strong>достави</strong> продукт, било
            то хранителен, домакински, електроуреда, инструменти и за каквото
            още се сетиш, използвайки някои от нашите партньори.
          </>
        }
        button="Виж партньори"
        icon={faShop}
      />
      <Action
        title="Виж история"
        description={
          <>
            Прегледай <strong>предишни пратки</strong>, виж{" "}
            <strong>статистики</strong>, разгледай <strong>template</strong>-ите
            си, започни нова пратка използвайки за основа някоя от предишните
            ти, създай нов <strong>template</strong>.
          </>
        }
        button="Виж история"
        icon={faBook}
      />
      <div className="mockup-window border bg-base-300 w-full">
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row">
            <iframe
              className="flex rounded-lg shadow-2xl h-[320px] lg:max-w-[50%] w-full max-sm:h-[220px]"
              src="https://www.youtube.com/embed/dVsiusLQy5Q"
              title="A look at what’s next for AI and Google Search | Google I/O 2023"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
            <div className="flex-1 flex-shrink">
              <h1 className="text-5xl font-bold text-neutral-focus">
                Нужда от помощ?
              </h1>
              <p className="py-6 text-neutral">
                В това видео ще видиш основните функции на <strong>Dex</strong>,
                както и примери за тяхното използване. Ще ти даде полезна
                информация отнсно уебстраницата и типове които можеш да
                използваш за да си по продуктивен използвайки нашия продукт. Ако
                е останало нещо неясно свържете се с нас на:{" "}
                <strong>{supportMail}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
