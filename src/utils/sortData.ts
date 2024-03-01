import {TableData} from "../models/course.ts";

export function sortDataByString(
    unsortedData: Array<TableData>,
    getSortValue: (data: TableData) => string
) {
    const sortOrderMultiplier: number = sortOrder === SortOrder.ASC ? 1 : -1

    return [...unsortedData].sort(
        (a, b) => {
            const aSortValue = getSortValue(a)
            const bSortValue = getSortValue(b)
            return aSortValue.localeCompare(bSortValue) * sortOrderMultiplier
        }
    )
}
