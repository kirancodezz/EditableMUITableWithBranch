// Icons
import EditIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DoneIcon from '@mui/icons-material/DoneAllOutlined';
import RevertIcon from '@mui/icons-material/CancelOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Input, Paper, IconButton } from "@mui/material";

import React, { useState } from "react";
import Collapse from "@mui/material/Collapse";


const createData = (name, completed, pending, status, deadLine) => ({
    id: name.replace(" ", "_"),
    name,
    completed,
    pending,
    status,
    deadLine,
    isEditMode: false
});

const CustomTableCell = ({ row, name, onChange }) => {
    const { isEditMode } = row;
    return (
        <TableCell align="left" className={"tableCell"}>
            {isEditMode ? (
                <Input
                    value={row[name]}
                    name={name}
                    onChange={(e) => onChange(e, row)}
                    className={"input"}
                />
            ) : (
                row[name]
            )}
        </TableCell>
    );
};

function TableExample() {

    const [rows, setRows] = React.useState([
        createData("The primary task", "3 Tasks", "2 Tasks", "78%", "3rd Oct"),
        createData("The secondary task", "2 Tasks", "1 Tasks", "90%", "4th Oct"),
        createData("The final task", "10 Tasks", "4 Tasks", "35%", "13th Sept")
    ]);
    const [previous, setPrevious] = React.useState({});

    const onToggleEditMode = (id) => {
        setRows((state) => {
            return rows.map((row) => {
                if (row.id === id) {
                    return { ...row, isEditMode: !row.isEditMode };
                }
                return row;
            });
        });
    };

    const onChange = (e, row) => {
        if (!previous[row.id]) {
            setPrevious((state) => ({ ...state, [row.id]: row }));
        }
        const value = e.target.value;
        const name = e.target.name;
        const { id } = row;
        const newRows = rows.map((row) => {
            if (row.id === id) {
                return { ...row, [name]: value };
            }
            return row;
        });
        setRows(newRows);
    };

    const onRevert = (id) => {
        const newRows = rows.map((row) => {
            if (row.id === id) {
                return previous[id] ? previous[id] : row;
            }
            return row;
        });
        setRows(newRows);
        setPrevious((state) => {
            delete state[id];
            return state;
        });
        onToggleEditMode(id);

    };

    const RowElement = ((row) => {
        const [openChild, setOpenChiled] = useState(false)
        return (
            <>
                <TableRow key={row.id}>
                    <TableCell className={"selectTableCell"}>
                        {row.isEditMode ? (
                            <>
                                <IconButton
                                    aria-label="done"
                                    onClick={() => onToggleEditMode(row.id)}
                                >
                                    <DoneIcon />
                                </IconButton>
                                <IconButton
                                    aria-label="revert"
                                    onClick={() => onRevert(row.id)}
                                >
                                    <RevertIcon />
                                </IconButton>
                            </>
                        ) : (
                            <>
                                <IconButton
                                    aria-label="delete"
                                    onClick={() => onToggleEditMode(row.id)}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    aria-label="delete"
                                    onClick={() => { setOpenChiled(!openChild) }}
                                >
                                    <KeyboardArrowDownIcon />
                                </IconButton>
                            </>
                        )}
                    </TableCell>
                    <CustomTableCell {...{ row, name: "name", onChange }} />
                    <CustomTableCell {...{ row, name: "completed", onChange }} />
                    <CustomTableCell {...{ row, name: "pending", onChange }} />
                    <CustomTableCell {...{ row, name: "status", onChange }} />
                    <CustomTableCell {...{ row, name: "deadLine", onChange }} />
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={openChild} timeout="auto" unmountOnExit component="tr" style={{ display: "block" }}>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Sub Tasks
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead sx={{ background: "#81D4FA" }}>
                                        <TableRow>
                                            <TableCell>Task Name</TableCell>
                                            <TableCell>Assigned To</TableCell>
                                            <TableCell align="right">Hours</TableCell>
                                            <TableCell align="right">Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow key={Math.random()}>
                                            <TableCell component="th" scope="row">
                                                Task number one
                                            </TableCell>
                                            <TableCell>Kiran Benny</TableCell>
                                            <TableCell align="right">3</TableCell>
                                            <TableCell align="right">
                                                Done
                                            </TableCell>
                                        </TableRow>
                                        <TableRow key={Math.random()}>
                                            <TableCell component="th" scope="row">
                                                Task number two
                                            </TableCell>
                                            <TableCell>Kiran Benny</TableCell>
                                            <TableCell align="right">3</TableCell>
                                            <TableCell align="right">
                                                Pending
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </>
        )
    })

    return (
        <Box
            sx={{
                padding: "80px"
            }}
        >
            <Paper className={"root"} >
                <Table className={"table"} aria-label="caption table">
                    <TableHead sx={{ background: "#B3E5FC" }}>
                        <TableRow>
                            <TableCell align="left"><Typography>Action</Typography></TableCell>
                            <TableCell align="left"><Typography>Task Name</Typography></TableCell>
                            <TableCell align="left"><Typography>Completed</Typography></TableCell>
                            <TableCell align="left"><Typography>Pending</Typography></TableCell>
                            <TableCell align="left"><Typography>Status</Typography></TableCell>
                            <TableCell align="left"><Typography>Deadline</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (RowElement(row)))}
                    </TableBody>
                </Table>
            </Paper>
        </Box>
    );
}

export default TableExample;
