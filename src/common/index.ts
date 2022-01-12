const getObjectValueByPath = (o, p) => p.split('.').reduce((a, v) => a[v], o);

async function getFindList(
  Collection,
  queryObject,
  querySort,
  presenter,
  limit,
  page,
) {
  const [records, count] = await Promise.all([
    Collection.find(queryObject)
      .limit(limit)
      .sort(querySort)
      .skip(limit * page - limit),
    Collection.countDocuments(queryObject),
  ]);

  const list = records.map(presenter);

  return { list, count };
}

async function getFindAsyncList(
  Collection,
  queryObject,
  querySort,
  presenter,
  limit,
  page,
) {
  const [records, count] = await Promise.all([
    Collection.find(queryObject)
      .limit(limit)
      .sort(querySort)
      .skip(limit * page - limit),
    Collection.countDocuments(queryObject),
  ]);

  const list = await Promise.all(records.map(presenter));

  return { list, count };
}

async function getAgregateList(
  Collection,
  aggregateRecords,
  aggregateCount,
  presenter,
) {
  const [records, countResult] = await Promise.all([
    Collection.aggregate(aggregateRecords),
    Collection.aggregate(aggregateCount),
  ]);
  const [aggregationObj] = countResult;
  const { count = 0 } = aggregationObj || {};

  const list = records.map(presenter);

  return { list, count };
}

export { getObjectValueByPath, getFindList, getFindAsyncList, getAgregateList };
