export const fromNow = term => {
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - term);
  return fromDate;
};

export const dateToString = date => {
  if (!date) return date;
  const year = date.getFullYear();
  const month =
    date.getMonth() + 1 > 9
      ? `${date.getMonth() + 1}`
      : `0${date.getMonth() + 1}`;
  const day = date.getDate() > 9 ? `${date.getDate()}` : `0${date.getDate()}`;

  return `${year}-${month}-${day}`;
};

export const makeUp = filters => {
  const _filters = { ...filters };
  for (const [key, value] of Object.entries(filters)) {
    if (!value) delete _filters[key];
    if (+value < 0) {
      delete _filters[key];
    }
  }
  delete _filters.isLoading;
  delete _filters.dateValue;
  delete _filters.filteredResult;
  delete _filters.page_number;
  delete _filters.total_order_number;
  return _filters;
};

export const makeQs = (filter, dateValue) => {
  const filters = makeUp(filter);
  delete filters.filterOrder;
  delete filters.filterLimit;

  filters.filterDateFrom = dateToString(filters.filterDateFrom);
  filters.filterDateTo = dateToString(filters.filterDateTo);
  filters.dateValue = dateValue;

  if (filters.mdSeNo?.length > 0) filters.mdSeNo = filters.mdSeNo.join(',');
  if (filters.page === 1) delete filters.page;
  return filters;
};
