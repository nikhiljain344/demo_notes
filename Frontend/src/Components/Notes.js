import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, InputBase, ListItemIcon, ListItemText, Menu, MenuItem, Pagination, Paper, Slide, Switch, TableContainer, TextField, Typography } from '@mui/material';
import appContext from '../Context/AppContext'
import { addNotes, deleteNotes, getNotesList, updateNotes } from '../service';
import moment from 'moment/moment';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Notes() {

    const [notes, setNotes] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);
    const AppContext = React.useContext(appContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [openModal, setModalOpen] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [AsCDescCD, setAsCDescCD] = React.useState(false);
    const [AsCDescUD, setAsCDescUD] = React.useState(false);
    const [filter, setFilter] = React.useState({ title: "", created_at: "ASC" })


    const initialValues = {
        title: '',
        description: ''
    }
    const {
        register,
        handleSubmit, setValue, reset,
        formState: { errors },
    } = useForm({ defaultValues: initialValues });

    React.useEffect(() => {
        if (AppContext.user) { getNotes(currentPage) }
    }, [AppContext.user, currentPage, filter])

    const getNotes = async (page) => {
        let res = await getNotesList(page, filter);
        if (res?.data?.status) {
            setNotes(res?.data?.data?.notes);
            setTotalPages(res?.data?.data?.totalPages)
        }
    }

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    console.log("selectedRow-->", selectedRow);

    const onSubmit = async (data) => {
        if (selectedRow) {
            data.id = selectedRow?.id
            try {
                let res = await updateNotes(data)
                if (res?.data?.status) {
                    toast.success(res?.data?.message)
                    setOpen(false);
                    reset();
                    getNotes(currentPage);
                }
                else {
                    toast.error(res?.data?.message)
                }
            }
            catch (e) { console.log(e); toast.error(e?.response?.data?.message) }
        }
        else {
            try {
                let res = await addNotes(data)
                if (res?.data?.status) {
                    toast.success(res?.data?.message)
                    setOpen(false);
                    reset();
                    setSelectedRow(null);
                    getNotes(currentPage);
                }
                else {
                    toast.error(res?.data?.message)
                }
            }
            catch (e) { console.log(e); toast.error(e?.response?.data?.message) }
        }
    }

    const deleteNote = async () => {
        console.log("selectedRow", selectedRow);
        try {
            let res = await deleteNotes(selectedRow?.id)
            if (res?.data?.status) {
                toast.success(res?.data?.message)
                setModalOpen(false);
                setSelectedRow(null);
                getNotes(currentPage);
            }
            else {
                toast.error(res?.data?.message)
            }
        }
        catch (e) { console.log(e); toast.error(e?.response?.data?.message) }
    }

    return (
        <>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} mb={3} mt={1}>
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, }}
                >
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <InputBase
                        sx={{ ml: 1, flex: 1, }}
                        placeholder="Search Note"
                        inputProps={{ 'aria-label': 'search google maps' }}
                        onChange={(e) => { setFilter({ ...filter, title: e.target.value }) }}
                    />
                </Paper>
                <div>
                    <Button className='btn'
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={() => { setOpen(true) }}
                    >
                        Add Note
                    </Button>
                </div>
            </Box>
            <TableContainer >
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Title</StyledTableCell>
                            <StyledTableCell >Description</StyledTableCell>
                            <StyledTableCell >Status   <Switch onChange={async (event) => { setFilter({ ...filter, status: event.target.checked }) }} /></StyledTableCell>
                            <StyledTableCell >Create Date {!AsCDescCD ? <NorthIcon onClick={() => {
                                delete filter.updated_at;
                                setFilter({ ...filter, created_at: "DESC" })
                                setAsCDescCD(true)
                            }} /> : <SouthIcon onClick={() => {
                                delete filter.updated_at;
                                setFilter({ ...filter, created_at: "ASC" })
                                setAsCDescCD(false)
                            }} />} </StyledTableCell>
                            <StyledTableCell >Update date {!AsCDescUD ? <NorthIcon onClick={() => {
                                delete filter.created_at;
                                setFilter({ ...filter, updated_at: "DESC" })
                                setAsCDescUD(true)
                            }} /> : <SouthIcon onClick={() => {
                                delete filter.created_at;
                                setFilter({ ...filter, updated_at: "ASC" })
                                setAsCDescUD(false)
                            }} />}</StyledTableCell>
                            <StyledTableCell ></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    {notes?.length === 0 ?
                        <TableBody>
                            <StyledTableRow >
                                <StyledTableCell style={{ textAlign: "center" }} colSpan={6}>No Notes Found</StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                        :
                        <TableBody>
                            {notes.map((row) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell component="th" scope="row">
                                        {row?.title}
                                    </StyledTableCell>
                                    <StyledTableCell >{row?.description}</StyledTableCell>
                                    <StyledTableCell >
                                        <Switch checked={row?.status} onChange={async (event) => {
                                            try {
                                                var res = await updateNotes({ id: row?.id, status: event.target.checked });
                                                if (res?.data?.status) {
                                                    toast.success(res?.data?.message)
                                                    getNotes(currentPage);
                                                }
                                                else {
                                                    toast.error(res?.data?.message)
                                                }
                                            }
                                            catch (e) { console.log(e); toast.error(e?.response?.data?.message) }

                                        }} />
                                    </StyledTableCell>
                                    <StyledTableCell >{moment(row?.created_at).format('MMMM Do YYYY, h:mm a')}</StyledTableCell>
                                    <StyledTableCell >{moment(row?.updated_at).format('MMMM Do YYYY, h:mm a')}</StyledTableCell>
                                    <StyledTableCell align='right'>
                                        <IconButton
                                            aria-controls="action-menu"
                                            aria-haspopup="true"
                                            onClick={(event) => {
                                                setAnchorEl(event.currentTarget);
                                                setSelectedRow(row)

                                            }}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                        <Menu
                                            id="action-menu"
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={handleMenuClose}
                                        >
                                            <MenuItem onClick={() => {
                                                setOpen(true);
                                                setAnchorEl(null);
                                                setValue('title', selectedRow?.title)
                                                setValue('description', selectedRow?.description)

                                            }}>
                                                <ListItemIcon>
                                                    <BorderColorIcon style={{ fontSize: 18 }} />
                                                </ListItemIcon>
                                                <ListItemText primary="Edit" style={{ fontSize: 14 }} />
                                            </MenuItem>
                                            <MenuItem onClick={() => {
                                                setModalOpen(true)
                                                setAnchorEl(null);
                                            }}>
                                                <ListItemIcon>
                                                    <DeleteIcon style={{ fontSize: 18 }} />
                                                </ListItemIcon>
                                                <ListItemText primary="Delete" style={{ fontSize: 14 }} />
                                            </MenuItem>
                                        </Menu>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>}
                </Table>
            </TableContainer >
            <Box className="mt-4 mb-2" justifyContent={'end'} display={'flex'}>
                <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary"
                    variant="outlined" shape="rounded" />
            </Box>

            {/* add edit modal */}
            <Dialog className='addNoteDialog'
                open={open}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"

            >
                <div className='closeBtn p-2'>
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={() => {
                        setSelectedRow(null);
                        setOpen(false)
                    }}>
                        <ClearIcon />
                    </IconButton>
                </div>
                <DialogTitle>{selectedRow ? "Edit Note" : "Add Note"}</DialogTitle>
                <DialogContent style={{ minWidth: 550 }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="Title"
                                    name="title"
                                    {...register('title', { required: true })}
                                />
                                {errors.title && <Typography className="text-danger mb-0" style={{ fontSize: 12 }}>Title is required.</Typography>}
                            </Grid>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <TextField
                                    multiline
                                    rows={3}
                                    margin="normal"
                                    fullWidth
                                    label="Description"
                                    name="description"
                                    {...register('description', { required: true })}
                                />
                                {errors.description && <Typography className="text-danger mb-0" style={{ fontSize: 12 }}> Description is required.</Typography>}
                            </Grid>
                        </Grid>
                        <Button className='btn'
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {selectedRow ? "Update" : "Add"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog >

            {/* delete modal */}
            <Dialog className='addNoteDialog'
                open={openModal}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setModalOpen(false)}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Alert"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure want to delete this note ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setModalOpen(false)}>No</Button>
                    <Button onClick={() => deleteNote()}>Yes</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}