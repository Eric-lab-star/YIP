import Link from "next/link";
import Text from "./Text";
import Title from "./Title";
import { Link2 } from "lucide-react";

export default function References({
  moreLinks,
}: {
  moreLinks: { label: string; src: string }[];
}) {
  return (
    <>
      <Title my="l" size="h2" style={""}>
        관련 자료
      </Title>
      {moreLinks.map((v, i) => (
        <Text key={i}>
          <Link
            target="_blank"
            href={v.src}
            className=" flex flex-col hover:font-semibold hover:text-blue-900"
          >
            <div className="">
              {i + 1}. {v.label} :{" "}
            </div>
            <div className="flex items-center  ">
              <Link2 size="15" className="inline-block" />{" "}
              <Text style=" text-ellipsis overflow-hidden">{v.src}</Text>
            </div>
          </Link>
        </Text>
      ))}
    </>
  );
}
