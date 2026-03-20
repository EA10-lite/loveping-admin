"use client"

import * as React from "react"
import { Calendar1 } from "lucide-react"

import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { Label } from "../ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover"
import { type FormikValues, useFormikContext } from "formik"
import { cn } from "../../lib/utils"


interface DateAndTimePickerProps {
    name: string;
    label: string
    styles?: string;
    isOptional?: boolean;
}

/** Coerce form value to a Date for display/calendar, or undefined */
function toDateOrUndefined(value: unknown): Date | undefined {
    if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
    if (typeof value === "string" && value) {
        const d = new Date(value);
        return Number.isNaN(d.getTime()) ? undefined : d;
    }
    return undefined;
}

const DateAndTimePicker = ({
    name,
    label,
    styles,
    isOptional,
}: DateAndTimePickerProps) => {
    const { values, setFieldValue } = useFormikContext<FormikValues>();

    const [open, setOpen] = React.useState(false);

    const dateValue = toDateOrUndefined(values[name]);

    return (
        <div className="flex gap-3 w-full">
            <div className="flex flex-col gap-3 w-full">
                {label && (
                    <Label htmlFor="date-picker" className="text-white text-sm font-medium">
                        {label}
                        {isOptional && (
                            <span className="text-primary rounded-full px-2 bg-[#FFFFFF05] text-xs inline py-1">Optional</span>
                        )}
                    </Label>
                )}
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild className="w-full">
                        <Button
                            id="date-picker"
                            className={
                                cn(
                                    "bg-transparent w-full rounded-full w-full px-4 border border-primary/10 focus:ring-primary h-12 focus:outline-none focus-visible:ring-[#1dc071] focus-visible:ring-[1px] transition-all text-white text-sm font-normal hover:bg-transparent flex items-center justify-between",
                                    styles
                                )
                            }
                        >
                            <span className="text-white text-sm font-normal">
                                {dateValue ? dateValue.toLocaleDateString() : ""}
                            </span>
                            <Calendar1 className="text-primary" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={dateValue}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                                setFieldValue(name, date ?? undefined);
                                setOpen(false);
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}


export default DateAndTimePicker;