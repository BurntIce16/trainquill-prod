import ConsentAlert from "@/components/ui/concent-alert";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_20px_20px] items-center justify-items-center min-h-screen p-4 pb-20 gap-16 sm:p-20">
      <h1 className="text-8xl">TrainQuill</h1>

      <p className="text-2xl">Welcome to our study on the UX design of art wellness applications.</p>
      <p className="text-2xl">Before we begin please review the informed concent agreement</p>

      <ConsentAlert />
      

    </div>
  );
}
