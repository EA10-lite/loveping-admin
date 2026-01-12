"use client"

import * as React from "react"
import {
    type ColumnDef,
    type ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table"
import { Input } from "../ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select"
import { Button } from "../ui/button"

interface FilterOption {
    label: string
    value: string
}

interface FilterConfig {
    columnKey: string
    title: string
    options: FilterOption[]
}

interface ReusableTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    searchKeys?: string[]
    filters?: FilterConfig[]
    showHeader?: boolean
}

export function ReusableTable<TData, TValue>({
    columns,
    data,
    searchKeys,
    filters = [],
    showHeader = true,
}: ReusableTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [globalFilter, setGlobalFilter] = React.useState("")

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: (row, _columnId, filterValue) => {
            if (!searchKeys || searchKeys.length === 0) return true;
            const searchValue = filterValue.toLowerCase();
            return searchKeys.some((key) => {
                const value = row.getValue(key);
                return String(value).toLowerCase().includes(searchValue);
            });
        },
        state: {
            columnFilters,
            globalFilter,
        },
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
    })

    return (
        <div className="reusable-table">
            <div className="space-y-4 w-full border-[0.5px] border-primary/8 bg-secondary-foreground rounded-md">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6">
                    {searchKeys && searchKeys.length > 0 && (
                        <div className="relative w-full sm:max-w-sm">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search"
                                value={globalFilter ?? ""}
                                onChange={(event) => setGlobalFilter(event.target.value)}
                                className="pl-9 border-[0.5px] border-primary/8 text-white placeholder:text-muted-foreground rounded-lg focus:outline-none focus-visible:ring-primary focus-visible:ring-[1px] transition-all"
                            />
                        </div>
                    )}

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        {filters.map((filter) => (
                            <Select
                                key={filter.columnKey}
                                value={(table.getColumn(filter.columnKey)?.getFilterValue() as string) ?? "all"}
                                onValueChange={(value) =>
                                    table.getColumn(filter.columnKey)?.setFilterValue(value === "all" ? "" : value)
                                }
                            >
                                <SelectTrigger className="w-[150px] border-[0.5px] border-primary/8 text-white rounded-lg capitalize">
                                    <SelectValue placeholder={filter.title} />
                                </SelectTrigger>
                                <SelectContent className="bg-secondary-foreground border-white/10 text-white">
                                    <SelectItem value="all">{filter.title}</SelectItem>
                                    {filter.options.map((option) => (
                                        <SelectItem key={option.value} value={option.value} className="capitalize">
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        ))}
                    </div>
                </div>

                <div className="rounded-md border-none">
                    <Table>
                        {showHeader && (
                            <TableHeader className="bg-primary/4 hover:bg-primary/4 [&_tr]:border-b-secondary-foreground">
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id} className="hover:bg-primary/4 border-none">
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id} className="text-primary font-medium first:pl-6">
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                </TableHead>
                                            )
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                        )}
                        <TableBody className="[&_tr:last-child]:border-0 text-white">
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                        className="border-b border-primary/10 hover:bg-transparent"
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id} className="py-4 first:pl-6">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-2 py-4">
                <div className="text-sm text-white">
                    Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
                    {Math.min(
                        (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                        table.getFilteredRowModel().rows.length
                    )}{" "}
                    from {table.getFilteredRowModel().rows.length}
                </div>

                <div className="flex items-center space-x-2">
                    <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 text-primary hover:bg-secondary-foreground hover:text-[#34D399]"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <div className="flex items-center gap-1">
                        {Array.from({ length: table.getPageCount() }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant="ghost"
                                onClick={() => table.setPageIndex(page - 1)}
                                className={`h-8 w-8 p-0 rounded-full ${table.getState().pagination.pageIndex === page - 1
                                    ? "bg-primary text-secondary hover:bg-primary/90"
                                    : "text-white hover:bg-secondary-foreground hover:text-[#34D399]"
                                    }`}
                            >
                                {page}
                            </Button>
                        ))}
                    </div>

                    <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 text-primary hover:bg-secondary-foreground hover:text-[#34D399]"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-white">Showing Per Page</p>
                    <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value))
                        }}
                    >
                        <SelectTrigger className="h-8 w-[70px] bg-secondary-foreground border-none text-white">
                            <SelectValue placeholder={table.getState().pagination.pageSize} />
                        </SelectTrigger>
                        <SelectContent side="top" className="bg-secondary-foreground border-none text-white">
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    )
}

export default ReusableTable;