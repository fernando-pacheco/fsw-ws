import Image from "next/image";
import { CalendarDays, House, LogOut, MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { quickSearchOptions } from "../_constants/search";

export function Header() {
    return (
        <Card>
            <CardContent className="flex justify-between items-center py-4">
                <Image alt="FSW Barber" src="/logo.png" height={18} width={120} />

                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline">
                            <MenuIcon size={18} />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="px-6">
                        <SheetHeader>
                            <SheetTitle className="text-left pt-2 pb-7">Menu</SheetTitle>
                        </SheetHeader>
                        <div className="space-y-6">
                            {/* UserInfo */}
                            <div className="flex items-center gap-4">
                                <Avatar className="border-2 border-primary size-14">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-md">User Name</p>
                                    <p className="text-sm text-gray-400">name@email.com</p>
                                </div>
                            </div>

                            <Separator />

                            {/* Navigation */}
                            <div className="flex flex-col gap-4">
                                <Button variant="ghost" className="w-full flex justify-start gap-3 hover:bg-primary">
                                    <House size={18} />
                                    Início
                                </Button>
                                <Button variant="ghost" className="w-full flex justify-start gap-3 hover:bg-primary">
                                    <CalendarDays size={18} />
                                    Agendamentos
                                </Button>
                            </div>

                            <Separator />

                            {/* ServiceItems */}
                            <div className="space-y-2">
                                {quickSearchOptions.map(option => (
                                    <Button key={option.title} variant="ghost" className="w-full flex justify-start gap-3 hover:bg-primary">
                                        <Image alt={option.title} src={option.imageUrl} width={18} height={18} />
                                        {option.title}
                                    </Button>
                                ))}
                            </div>

                            <Separator />

                            {/* Logout */}
                            <Button variant="ghost" className="w-full flex justify-start gap-3 hover:bg-primary">
                                <LogOut size={18} />
                                Sair da conta
                            </Button>

                        </div>

                    </SheetContent>
                </Sheet>
            </CardContent>
        </Card>
    );
}
