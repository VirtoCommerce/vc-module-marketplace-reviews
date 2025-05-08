export declare class AuthApiBase {
    authToken: string;
    protected constructor();
    getBaseUrl(defaultUrl: string, baseUrl: string): string;
    setAuthToken(token: string): void;
    protected transformOptions(options: any): Promise<any>;
}
export declare class VcmpRatingClient extends AuthApiBase {
    private http;
    private baseUrl;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
    constructor(baseUrl?: string, http?: {
        fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
    });
    /**
     * @return Success
     */
    getCurrentSellerRating(): Promise<SellerRating>;
    protected processGetCurrentSellerRating(response: Response): Promise<SellerRating>;
    /**
     * @return Success
     */
    getSellerRatingById(sellerId: string): Promise<SellerRating>;
    protected processGetSellerRatingById(response: Response): Promise<SellerRating>;
}
export declare class VcmpReviewsClient extends AuthApiBase {
    private http;
    private baseUrl;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
    constructor(baseUrl?: string, http?: {
        fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
    });
    /**
     * @param body (optional)
     * @return Success
     */
    searchCustomerReviews(body?: SearchCustomerReviewsQuery | undefined): Promise<SearchCustomerReviewsResult>;
    protected processSearchCustomerReviews(response: Response): Promise<SearchCustomerReviewsResult>;
}
export declare class CustomerReview implements ICustomerReview {
    title?: string | undefined;
    review?: string | undefined;
    rating?: number;
    userId?: string | undefined;
    userName?: string | undefined;
    entityId?: string | undefined;
    entityType?: string | undefined;
    entityName?: string | undefined;
    storeId?: string | undefined;
    reviewStatus?: CustomerReviewReviewStatus;
    createdDate?: Date;
    modifiedDate?: Date | undefined;
    createdBy?: string | undefined;
    modifiedBy?: string | undefined;
    id?: string | undefined;
    constructor(data?: ICustomerReview);
    init(_data?: any): void;
    static fromJS(data: any): CustomerReview;
    toJSON(data?: any): any;
}
export interface ICustomerReview {
    title?: string | undefined;
    review?: string | undefined;
    rating?: number;
    userId?: string | undefined;
    userName?: string | undefined;
    entityId?: string | undefined;
    entityType?: string | undefined;
    entityName?: string | undefined;
    storeId?: string | undefined;
    reviewStatus?: CustomerReviewReviewStatus;
    createdDate?: Date;
    modifiedDate?: Date | undefined;
    createdBy?: string | undefined;
    modifiedBy?: string | undefined;
    id?: string | undefined;
}
export declare enum CustomerReviewStatus {
    New = "New",
    Approved = "Approved",
    Rejected = "Rejected"
}
export declare class SearchCustomerReviewsQuery implements ISearchCustomerReviewsQuery {
    sellerId?: string | undefined;
    sellerName?: string | undefined;
    responseGroup?: string | undefined;
    objectType?: string | undefined;
    objectTypes?: string[] | undefined;
    objectIds?: string[] | undefined;
    keyword?: string | undefined;
    searchPhrase?: string | undefined;
    languageCode?: string | undefined;
    sort?: string | undefined;
    readonly sortInfos?: SortInfo[] | undefined;
    skip?: number;
    take?: number;
    constructor(data?: ISearchCustomerReviewsQuery);
    init(_data?: any): void;
    static fromJS(data: any): SearchCustomerReviewsQuery;
    toJSON(data?: any): any;
}
export interface ISearchCustomerReviewsQuery {
    sellerId?: string | undefined;
    sellerName?: string | undefined;
    responseGroup?: string | undefined;
    objectType?: string | undefined;
    objectTypes?: string[] | undefined;
    objectIds?: string[] | undefined;
    keyword?: string | undefined;
    searchPhrase?: string | undefined;
    languageCode?: string | undefined;
    sort?: string | undefined;
    sortInfos?: SortInfo[] | undefined;
    skip?: number;
    take?: number;
}
export declare class SearchCustomerReviewsResult implements ISearchCustomerReviewsResult {
    totalCount?: number;
    results?: CustomerReview[] | undefined;
    constructor(data?: ISearchCustomerReviewsResult);
    init(_data?: any): void;
    static fromJS(data: any): SearchCustomerReviewsResult;
    toJSON(data?: any): any;
}
export interface ISearchCustomerReviewsResult {
    totalCount?: number;
    results?: CustomerReview[] | undefined;
}
export declare class SellerRating implements ISellerRating {
    rating?: number;
    reviewCount?: number;
    constructor(data?: ISellerRating);
    init(_data?: any): void;
    static fromJS(data: any): SellerRating;
    toJSON(data?: any): any;
}
export interface ISellerRating {
    rating?: number;
    reviewCount?: number;
}
export declare enum SortDirection {
    Ascending = "Ascending",
    Descending = "Descending"
}
export declare class SortInfo implements ISortInfo {
    sortColumn?: string | undefined;
    sortDirection?: SortInfoSortDirection;
    constructor(data?: ISortInfo);
    init(_data?: any): void;
    static fromJS(data: any): SortInfo;
    toJSON(data?: any): any;
}
export interface ISortInfo {
    sortColumn?: string | undefined;
    sortDirection?: SortInfoSortDirection;
}
export declare enum CustomerReviewReviewStatus {
    New = "New",
    Approved = "Approved",
    Rejected = "Rejected"
}
export declare enum SortInfoSortDirection {
    Ascending = "Ascending",
    Descending = "Descending"
}
export declare class ApiException extends Error {
    message: string;
    status: number;
    response: string;
    headers: {
        [key: string]: any;
    };
    result: any;
    constructor(message: string, status: number, response: string, headers: {
        [key: string]: any;
    }, result: any);
    protected isApiException: boolean;
    static isApiException(obj: any): obj is ApiException;
}
//# sourceMappingURL=virtocommerce.marketplacereviews.d.ts.map