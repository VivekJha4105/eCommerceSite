class ApiQueryFeatures {
  constructor(mongoQuery, reqQuery) {
    this.mongoQuery = mongoQuery;
    this.reqQuery = reqQuery;
  }

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
}

module.exports = ApiQueryFeatures;
