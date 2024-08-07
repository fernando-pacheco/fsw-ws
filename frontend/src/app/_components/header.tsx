import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { AlignJustify } from "lucide-react";
import { Button } from "./ui/button";

export function Header() {
    return (
        <Card>
            <CardContent className="flex justify-between items-center py-4">
                <Image alt="FSW Barber" src="/logo.png" height={18} width={120} />
                <Button size="icon" variant="outline">
                    <AlignJustify className="size-5" />
                </Button>
            </CardContent>
        </Card>
    )
}