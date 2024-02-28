import { EmailField } from "@/components/EmailField"
import { useScrollAnimations } from "@/utils/useScrollAnimations"

/**
 * A wrapper for the main page
 */
export default function Home() {
  useScrollAnimations()

  return (
    <div className="h-fit w-full relative overflow-hidden">
      <div
        className={`w-full flex flex-col justify-center items-center relative`}
        style={{ height: "100svh" }}
      >
        <div className="flex flex-col justify-center items-center -mt-[9svh] sm:mt-[2svh] blurb">
          <div className="flex flex-col text-center justify-center items-center">
            <a className="font-bold text-[35px] text-white mb-6">
              Welcome to Eve
            </a>
            <div className="sm:w-full w-[300px]">
              <p
                className="text-white font-light sm:text-[15.5px] text-[15px] sm:leading-relaxed"
                style={{ color: "rgb(235, 235, 240)" }}
              >
                Eve is an AI diary for young women to help
                <br /> them communicate with their higher selves. <br /> <br />{" "}
                Contact{" "}
                <a
                  target="_blank"
                  className="underline cursor-pointer"
                  href="mailto:maayan@eve.space"
                >
                  maayan@eve.space
                </a>{" "}
                to learn more
              </p>
            </div>
          </div>
          <div className="mt-[34px] mb-[34px]">
            <EmailField />
          </div>
        </div>
        <div
          className={`absolute bottom-0 w-full flex flex-row justify-center sm:pb-[22px] pb-8`}
        >
          <div className="text-sm text-zinc-600 text-center ">
            <p>Copyright Eve Technologies 2024</p>
          </div>
        </div>
      </div>
    </div>
  )
}
