import TipTab from "@/components/editor/TipTab";

export default function Page() {
  return (
    <div className="min-h-screen w-full bg-zinc-50 py-6">
      <TipTab editable={true} />
    </div>
  );
}
