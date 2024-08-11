"use client"

import { Barbershop, BarbershopService, Booking } from "@prisma/client"
import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "./ui/sheet"
import { Calendar } from "./ui/calendar"
import { ptBR } from 'date-fns/locale'
import { Separator } from "./ui/separator"
import { useEffect, useState } from "react"
import { format, set } from "date-fns"
import { useSession } from "next-auth/react"
import { CreateBooking } from "../_actions/create-booking"
import { toast } from "sonner"
import { GetBookings } from "../_actions/get-bookings"
import { SignInDialog } from "./sign-in-dialog"
import { Dialog, DialogContent } from "./ui/dialog"

interface ServiceItemProps {
    service: BarbershopService
    barbershop: Pick<Barbershop, 'name'>
}

const TIME_LIST = [
    "9:00",
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
]

function getTimeList(bookings: Booking[]) {
    return TIME_LIST.filter(time => {
        const hour = Number(time.split(':')[0])
        const minute = Number(time.split(':')[1])
        const hasBookingOnCurrentTime = bookings.some(
            booking =>
                booking.date.getHours() === hour &&
                booking.date.getMinutes() === minute
        )

        if (hasBookingOnCurrentTime) {
            return false
        }
        return true
    })
}

export function ServiceItem({ service, barbershop }: ServiceItemProps) {
    const { data } = useSession()
    const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
    const [selectedTime, setSeletedTime] = useState<string | undefined>(undefined)
    const [dayBookings, setDayBookings] = useState<Booking[]>([])
    const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false)
    const [signInDialogIsOpen, setSignInDialogIsOpen] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            if (!selectedDay) return
            const bookings = await GetBookings({
                date: selectedDay,
                serviceId: service.id
            })
            setDayBookings(bookings)
        }

        fetch()
    }, [selectedDay, service.id])

    function handleDateSelect(date: Date | undefined) {
        setSelectedDay(date)
    }

    function handleTimeSelect(time: string) {
        setSeletedTime(time)
    }

    function handleBookingSheetOpenChenage() {
        setDayBookings([])
        setSelectedDay(undefined)
        setSeletedTime(undefined)
        setBookingSheetIsOpen(false)
    }

    const handleBookingClick = () => {
        if (data?.user) {
            return setBookingSheetIsOpen(true)
        }
        return setSignInDialogIsOpen(true)
    }

    async function handleCreateBooking() {
        try {
            if (!selectedDay || !selectedTime) return

            const splitTime = selectedTime.split(':')
            const newDate = set(selectedDay, {
                hours: Number(splitTime[0]),
                minutes: Number(splitTime[1]),
            })

            await CreateBooking({
                serviceId: service.id,
                date: newDate,
            })
            handleBookingSheetOpenChenage()
            toast.success("Reserva criada com sucesso!")
        } catch (error) {
            console.error(error)
            toast.error("Erro ao criar a reserva!")
        }
    }

    return (
        <>
            <Card>
                <CardContent className="flex gap-3 p-3 group">
                    <Image
                        alt={service.name}
                        src={service.imageUrl}
                        width={120}
                        height={120}
                        className="rounded-lg border border-destructive group-hover:border-primary"
                    />
                    <div className="py-1 flex flex-col justify-between w-full">
                        <p className="text-sm font-semibold">{service.name}</p>
                        <p className="text-xs text-gray-400">{service.description}</p>
                        <div className="flex justify-between items-center w-full">
                            <p className="text-primary font-semibold">{Intl.NumberFormat("pt-BR", {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(Number(service.price))}</p>

                            <Sheet open={bookingSheetIsOpen} onOpenChange={handleBookingSheetOpenChenage}>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="group-hover"
                                    onClick={handleBookingClick}>
                                    Reservar
                                </Button>
                                <SheetContent className="p-0">
                                    <SheetHeader>
                                        <SheetTitle className="flex p-6 my-2">
                                            Fazer Reserva
                                        </SheetTitle>
                                    </SheetHeader>

                                    <Separator className="w-full" />

                                    <div className="p-5">
                                        <Calendar
                                            mode="single"
                                            locale={ptBR}
                                            selected={selectedDay}
                                            onSelect={handleDateSelect}
                                            fromDate={new Date()}
                                            styles={{
                                                head_cell: {
                                                    width: "100%",
                                                    textTransform: "capitalize",
                                                },
                                                cell: {
                                                    width: "100%",
                                                },
                                                button: {
                                                    width: "100%",
                                                },
                                                nav_button_next: {
                                                    width: "32px",
                                                    height: "32px",
                                                },
                                                nav_button_previous: {
                                                    width: "32px",
                                                    height: "32px",
                                                },
                                                caption: {
                                                    textTransform: "capitalize",
                                                },
                                            }}
                                        />
                                    </div>


                                    {selectedDay && (
                                        <>
                                            <Separator className="w-full" />
                                            <div className="flex gap-3 overflow-x-auto p-5 [&::-webkit-scrollbar]:hidden">
                                                {getTimeList(dayBookings).map(time => (
                                                    <Button
                                                        key={time}
                                                        variant={selectedTime === time ? "default" : "outline"}
                                                        size="sm"
                                                        className="rounded-xl"
                                                        onClick={() => handleTimeSelect(time)}
                                                    >
                                                        {time}
                                                    </Button>
                                                ))}
                                            </div>
                                        </>
                                    )}

                                    <Separator className="w-full" />

                                    {selectedTime && selectedDay && (
                                        <div className="p-5">
                                            <Card>
                                                <CardContent className="p-4 space-y-3">
                                                    <div className="flex justify-between">
                                                        <h2 className="text-white">{service.name}</h2>
                                                        <p className="font-normal text-white">{Intl.NumberFormat("pt-BR", {
                                                            style: 'currency',
                                                            currency: 'BRL'
                                                        }).format(Number(service.price))}</p>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <p className="text-sm font-normal text-gray-400">Data</p>
                                                        <p className="text-sm font-normal text-white">
                                                            {format(selectedDay, "d 'de' MMMM", { locale: ptBR })}
                                                        </p>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <p className="text-sm font-normal text-gray-400">Horário</p>
                                                        <p className="text-sm font-normal text-white">
                                                            {selectedTime}
                                                        </p>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <p className="text-sm font-normal text-gray-400">Barbearia</p>
                                                        <p className="text-sm font-normal text-white">{barbershop.name}</p>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    )}

                                    <SheetFooter className="px-5 mt-5">
                                        <SheetClose asChild>
                                            <Button
                                                type="submit"
                                                onClick={handleCreateBooking}
                                                disabled={!selectedDay || !selectedTime}
                                            >
                                                Confirmar
                                            </Button>
                                        </SheetClose>
                                    </SheetFooter>

                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Dialog
                open={signInDialogIsOpen}
                onOpenChange={(open) => setSignInDialogIsOpen(open)}
            >
                <DialogContent className="w-[90%]">
                    <SignInDialog />
                </DialogContent>
            </Dialog>
        </>
    )
}
