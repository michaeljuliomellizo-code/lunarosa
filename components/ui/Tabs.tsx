interface Props {
  tabs: string[];
}

export default function Tabs({
  tabs,
}: Props) {

  return (
    <div className="flex gap-4 border-b">

      {tabs.map((tab) => (
        <button
          key={tab}
          className="pb-4 border-b-2 border-transparent hover:border-pink-400"
        >
          {tab}
        </button>
      ))}
    </div>
  );
}