export class QueryParams {
    offset: number;
    limit: number;
    status: string;
    searchText: string;
    sortOrder: string;
    sortColId: string;

    constructor(offset: number = 0, limit: number = 10, status = '', searchText = '', sortOrder = 'asc', sortColId = 'createdOn') {
        this.offset = offset;
        this.limit = limit;
        this.sortColId = sortColId;
        this.sortOrder = sortOrder;
        this.status = status;
        this.searchText = searchText;
    }
}