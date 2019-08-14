import React, { useState, useEffect, useCallback, memo } from 'react';

import Api from 'services/api';

import Search from './search/search.component';
import TableHeader from './tableHeader/tableHeader.component';
import TableBody from './tableBody/tableBody.component';
import Pagination from './pagination/pagination.component';

const PaginationMemoized = memo(({ page, allCount, changePage }) => (
  <Pagination page={page} allCount={allCount} changePage={changePage} />
));
PaginationMemoized.displayName = 'PaginationMemozied';

const TableHeaderMemoized = memo(({ columns }) => (
  <TableHeader columns={columns} />
));
TableHeaderMemoized.displayName = 'TableHeader';

const SearchMemoized = memo(({ searchColumns, onSearch }) => (
  <Search searchColumns={searchColumns} onSearch={onSearch} />
));
SearchMemoized.displayName = 'Search';


function TableList(props) {
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
    fetchDataUrl,
    columns,
    searchColumns = [],
  } = props;

  useEffect(() => {
    fetchData();
  }, [page, search]);

  const fetchData = async () => {
    try {
      const { data, allCount } = await Api.get(fetchDataUrl, {
        page,
        search,
      });

      setState(prevState => ({
        ...prevState,
        data,
        allCount,
      }));
    } catch (error) {
      // TODO
      console.log(error);
    }
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

  return (
    <>
      {searchColumns.length > 0 && (
        <SearchMemoized
          searchColumns={searchColumns}
          onSearch={searchItems}
        />
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
        />
      </table>
      <PaginationMemoized
        page={page}
        allCount={allCount}
        changePage={changePage}
      />
    </>
  );
}

export default TableList;
