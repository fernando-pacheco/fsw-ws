import { BarbershopService } from "@prisma/client"
import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"

interface ServiceItemProps {
    service: BarbershopService
}

export function ServiceItem({ service }: ServiceItemProps) {
    return (
        <Card>
            <CardContent className="flex gap-3 p-3 group">
                <Image
                    alt={service.name}
                    src={service.imageUrl}
                    width={120}
                    height={120}
                    className="rounded-lg border border-destructive group-hover:border-primary"
                />
                <div className="py-1 flex flex-col justify-between">
                    <p className="text-sm font-semibold">{service.name}</p>
                    <p className="text-xs text-gray-400">{service.description}</p>
                    <div className="flex justify-between items-center">
                        <p className="text-primary font-semibold">{Intl.NumberFormat("pt-BR", {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(Number(service.price))}</p>
                        <Button variant="secondary" size="sm" className="group-hover">Reservar</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
