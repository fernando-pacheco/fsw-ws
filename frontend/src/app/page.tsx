import { Header } from "./_components/header";
import { Input } from "./_components/ui/input";
import { Button } from "./_components/ui/button";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "./_components/ui/card";
import { Badge } from "./_components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./_components/ui/avatar";
import { Separator } from "./_components/ui/separator";
import { BarbershopItem } from "./_components/barbershop-item";
import { db } from "./_lib/prisma";
import { quickSearchOptions } from "./_constants/search";
import { Footer } from "./_components/footer";

export default async function Home() {
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc"
    }
  })

  return (
    <div>
      <Header />
      <main className="p-5">
        {/* Title */}
        <h2 className="text-xl font-bold">Olá, Felipe!</h2>
        <p>Segunda-feira, 05 de agosto.</p>

        {/* Search */}
        <div className="flex items-center gap-2 mt-6">
          <Input placeholder="Faça sua busca..." />
          <Button size="icon">
            <SearchIcon className="size-5" />
          </Button>
        </div>

        {/* QuickSearch */}
        <div className="flex gap-3 mt-6 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map(option => (
            <Button key={option.title} variant="outline" className="gap-2">
              <Image alt={option.title} src={option.imageUrl} width={16} height={16} />
              {option.title}
            </Button>
          ))}
        </div>

        {/* Banner */}
        <div className="relative w-full h-[150px] mt-6">
          <Image alt="Agende nos melhores com FSW Barber" src="/banner-01.png" fill className="object-cover rounded-xl" />
        </div>

        {/* Scheduling */}
        <p className="mt-6 font-bold text-sm uppercase text-gray-400">agendamentos</p>
        <div className="mt-2 flex gap-2">
          <Card className="flex w-full">
            <CardContent className="p-4 w-9/12">
              <Badge className="rounded-lg bg-destructive text-primary hover:text-destructive">Confirmado</Badge>
              <h3 className="font-semibold mt-4">Corte de Cabelo</h3>
              <div className="flex items-center gap-4 mt-2">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p>Vintage Barber</p>
              </div>
            </CardContent>
            <Separator orientation="vertical" />
            <CardContent className="flex flex-col items-center justify-center flex-1 h-full p-0">
              <p className="text-sm">Agosto</p>
              <p className="text-2xl">12</p>
              <p className="text-sm">09:45</p>
            </CardContent>
          </Card>
        </div>

        {/* Recommended */}
        <p className="mt-6 font-bold text-sm uppercase text-gray-400">Recomendados</p>
        <div className="mt-2 flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map(barbershop => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        {/* Popular */}
        <p className="mt-6 font-bold text-sm uppercase text-gray-400">Popular</p>
        <div className="mt-2 flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map(barbershop => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
