import ConsentAlert from "@/components/ui/concent-alert";
import { DeviceAlert } from "@/components/ui/device-alert";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-8 text-center">
      <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold">TrainQuill</h1>

      <div className="space-y-4 max-w-2xl mx-auto px-4">
        <p className="text-lg md:text-2xl">
          Welcome to our study on the UX design of art wellness applications.
        </p>
        <p className="text-lg md:text-2xl">
          Before we begin please review the informed consent agreement
        </p>
      </div>

      <DeviceAlert />
      <ConsentAlert />
    </div>
  );
}
