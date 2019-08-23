import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TableMUI from '@material-ui/core/Table';

import Api from 'services/api';

import Pagination from 'common/pagination/pagination.component';
import { setMessage } from 'components/app/app.actions';

import Search from './search.component';
import TableHeader from './tableHeader.component';
import TableBody from './tableBody.component';

function TableList(props) {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    data: [],
    allCount: 0,
    page: 1,
    selected: [],
    search: {},
  });

  const {
    data,
    page,
    allCount,
    selected,
    search,
  } = state;

  const {
    apiPath,
    canEdit,
    columns,
    searchColumns = [],
    hasEditCredential,
  } = props;

  useEffect(() => {
    fetchData();
  }, [page, search]);

  const fetchData = async () => {
    const { data, allCount } = await Api.get(apiPath, {
      page,
      search,
    });

    setState(prevState => ({
      ...prevState,
      data,
      allCount,
    }));
  };

  const changePage = useCallback((newPage) => {
    setState(prevState => ({
      ...prevState,
      page: newPage,
      selected: [],
    }));
  }, [page]);

  const searchItems = useCallback((searchData) => {
    setState(prevState => ({
      ...prevState,
      page: 1,
      search: searchData,
      selected: [],
    }));
  }, []);

  const handleSelect = useCallback((id) => {
    setState(prevState => ({
      ...prevState,
      selected: [...prevState.selected, id],
    }));
  }, []);

  const handeDeselect = useCallback((id) => {
    setState(prevState => ({
      ...prevState,
      selected: prevState.selected.filter(selectedId => selectedId !== id),
    }));
  }, []);

  const handleDelete = useCallback(async () => {
    await Api.delete(apiPath, {
      ids: selected,
    });

    dispatch(setMessage('success', 'REMOVE_SUCCESS'));

    if (page === 1) fetchData();

    setState(prevState => ({
      ...prevState,
      selected: [],
      page: 1,
    }));
  }, [selected]);

  const isAllChecked = data.length > 0 && data.every(singleData => selected.includes(singleData._id));

  const handleToggleSelected = useCallback(() => {
    const updatedSelected = isAllChecked ? [] : data.map(singleData => singleData._id);

    setState(prevState => ({
      ...prevState,
      selected: updatedSelected,
    }));
  }, [data, isAllChecked]);

  return (
    <>
      <Grid container spacing={2}>
        {searchColumns.length > 0 && (
          <Search
            searchColumns={searchColumns}
            onSearch={searchItems}
          />
        )}
        <Grid item xs={12}>
          <Paper>
            <TableMUI>
              <TableHeader
                columns={columns}
                isAllChecked={isAllChecked}
                toggleSelected={handleToggleSelected}
                handleDelete={handleDelete}
                canRemove={(selected.length > 0 && hasEditCredential)}
              />
              <TableBody
                data={data}
                columns={columns}
                selected={selected}
                onSelect={handleSelect}
                onDeselect={handeDeselect}
                apiPath={apiPath}
                canEdit={canEdit}
                hasEditCredential={hasEditCredential}
              />
            </TableMUI>
          </Paper>
        </Grid>

        <Pagination
          page={page}
          allCount={allCount}
          changePage={changePage}
        />
      </Grid>
    </>
  );
}

export default TableList;
