"use client"

import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import SmallSidebar from "../_components/SmallSidebar"
import { useQuery } from '@tanstack/react-query'
import { api } from '~/trpc/react'
import { useEffect, useState } from 'react'

export default function Table({ baseId}: { baseId: string }) {
    const { data: tableData, isLoading } = api.table.getTableData.useQuery({ baseId });
    const [selectedTableId, setSelectedTableId] = useState<string | null>(null);

    useEffect(() => {
        if (!selectedTableId && tableData?.length) {
            setSelectedTableId(tableData[0]?.id ?? null)
        }
    }, [selectedTableId, tableData])
    const selectedTable = tableData?.find(t => t.id === selectedTableId)
    // const selectedTable = tableData?.find(tableId => tableId === selectedTableId)
    const columns = selectedTable?.columns.map(col => ({
        accessorKey: col.id,
        header: col.name, 
    }))

    const updateCell = api.table.updateCell.useMutation();

    const rows = selectedTable?.rows.map(row => {
        const rowObj: Record<string, string> = {};
        row.cells.forEach(cell => {
            rowObj[cell.colId] = cell.value ?? "";
            rowObj[cell.colId + "_cellId"] = cell.id;
        });
        return rowObj;
    });

    // const rows = tableData?.[0].map(row => {
    //     const rowValue: Record<string, string> = {};
    //     row?.cells.forEach(cell => {
    //         rowValue[cell.colId] = cell.value ?? ""
    //     })        
    // })
    const table = useReactTable({ data: rows ?? [], columns: columns ?? [], getCoreRowModel: getCoreRowModel(), columnResizeMode: 'onEnd', })
    return (
        <main className="h-screen flex">
            <SmallSidebar/>
            <div style={{ overflowX: 'auto', flex: 1 }}>
                <table>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th 
                                        key={header.id}
                                        style={{
                                            border: '1px solid #ccc',
                                            padding: '8px',
                                            position: 'relative',
                                            width: header.getSize(), 
                                            backgroundColor: '#f9f9f9',
                                        }}>
                                        {header.column.columnDef.header as string}
                                        <div
                                            onMouseDown={header.getResizeHandler()}
                                            onTouchStart={header.getResizeHandler()}
                                            style={{
                                                position: 'absolute',
                                                right: 0,
                                                top: 0,
                                                height: '100%',
                                                width: '4px',
                                                cursor: 'col-resize',
                                                userSelect: 'none',
                                            }}
                                        />
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} style={{ border: '1px solid #ccc', padding: '4px' }}>
                                        <input
                                            value={cell.getValue() as string ?? ""}
                                            onBlur={e => {
                                                const newValue = e.target.value;
                                                const oldValue = cell.getValue() as string ?? "";
                                                if (newValue !== oldValue) {
                                                    updateCell.mutate({
                                                        cellId: cell.row.original[cell.column.id + "_cellId"] as string,
                                                        value: e.target.value,
                                                    })
                                                }
                                            }}
                                            style={{
                                                width: '100%',
                                                border: 'none',
                                                outline: 'none',
                                                padding: '4px',
                                            }}>
                                        </input>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>     
    )
}