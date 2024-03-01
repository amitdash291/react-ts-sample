import {Course, TableData} from "../models/course.ts";
import {useState} from "react";
import {CourseTable} from "./CourseTable.tsx";
import {Box} from "@mui/material";
import {RxTriangleDown, RxTriangleUp} from "react-icons/rx";
import {sortDataByString} from "../utils/sortData.ts";

interface SortableCourseTableProps {
    courses: Array<Course>
    getSortValue: (data: TableData) => string
}

enum SortOrder {
    NONE,
    ASC,
    DESC
}

export function SortableCourseTable({courses, getSortValue}: SortableCourseTableProps) {
    const [sortOrder, setSortOrder] =
        useState<SortOrder>(SortOrder.NONE);

    function setSortByCourseNameOrder() {
        if (sortOrder === SortOrder.NONE) setSortOrder(SortOrder.ASC)
        else if (sortOrder === SortOrder.ASC) setSortOrder(SortOrder.DESC)
        else setSortOrder(SortOrder.NONE)
    }

    let sortedCourseData = courses
    if (sortOrder !== SortOrder.NONE)
        sortedCourseData = sortDataByString(sortedCourseData, getSortValue) as Course[]

    const sortIndicators = () => (
        <Box display="flex" flexDirection="column" justifyContent="center" paddingX="5px" height={24}>
            {(sortOrder === SortOrder.ASC || sortOrder === SortOrder.NONE)
                && <RxTriangleUp/>}
            {(sortOrder === SortOrder.DESC || sortOrder === SortOrder.NONE)
                && <RxTriangleDown/>}
        </Box>
    )

    return (
        <div>
            <CourseTable
                courses={sortedCourseData}
                onCourseNameHeaderClick={setSortByCourseNameOrder}
                sortIndicators={sortIndicators}
            />
        </div>
    );
}
