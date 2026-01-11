"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover"
import { type FormikValues, useFormikContext } from "formik"


interface DateAndTimePickerProps {
    dateName: string;
    timeName: string;
    dateLabel?: string;
    timeLabel?: string;
}

const DateAndTimePicker = ({
    dateName,
    timeName,
    dateLabel,
    timeLabel,
}: DateAndTimePickerProps) => {
    const { values, setFieldValue } = useFormikContext<FormikValues>();

    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(undefined)

    return (
        <div className="flex gap-3 w-full">
            <div className="flex flex-col gap-3 w-1/2">
                {dateLabel && (
                    <Label htmlFor="date-picker" className="text-white text-sm font-medium">
                        {dateLabel}
                    </Label>
                )}
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            id="date-picker"
                            className="justify-between font-normal w-full h-11 bg-transparent border border-primary/10 text-white hover:bg-transparent"
                        >
                            {date ? date.toLocaleDateString() : "Select date"}
                            <ChevronDownIcon />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                                setDate(date)
                                setOpen(false)
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="flex flex-col gap-3 w-1/2">
                {timeLabel && (
                    <Label htmlFor="time-picker" className="text-white text-sm font-medium">
                        {timeLabel}
                    </Label>
                )}
                <Input
                    type="time"
                    id="time-picker"
                    step="1"
                    defaultValue="10:30:00"
                    value={values[timeName]}
                    onChange={(e) => setFieldValue(timeName, e.target.value)}
                    className="bg-transparent border border-primary/10 text-white h-11 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
            </div>
        </div>
    )
}


export default DateAndTimePicker;