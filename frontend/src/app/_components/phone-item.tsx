"use client"

import { Smartphone } from "lucide-react"
import { Button } from "./ui/button"
import { toast } from "sonner"

interface PhoneItemProps {
    phone: string
}

export function PhoneItem({ phone }: PhoneItemProps) {

    function handleCopyPhoneClick(phone: string) {
        navigator.clipboard.writeText(phone)
        toast.success("Telefone copiado com sucesso!")
    }

    return (
        <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
                <Smartphone />
                <p>{phone}</p>
            </div>
            <div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyPhoneClick(phone)}
                >
                    Copiar
                </Button>
            </div>
        </div>
    )
}