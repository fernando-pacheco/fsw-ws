import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "@radix-ui/react-separator";
import { Badge } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface BookingItemProps {
    title: string
    status: string
    service: string
    avatarImg: string
    barberTitle: string
    month: string
    day: number
    hour: string
    // scheduling: datetime
}

export function BookingItem({
    avatarImg,
    barberTitle,
    day,
    hour,
    month,
    service,
    status,
    title,
}:BookingItemProps) {
    return (
        <div>
            <p className="mt-6 font-bold text-sm uppercase text-gray-400">{title}</p>
            <div className="mt-2 flex gap-2">
                <Card className="flex w-full">
                    <CardContent className="p-4 w-9/12">
                        <Badge className="rounded-lg bg-destructive text-primary hover:text-destructive">{status}</Badge>
                        <h3 className="font-semibold mt-4">{service}</h3>
                        <div className="flex items-center gap-4 mt-2">
                            <Avatar>
                                <AvatarImage src={avatarImg} alt="@shadcn" />
                            </Avatar>
                            <p>{barberTitle}</p>
                        </div>
                    </CardContent>
                    <Separator orientation="vertical" />
                    <CardContent className="flex flex-col items-center justify-center flex-1 h-full p-0">
                        <p className="text-sm">{month}</p>
                        <p className="text-2xl">{day}</p>
                        <p className="text-sm">{hour}</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}