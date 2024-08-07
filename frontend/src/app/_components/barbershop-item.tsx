import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Barbershop } from "@prisma/client";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Star } from "lucide-react";
import Link from "next/link";

interface BarbershopItemProps {
    barbershop: Barbershop
}

export function BarbershopItem({ barbershop }: BarbershopItemProps) {
    return (
        <Card className="min-w-40">
            <CardContent className="p-1">
                <div className="relative h-40 w-full">
                    <Image
                        fill
                        className="object-cover rounded-xl"
                        alt={barbershop.name}
                        src={barbershop.imageUrl}
                    />
                    <div className="relative z-10 top-2 left-2 group">
                        <Badge className="gap-1 h-full items-center rounded-lg px-1 bg-destructive/70">
                            <Star className="fill-primary text-primary size-4 group-hover:text-destructive group-hover:fill-destructive" />
                            <p>5.0</p>
                        </Badge>
                    </div>
                </div>
                <div className="w-full flex flex-col justify-between p-2 h-28">
                    <div>
                        <p className="font-semibold text-sm truncate">{barbershop.name}</p>
                        <p className="text-xs text-gray-400">{barbershop.address}</p>
                    </div>
                    <Button variant="secondary" asChild>
                        <Link href={`/barbershops/${barbershop.id}`}>
                            Reservar
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}