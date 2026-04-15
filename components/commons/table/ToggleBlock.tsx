import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import CodeBlock from "../CodeBlock.lazy";

interface IToggleBlock {
  header: string;
  code: string;
}
export default function ToggleCodeBlock({ header, code }: IToggleBlock) {
  return (
    <Card className="my-5 shadow-none">
      <CardContent>
        <Collapsible>
          <Button asChild variant={"ghost"} className="w-full">
            <CollapsibleTrigger>{header}</CollapsibleTrigger>
          </Button>
          <CollapsibleContent>
            <CodeBlock code={code} />
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
