"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../_lib/auth"
import { toast } from "sonner"

interface CreateBookingParams {
    serviceId: string
    date: Date
}

export async function CreateBooking(params: CreateBookingParams) {
    const data = await getServerSession(authOptions)

    if (!data?.user) {
        toast.error("Usuário não autenticado")
        throw new Error("Usuário não autenticado")
    }

    await db.booking.create({
        data: { ...params, userId: (data?.user as any).id }
    })
    revalidatePath("/barbershops/[id]")
}