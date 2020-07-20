import React, { useState, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { ArrowDropDown, ArrowDropUp } from "@material-ui/icons/";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Paper,
} from "@material-ui/core";

import api from "../../services/api";

import "./main.css";

interface User {
  id: number;
  name: string;
  cdcId: number;
  ridesTotal: number;
  priceTotal: string;
  valAVG: Float32Array;
  status: string;
}

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  })
);

export default function Teste() {
  function Capture(id: number) {
    console.log(id);
  }

  function TablePaginationActions(props: TablePaginationActionsProps) {
    const classes = useStyles1();
    const { page, rowsPerPage } = props;

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value - 1);
    };

    const Indice = () => {
      const TotalReg = Users.length;
      const flag = TotalReg % rowsPerPage;

      if (flag === 0) {
        return Math.floor(TotalReg / rowsPerPage);
      } else {
        return Math.floor(TotalReg / rowsPerPage) + 1;
      }
    };
    return (
      <div className={classes.root}>
        <Pagination
          count={Indice()}
          color="primary"
          page={page + 1}
          onChange={handleChange}
          showFirstButton={true}
          showLastButton={true}
          size="small"
          siblingCount={3}
        />
      </div>
    );
  }

  const token = localStorage.getItem("Token");
  const [Users, setUsers] = useState<User[]>([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, Users.length - page * rowsPerPage);
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  const classes = useStyles();

  useEffect(() => {
    async function loaders() {
      const response = await api.get("/admin/v1/reports/users?companyId=10", {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdhYnJpZWxkaWJhc3RpYW5pQGhvdG1haWwuY29tIiwiaWQiOjU5LCJ1c2VySWQiOjExNywiZXhwIjoxNTk5NzkzODUxLjU0NCwiaWF0IjoxNTk0NjA5ODUxfQ.OTtI51grVrmtrHMhSgGoNikNWTY9xTr1_km-zHu9W0s",
        },
      });
      setUsers(response.data.userReport);
    }
    loaders();
  }, []);

  function OrderDecrById(flag: number) {
    const user = [...Users];
    if (flag === 0) {
      user.sort((a, b) => b.id - a.id);
    } else {
      user.sort((a, b) => a.id - b.id);
    }
    setUsers(user);
  }

  function OrdemByName(flag: number) {
    const user = [...Users];
    if (flag === 0) {
      user.sort((a, b) => (a.name > b.name ? -1 : 1));
    } else {
      user.sort((a, b) => (a.name < b.name ? -1 : 1));
    }
    setUsers(user);
  }

  function OrdemByCdc(flag: number) {
    const user = [...Users];
    if (flag === 0) {
      user.sort((a, b) => (a.cdcId - b.cdcId ? -1 : 1));
    } else {
      user.sort((a, b) => (b.cdcId - a.cdcId ? -1 : 1));
    }
    setUsers(user);
  }

  function OrdemByCorrida(flag: number) {
    const user = [...Users];
    if (flag === 0) {
      user.sort((a, b) => b.ridesTotal - a.ridesTotal);
    } else {
      user.sort((a, b) => a.ridesTotal - b.ridesTotal);
    }
    setUsers(user);
  }

  function OrdemByPrice(flag: number) {
    const user = [...Users];
    user.sort(function sortFunction(a, b) {
      var c = a.priceTotal;
      var d = c.split(" ");
      var e = parseFloat(d[1].replace(/\./gi, "").replace(/,/gi, "."));
      var f = b.priceTotal;
      var g = f.split(" ");
      var h = parseFloat(g[1].replace(/\./gi, "").replace(/,/gi, "."));
      if (flag === 0) {
        return e > h ? -1 : 1;
      } else {
        return e < h ? -1 : 1;
      }
    });
    setUsers(user);
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} arial-label="simple table">
          <TableHead>
            <TableRow>
              {Users.length > 0 && Object.keys(Users[0]).map(keyname =>(
                <TableCell className="none" key={keyname}>
                  <div className="Align-items">
                    <div>{keyname}</div>
                    <div>
                      <button
                        className="none-button"
                        onClick={() => OrderDecrById(0)}
                      >
                        <ArrowDropUp />
                      </button>
                      <button
                        className="none-button"
                        onClick={() => OrderDecrById(1)}
                      >
                        <ArrowDropDown />
                      </button>
                    </div>
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? Users.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : Users
            ).map(user => (
              <TableRow key={user.id} >
                {Object.entries(user).map((keyname) =>(
                  <TableCell key={user.id} component="th" onClick={() => Capture(user.id)}>
                    {keyname[1]}
                  </TableCell>
                ))}
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
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={6}
                count={Users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
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
