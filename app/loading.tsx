export default function PageLoading() {
  return (
    <div className="fixed w-full h-full text-center bg-transparenty-base-200 backdrop-filter backdrop-blur-md backdrop-brightness-125 flex justify-around items-center">
      <span className="relative flex w-fit h-fit">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
        <img
          className="w-full max-w-[100px] relative inline-flex animate-bounce m-5"
          src="/images/brand/icon.png"
          alt="DEX - експресни доставки"
        />
      </span>
    </div>
  );
}
