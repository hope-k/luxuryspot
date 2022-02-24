import Room from '../models/room'

class APIFeatures {
    constructor(R, queryStr, currentPage) {
        this.query = query;
        this.queryStr = queryStr;
        this.currentPage = currentPage;

    }
    search() {
        const location = this.queryStr.location ? {
            address: new RegExp(this.queryStr.location, 'i')

        } : {}
        this.query({ ...location });
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr };
        const removeFields = ['location', 'page'];
        removeFields.forEach(el => delete queryCopy[el]);
        this.query.find(queryCopy);
        
        return this;

    }
    pagination(resPerPage) {
        //the plus sign to queryStr.page is equivalent to Number(this.queryStr.page)
        const currentPage = +this.queryStr.page || 1;
        const skip = resPerPage * (currentPage - 1);
        this.query.limit(resPerPage).skip(skip);

        return this.currentPage = currentPage, this;

    }
}


export default APIFeatures;