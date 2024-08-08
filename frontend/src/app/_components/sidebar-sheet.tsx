"use client"

import { House, CalendarDays, LogOut, LogIn } from "lucide-react";
import { quickSearchOptions } from "../_constants/search";
import { Button } from "./ui/button";
import { SheetTrigger, SheetContent, SheetHeader, SheetTitle, Sheet } from "./ui/sheet";
import Image from "next/image";
import { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./ui/dialog";
import { signIn, signOut, useSession } from "next-auth/react";

interface SidebarSheetProps {
    children: ReactNode
}

export function SidebarSheet({
    children,
}: SidebarSheetProps) {
    const { data } = useSession()

    async function handleLoginWithGoogle() {
        await signIn("google")
    }
    async function handleLogoutWithGoogle() {
        await signOut("google")
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
                                    <DialogTitle>Faça login na plataforma</DialogTitle>
                                    <DialogDescription>Conecte-se usando sua conta Google.</DialogDescription>
                                    <Button
                                        variant="outline"
                                        className="w-full gap-2 border border-primary"
                                        onClick={handleLoginWithGoogle}
                                    >
                                        <Image
                                            alt="google"
                                            src="/google.svg"
                                            width={18}
                                            height={18}
                                        />
                                        Google
                                    </Button>
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
                            <Button key={option.title} variant="ghost" className="w-full flex justify-start gap-3 hover:bg-primary">
                                <Image alt={option.title} src={option.imageUrl} width={18} height={18} />
                                {option.title}
                            </Button>
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