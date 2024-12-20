"use client"

import { SearchIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"

import { z } from "zod"
import { useForm } from "react-hook-form";

const formSchema = z.object({
    search: z.string().trim().min(1, {
        message: "Digite algo para buscar"
    }),
})

export function SearchLabel() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: ""
        }
    })

    const router = useRouter()

    function handleSubmit(data: z.infer<typeof formSchema>) {
        router.push(`/barbershops?search=${data.search}`)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex gap-2 w-full"
            >
                <FormField
                    control={form.control}
                    name="search"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Input
                                    placeholder="Faça sua busca..." {...field}
                                    className="w-full"
                                />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />
                <Button
                    size="icon"
                    type="submit"
                >
                    <SearchIcon
                        className="size-5"
                    />
                </Button>
            </form>
        </Form>
    )
}