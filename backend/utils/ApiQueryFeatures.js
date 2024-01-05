class ApiQueryFeatures {
  constructor(mongoQuery, reqQuery) {
    this.mongoQuery = mongoQuery;
    this.reqQuery = reqQuery;
  }

  //? Seraching and filtering results based on the keyword passed
  search() {
    const keyword = this.reqQuery.keyword
      ? {
          name: {
            $regex: this.reqQuery.keyword,
            $options: "i",
          },
        }
      : {};

    //! WTF is going on in the below line???
    this.mongoQuery = this.mongoQuery.find({ ...keyword });
    return this;
  }

  //? Filtering According to Category...
  filter() {
    const reqQueryCopy = { ...this.reqQuery };
    let removedQueries = ["keyword", "page", "limit"];
    console.log(reqQueryCopy);

    removedQueries.forEach((key) => delete reqQueryCopy[key]);

    //* For Filtering prices we need to pass $ to mongo query..
    //* Making our query to first String and placing $ where required
    let reqQueryCopyString = JSON.stringify(reqQueryCopy);
    let reqQuery = reqQueryCopyString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (key) => `$${key}`
    );
    console.log(reqQuery);

    this.mongoQuery = this.mongoQuery.find(JSON.parse(reqQuery));
    return this;
  }

  //? Pagination to limit results per page and skip as well..
  pagination(resultPerPage) {
    const currentPage = Number(this.reqQuery.page) || 1;
    const skip = resultPerPage * (currentPage - 1);

    this.mongoQuery = this.mongoQuery.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiQueryFeatures;
