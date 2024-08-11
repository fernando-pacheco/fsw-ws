"use client"

import { House, CalendarDays, LogOut, LogIn } from "lucide-react";
import { quickSearchOptions } from "../_constants/search";
import { Button } from "./ui/button";
import { SheetTrigger, SheetContent, SheetHeader, SheetTitle, Sheet, SheetClose } from "./ui/sheet";
import Image from "next/image";
import { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { SignInDialog } from "./sign-in-dialog";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

interface SidebarSheetProps {
    children: ReactNode
}

export function SidebarSheet({
    children,
}: SidebarSheetProps) {
    const { data } = useSession()

    async function handleLogoutWithGoogle() {
        await signOut()
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent className="px-6">
                <SheetHeader>
                    <SheetTitle className="text-left pt-2 pb-7">Menu</SheetTitle>
                </SheetHeader>
                <div className="space-y-6">
                    {/* UserInfo */}
                    {!data ? (
                        <div className="flex items-center justify-between gap-4">
                            <h2 className="font-bold">Olá, faça seu login!</h2>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button size="icon">
                                        <LogIn />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="flex items-center justify-center flex-col w-[90%]">
                                    <SignInDialog />
                                </DialogContent>
                            </Dialog>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Avatar className="border-2 border-primary size-14">
                                <AvatarImage src={data.user?.image ?? ''} alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-md">{data.user?.name}</p>
                                <p className="text-sm text-gray-400">{data.user?.email}</p>
                            </div>
                        </div>
                    )}

                    <Separator />

                    {/* Navigation */}
                    <div className="flex flex-col gap-4">
                        <Button variant="ghost" className="w-full flex justify-start gap-3 hover:bg-primary" asChild>
                            <Link href="/">
                                <House size={18} />
                                Início
                            </Link>
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
                            <SheetClose key={option.title} asChild>
                                <Button
                                    variant="ghost"
                                    className="w-full flex justify-start gap-3 hover:bg-primary"
                                    asChild
                                >
                                    <Link href={`/barbershops?search=${option.title}`}>
                                        <Image alt={option.title} src={option.imageUrl} width={18} height={18} />
                                        {option.title}
                                    </Link>
                                </Button>
                            </SheetClose>
                        ))}
                    </div>

                    <Separator />

                    {/* Logout */}
                    <Button
                        variant="ghost"
                        className="w-full flex justify-start gap-3 hover:bg-primary"
                        onClick={handleLogoutWithGoogle}
                    >
                        <LogOut size={18} />
                        Sair da conta
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}