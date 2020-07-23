import React, { useState, useMemo, useCallback, useEffect } from 'react';

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { ArrowDropUp, Search } from "@material-ui/icons/";
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

import './DataTable.css'

interface IDatatable {
  [key: string]: any;
}

interface IDatatableColumn {
  key: string,
  label: string,
}

interface IColumnsValid {
  key: string,
  label: string,
  valid: boolean
}

interface IDatatableOrderedColumn extends IDatatableColumn {
  isDesc: boolean,
}

interface IDatatableProps {
  data: IDatatable[],
  columns: IDatatableColumn[],
  columnsSearch: IColumnsValid[]

}

const Datatable: React.FC<IDatatableProps> = ({ data: datatable, columns: datatableColumns, columnsSearch: dataColumns}) => {

  const [data, setData] = useState<IDatatable[]>([]);
  
  const [renderData, setRenderData] = useState<IDatatable[]>([])
  const [colunmsSearch, setColunmsSearch] = useState<IColumnsValid[]>([]);
  
  const [columns, setColumns] = useState<IDatatableColumn[]>([]);
  const [orderedColumn, setOrderedColumn] = useState<IDatatableOrderedColumn | null>(null);

  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(5);

  useEffect(() => {
    setData(datatable)
    setRenderData(data)
    setColumns(datatableColumns)
    setColunmsSearch(dataColumns)
  }, [datatable, datatableColumns, dataColumns, data]);

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
      return renderData;
    }
    
    const skip = page * rows;
    const take = skip + rows;

    return renderData.slice(skip, take);
  }, [renderData, page, rows]);

  const isEmpty = useMemo(() => {
    return renderData.length === 0
  }, [renderData]);

  const qtdPages = useMemo(() => {
    if (rows === -1) {
      return 1;
    }

    const qtd = renderData.length;

    return Math.ceil(qtd / rows);
  }, [renderData.length, rows]);

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

    setRenderData(state => {
      const orderedData = [...state]
      orderedData.sort((a, b) => {
        if (typeof(a[key]) === 'string') {
          if(a[key].includes('R$')){
            var c = a[key];
            var d = c.split(" ");
            var e = parseFloat(d[1].replace(/\./gi, "").replace(/,/gi, "."));
            var f = b[key];
            var g = f.split(" ");
            var h = parseFloat(g[1].replace(/\./gi, "").replace(/,/gi, "."));
            
            return isDesc ? h - e : e - h
          }else{
            return isDesc ? ((a[key] > b[key]) ? -1 : (a[key] < b[key]) ? 1 : 0)
              : ((a[key] < b[key]) ? -1 : (a[key] > b[key]) ? 1 : 0);
          }
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

  const SelectItem = (item: IDatatable): void => {
    console.log(item)
  };

  // Search itens
  const handleValidation = useCallback((validator: IColumnsValid) => {
    const col = [...colunmsSearch]
    for (const key in col) {
      col[key].key === validator.key ? 
        (col[key].valid = col[key].valid ? false : true) 
      : col[key].valid = col[key].valid ? false : false
    }
    setColumns(col)
  }, [colunmsSearch])

  const [search, setSearch] = useState('')

  const handleSearchItens =  useCallback((flag: boolean) => {
    const col = [...colunmsSearch]
    for (const key in col) {
      flag = col[key].valid ? true : (flag === true ? true : false)
    }
  
    if (flag) {
      for (const key in col) {
        if (col[key].valid) {
          const keyname = col[key].key
          setRenderData(data.filter(flagItem => flagItem[keyname].toString().toLowerCase().includes(search.toString().toLowerCase())))
        }
      }
    }else{
      var objectflag = []
      var notduplicate = true
      for(var i=0; i< data.length; i++){
        for (const key in data[i]) {    
          if (data[i][key].toString().toLowerCase().indexOf(search.toLowerCase()) !== -1) {
            notduplicate = data[i] === objectflag[objectflag.length -1] ? 
            false : true
            if(notduplicate){
                objectflag.push(data[i])
            }
          }
        }
      }
      setRenderData(objectflag)
    }
  },[colunmsSearch, data, search])

  return (
    <>
      <div className='page-title'>
        <div className='col-9'>
            <div className='row'>
              <ul className='options-validate'>
                {colunmsSearch.map(col =>(
                  <li key={col.key} className='option'>
                    {col.label}
                    <button className='none-button3' onClick={() => handleValidation(col)}
                        style={{color: `${col.valid ? '#245fb3' : ''}`}}
                    >
                      <ArrowDropUp />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
        </div>
        <div className='col-3'>
          <div className='input-icon-div'>
            <input className='default-input icon-input m-0' 
              value={search}
              onChange={({target}) => setSearch(target.value) } />
            <button className='none-button-2' onClick={() => handleSearchItens(false)}  >
              <Search className='searh-img-icon'/>
            </button>
          </div>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table arial-label="simple table" style={{background: '#f2f2f2'}}>
          <TableHead>
            <TableRow>
              {columns.map(col => (
                <TableCell key={col.key} >
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
                  <TableCell key={col.key} component="td" onClick={() => SelectItem(item)}>
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
                count={renderData.length}
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
    </>
  )
}

export default Datatable;
