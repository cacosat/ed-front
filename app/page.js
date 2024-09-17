import Image from "next/image";
import { ModeToggle } from "./components/modeToggle";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen gap-16 ">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
        <ModeToggle></ModeToggle>
        <div className="w-full text-orange-600 bg-black">
          lkfdjsñlkjfdña
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p>Footer</p>
      </footer>
    </div>
  );
}
