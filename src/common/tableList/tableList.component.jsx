import React, { useState, useEffect, useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import Api from 'services/api';

import Pagination from 'common/pagination/pagination.component';
import { setMessage } from 'components/app/app.actions';

import Search from './search.component';
import TableHeader from './tableHeader.component';
import TableBody from './tableBody.component';

const TableHeaderMemoized = memo(({ columns }) => (
  <TableHeader columns={columns} />
));
TableHeaderMemoized.displayName = 'TableHeader';

const SearchMemoized = memo(({ searchColumns, onSearch }) => (
  <Search searchColumns={searchColumns} onSearch={onSearch} />
));
SearchMemoized.displayName = 'Search';


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
    canAdd,
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

  const handleDelete = async () => {
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
  };


  return (
    <>
      {searchColumns.length > 0 && (
        <SearchMemoized
          searchColumns={searchColumns}
          onSearch={searchItems}
        />
      )}
      {canAdd && hasEditCredential && (
        <Link to={`${apiPath}/new`}>
          <Button variant="contained" color="primary">Dodaj</Button>
        </Link>
      )}
      {selected.length > 0 && hasEditCredential && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleDelete}
        >
          Usuń
        </Button>
      )}
      <table>
        <TableHeaderMemoized
          columns={columns}
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
      </table>
      <Pagination
        page={page}
        allCount={allCount}
        changePage={changePage}
      />
    </>
  );
}

export default TableList;
