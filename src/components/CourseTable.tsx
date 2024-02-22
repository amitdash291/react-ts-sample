import {ReactElement, ReactNode} from "react";
import {Course} from "../models/course.ts";
import {TableContainer, Paper, Table, TableBody, TableCell, TableHead, TableRow, Box} from "@mui/material";

interface CourseTableProps {
    courses: Array<Course>
    caption?: string
    onCourseNameHeaderClick?: (() => void) | null
    sortIndicators?: (() => ReactElement) | null
}

export function CourseTable(
    {
        courses,
        caption,
        onCourseNameHeaderClick,
        sortIndicators
    }: CourseTableProps) {
    const dataRows: ReactNode = courses.map((course) => {
        return (
            <TableRow key={course.id}>
                <TableCell>{course.id}</TableCell>
                <TableCell>{course.name}</TableCell>
            </TableRow>
        );
    })

    const nameHeader = () => <TableCell
        width="50%"
        {...(onCourseNameHeaderClick && {onClick: onCourseNameHeaderClick})}
        sx={[
            onCourseNameHeaderClick ? {
                '&:hover': {
                    backgroundColor: 'lightgrey',
                    cursor: 'pointer'
                },
            } : {}
        ]}>
        <Box display="flex" flexDirection="row">
            Name
            {onCourseNameHeaderClick && sortIndicators && sortIndicators()}
        </Box>
    </TableCell>
    const tableElement = (
        <Table sx={{
            minWidth: 500,
            size: "small"
        }}>
            <caption style={{
                captionSide: "top",
                fontWeight: "bold",
                fontSize: "1.5em"
            }}>
                {caption ? caption : "Available Courses"}
            </caption>
            <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    {nameHeader()}
                </TableRow>
            </TableHead>
            <TableBody>{dataRows}</TableBody>
        </Table>
    );

    return (
        <TableContainer component={Paper}>
            {tableElement}
        </TableContainer>
    );
}
