import React, { useState, useEffect} from "react";
import {Search, ArrowDropUp} from '@material-ui/icons'

import './dateSearch.css'

interface IDatatable {
    [key: string]: any;
}

interface IColumnsValid {
    key: string,
    label: string,
    valid: boolean
}

interface IDatatableProps {
    data: IDatatable[],
    renderData: IDatatable[],
    columns: IColumnsValid[],
}  

const DataSearch: React.FC<IDatatableProps> = ({data: item, renderData: renderItem, columns: Validadion}) => {
  
    const [data, setData] = useState<IDatatable[]>([])
    const [renderData, setRenderData] = useState<IDatatable[]>([renderItem])
    const [columns, setColumns] = useState<IColumnsValid[]>([])
    
    useEffect(() =>{
        setData(item)
        setColumns(Validadion)
    }, [item, Validadion]);

    const validar = (validator: IColumnsValid) => {
        const col = [...columns]
        for (const key in col) {
            col[key].valid = false
            if(col[key].key === validator.key){
                col[key].valid = col[key].valid ? false : true
            }
        }
        setColumns(col)
    }
    
    const [search, setSearch] = useState('')
    
    const searchItens = (flag: boolean) => {
        const col = [...columns]
            for (const key in col) {
                flag = col[key].valid ? true : (flag === true ? true : false)
            
            }
            if (flag) {
                for (const key in col) {
                    if (col[key].valid) {
                        const keyname = col[key].key
                        setRenderData(data.filter(flagItem => flagItem[keyname].toString().toLowerCase().includes(search.toLowerCase())))
                    }
                }

            }
    }

    return (
        <div className='page-title'>
            <div className='col-9'>
                <div className='row'>
                    <ul className='options-validate'>
                        {columns.map(col =>(
                            <li key={col.key} className='option'>
                                {col.label}
                                <button className='none-button3' onClick={() => validar(col)}
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
                    <button className='none-button-2' onClick={() => searchItens(false)}  >
                        <Search className='searh-img-icon'/>
                    </button>
                </div>
            </div>
        </div>    
    );
}

export default DataSearch;