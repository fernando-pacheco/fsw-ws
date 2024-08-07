import { ServiceItem } from "@/app/_components/service-item"
import { Button } from "@/app/_components/ui/button"
import { Separator } from "@/app/_components/ui/separator"
import { db } from "@/app/_lib/prisma"
import { ChevronLeft, MapPinIcon, MenuIcon, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface BarbershopPageProps {
    params: {
        id: string
    }
}

export default async function BarbershopPage({ params }: BarbershopPageProps) {
    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id
        },
        include: {
            services: true
        }
    })

    return (
        <div className="">
            {/* Image */}
            <div className="relative h-[320px] w-full">
                <Image
                    alt={barbershop.name}
                    src={barbershop?.imageUrl}
                    fill
                    className="object-cover z-0"
                />
                <Button size="icon" variant="secondary" className="absolute top-4 left-4" asChild>
                    <Link href='/'>
                        <ChevronLeft />
                    </Link>
                </Button>
                <Button size="icon" variant="secondary" className="absolute top-4 right-4">
                    <MenuIcon />
                </Button>
            </div>

            {/* TitleInfo */}
            <div className="p-5 flex flex-col gap-3 border-b border-solid">
                <h1 className="font-bold text-xl">{barbershop?.name}</h1>
                <div className="flex items-center gap-2">
                    <MapPinIcon className="text-primary" />
                    <p>{barbershop?.address}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Star className="text-primary fill-primary" />
                    <p className="text-sm">5.0 (499 avaliações)</p>
                </div>
            </div>

            <Separator />

            {/* Description */}
            <div className="p-5 border-b border-solid space-y-5">
                <h2 className="text-gray-400 uppercase text-sm">sobre nós</h2>
                <p className="text-xs text-justify">{barbershop?.description}</p>
            </div>

            <Separator />

            {/* Services */}
            <div className="p-5 border-b border-solid space-y-5">
                <h2 className="text-gray-400 uppercase text-sm">serviços</h2>
                <div className="space-y-3">
                    {barbershop?.services.map(service => (
                        <ServiceItem key={service.id} service={service} />
                    ))}
                </div>
            </div>


        </div>
    )
}