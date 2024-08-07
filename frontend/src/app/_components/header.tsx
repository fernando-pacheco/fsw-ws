import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { SidebarSheet } from "./sidebar-sheet";
import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";

export function Header() {
    return (
        <Card className="rounded-none">
            <CardContent className="flex justify-between items-center py-4">
                <Image alt="FSW Barber" src="/logo.png" height={18} width={120} />
                <SidebarSheet>
                    <Button size="icon" variant="outline">
                        <MenuIcon size={18} />
                    </Button>
                </SidebarSheet>

            </CardContent>
        </Card>
    );
}
