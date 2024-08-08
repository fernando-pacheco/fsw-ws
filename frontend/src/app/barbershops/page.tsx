import { BarbershopItem } from "../_components/barbershop-item"
import { Header } from "../_components/header"
import { SearchLabel } from "../_components/search-label"
import { db } from "../_lib/prisma"

interface BarbershopsPageProps {
    searchParams: {
        search?: string
    }
}

export default async function BarbershopsPage({ searchParams }: BarbershopsPageProps) {
    const barbershops = await db.barbershop.findMany({
        where: {
            OR: [{
                name: {
                    contains: searchParams?.search,
                    mode: "insensitive"
                },
            },
            {
                services: {
                    some: {
                        name: {
                            contains: searchParams?.search,
                            mode: "insensitive"
                        }
                    }
                }
            },]
        }
    })


    return (
        <div className="">
            <Header />
            <div className="my-6 px-5">
                <SearchLabel />
                <div className="mt-6">
                    <p className="text-sm uppercase text-gray-400">Resultados para &quot;{searchParams.search}&quot;</p>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        {barbershops.map(barbershop => (
                            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}