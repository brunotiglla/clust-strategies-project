export interface Dataset{
    id: number;
    company_id: number;
    file_name: string;
    created_timestamp: Date;
}

export interface DatasetResponse {
    code: string;
    message: string;
    status: string;
    data: Dataset[];
}