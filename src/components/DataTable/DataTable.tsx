import React, { useState, useMemo, useCallback, useEffect } from 'react';

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { ArrowDropUp } from "@material-ui/icons/";
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

interface IDatatable {
  [key: string]: any;
}

interface IDatatableColumn {
  key: string,
  label: string,
}

interface IDatatableOrderedColumn extends IDatatableColumn {
  isDesc: boolean,
}

interface IDatatableProps {
  data: IDatatable[],
  columns: IDatatableColumn[],
}

const Datatable: React.FC<IDatatableProps> = ({ data: datatable, columns: datatableColumns }) => {

  const [data, setData] = useState<IDatatable[]>(datatable);
  const [columns, setColumns] = useState<IDatatableColumn[]>(datatableColumns);

  const [orderedColumn, setOrderedColumn] = useState<IDatatableOrderedColumn | null>(null);

  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(5);

  useEffect(() => {
    setData(datatable)
    setColumns(datatableColumns)
  }, [datatable, datatableColumns]);

  const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
      root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
      },
    })
  );
  const classes = useStyles1();

  const items = useMemo(() => {
    if (rows === -1) {
      return data;
    }
    
    const skip = page * rows;
    const take = skip + rows;

    return data.slice(skip, take);
  }, [data, page, rows]);

  const isEmpty = useMemo(() => {
    return data.length === 0
  }, [data]);

  const qtdPages = useMemo(() => {
    if (rows === -1) {
      return 1;
    }

    const qtd = data.length;

    return Math.ceil(qtd / rows);
  }, [data.length, rows]);

  const pagePagination = useMemo(() => {
    return page === -1 ? 1 : page + 1
  }, [page]);

  const handleChangeRowsPerPage = useCallback((qtdPages: string): void => {
    setPage(0);
    setRows(parseInt(qtdPages));
  }, []);

  const handlePrevNextPage = useCallback((_: any, page: number): void => {
    setPage(page - 1);
  }, []);

  const handleOrderedColumn = useCallback(({ key, label }: IDatatableColumn): void => {
    const isDesc = orderedColumn?.key === key ? !orderedColumn.isDesc : true;

    setData(state => {
      const orderedData = [...state]
      orderedData.sort((a, b) => {
        if (typeof(a[key]) === 'string') {
          return isDesc ? ((a[key] > b[key]) ? -1 : (a[key] < b[key]) ? 1 : 0)
            : ((a[key] < b[key]) ? -1 : (a[key] > b[key]) ? 1 : 0);
        }
  
        return isDesc ? b[key] - a[key] : a[key] - b[key]
      });

      return orderedData
    });

    setOrderedColumn({
      key,
      label,
      isDesc,
    })

  }, [orderedColumn]);

  return (
    <TableContainer component={Paper}>
      <Table arial-label="simple table" style={{background: '#f2f2f2'}}>
        <TableHead>
          <TableRow>
            {columns.map(col => (
              <TableCell className="none" key={col.key}>
                <div className="Align-items">
                  <div>{col.label}</div>
                  <button className="none-button"
                    style={{ transform: `rotate(${
                      orderedColumn !== null
                      && orderedColumn.key === col.key 
                      && orderedColumn.isDesc ? '180deg' : '0deg' 
                    })`  }}
                    onClick={() => handleOrderedColumn(col)}>
                    <ArrowDropUp />
                  </button>
                </div>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          { isEmpty && (
            <TableRow>
              <TableCell colSpan={columns.length}>
                Nenhum resultado encontrado!
              </TableCell>
            </TableRow>
          )}

          {items.map(item => (
            <TableRow key={item[columns[0].key]} >
              {columns.map(col => (
                <TableCell key={col.key} component="td">
                  {item[col.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
        { !isEmpty && (
          <TableRow>
            <TablePagination
              style={{margin: '0px, 400px'}}
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={columns.length}
              count={data.length}
              rowsPerPage={rows}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
              onChangePage={handlePrevNextPage}
              onChangeRowsPerPage={(e) => (handleChangeRowsPerPage(e.target.value))}
              ActionsComponent={() => (
                <Pagination
                  className={classes.root}
                  count={qtdPages}
                  color="primary"
                  page={pagePagination}
                  onChange={handlePrevNextPage}
                  showFirstButton={true}
                  showLastButton={true}
                  size="small"
                  siblingCount={3}
                />
              )}
            />
          </TableRow>
        )}
        </TableFooter>
      </Table>
    </TableContainer>
  )
}

export default Datatable;
