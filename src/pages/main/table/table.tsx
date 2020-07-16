import React, {useState, useEffect} from 'react';
import {makeStyles, useTheme, Theme, createStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Paper from '@material-ui/core/Paper';

import api from '../../../services/api'


interface User {
    id: number,
    name: string,
    cdcId: number,
    ridesTotal: number,
    priceTotal: Float32Array,
    valAVG: Float32Array,
    status: string
}

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }),
);

function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

export default function Tables() {
  const token = localStorage.getItem('Token')
  const [Users, setUsers] = useState<User[]>([])
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, Users.length - page * rowsPerPage);
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  const classes = useStyles()

  useEffect(() => {
    async function loaders(){
      const response = await api.get('/admin/v1/reports/users?companyId=10', {
        headers: { Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdhYnJpZWxkaWJhc3RpYW5pQGhvdG1haWwuY29tIiwiaWQiOjU5LCJ1c2VySWQiOjExNywiZXhwIjoxNTk5NzkzODUxLjU0NCwiaWF0IjoxNTk0NjA5ODUxfQ.OTtI51grVrmtrHMhSgGoNikNWTY9xTr1_km-zHu9W0s' }
      })
      setUsers(response.data.userReport)
    }
    loaders()
  }, [])

  function Capture(id: number){
    console.log(id)
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} arial-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>CDC</TableCell>
              <TableCell>RidesTotal</TableCell>
              <TableCell>PriceTotal</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {(rowsPerPage > 0
              ? Users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : Users
            ).map((user) => (
              <TableRow key={user.id}>
                <TableCell component="th" scope="row" onClick={() => Capture(user.id)}>{user.id}</TableCell>
                <TableCell component="th" onClick={() => Capture(user.id)}>{user.name}</TableCell>
                <TableCell component="th" onClick={() => Capture(user.id)}>{user.cdcId}</TableCell>
                <TableCell component="th" onClick={() => Capture(user.id)}>{user.ridesTotal}</TableCell>
                <TableCell component="th" onClick={() => Capture(user.id)}>{user.priceTotal}</TableCell>
                <TableCell component="th" onClick={() => Capture(user.id)}>{user.status}</TableCell>
              </TableRow>
            ))}    
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}     
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={Users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}
