import { dbContext } from "../db/DbContext"


class HousesService {
  async getHouses(query) {
    const sortBy = query.order
    delete query.order

    const page = query.page || 1
    delete query.page
    const skipAmount = (page - 1) * 10

    const search = query.search
    delete query.search
    if (search) query.description = { $regex: new RegExp(search) }

    console.log('finding by', query);
    console.log('sorting by', sortBy);
    console.log('on page', page);
    console.log('searching description', search);


    const houses = await dbContext.Houses.find(query).limit(10).sort(sortBy + 'createdAt').skip(skipAmount).populate('creator', 'name picture')
    const resultCount = await dbContext.Houses.countDocuments(query)
    return {
      query,
      sortBy,
      page: parseInt(page),
      totalPages: Math.ceil(resultCount / 10),
      count: resultCount,
      results: houses,
    }
  }
}

export const housesService = new HousesService()