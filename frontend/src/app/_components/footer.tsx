import { Card, CardContent } from "./ui/card";

export function Footer() {
    return (
        <footer>
            <Card className="rounded-none w-full flex items-center">
                <CardContent className="py-5 px-6">
                    <p className="text-gray-400">© 2023 Copyright <b>FSW Barber</b></p>
                </CardContent>
            </Card>
        </footer>
    )
}