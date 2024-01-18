"use client"

import {Button} from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import React, {useState} from "react";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    ColumnFiltersState,
    getFilteredRowModel
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Badge} from "@/components/ui/badge";
import { toast } from "sonner"
import {ArrowDownToLine} from "lucide-react";
import {Toaster} from "@/components/ui/sonner";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    searchKey:string
}

interface SonnerProps {
    onClick:(stringText:string) => void
}

 function SonnerDemo({onClick}:SonnerProps) {
    return (
        <Button
            variant="secondary"
            className={'p-1 m-1 active:bg-black'}
            onClick={() =>
                toast("You've just copy your link", {
                    action: {
                        label: "Copy",
                        onClick: () => onClick,
                    },
                })
            }
        >
            <Toaster />
            <ArrowDownToLine style={{zIndex:'10'}} />
        </Button>
    )
}



export function DataTable<_, TValue>({
                                             columns,
                                             data,
                                             searchKey
                                         }: DataTableProps<any, TValue>) {

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel:getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state:{
            columnFilters
        }
    })


    const makeCopy = (stringText:string) => {
        return navigator.clipboard?.writeText(stringText);
    }

    return (
        <div>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Search"
                    value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn(searchKey)?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
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
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        cell.column.id === 'status' ?
                                            <TableCell key={cell.id}>
                                                <Badge variant={cell.row.original.status === 'Rejected' ? 'destructive' : 'default'} >{flexRender(cell.column.columnDef.cell, cell.getContext())}</Badge>
                                            </TableCell>
                                            : cell.column.id === 'link' && cell.row.original.link ?
                                                <TableCell key={cell.id}>
                                                    {
                                                        cell.row.original.link ?
                                                            <>
                                                            <span>{cell.row.original.link.slice(12,35)} </span>
                                                            <SonnerDemo  onClick={makeCopy(cell.row.original.link) as any}/>
                                                            </>
                                                        : null
                                                    }
                                                </TableCell>
                                            :
                                                <TableCell key={cell.id}>
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
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}
