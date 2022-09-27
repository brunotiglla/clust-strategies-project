export interface Client_info{
    id: number;
    company_id: number;
    dataset_id: number;
    aux_id: string;
    Gender: string;
    Ever_Married: string;
    Age: string;
    Graduated: string;
    Profession: string;
    Work_Experience: string;
    Spending_Score: string;
    Family_Size: string;
    Var_1: string;
}

export interface Client_Info_K_Means{
    id: number;
    company_id: number;
    dataset_id: number;
    aux_id: string;
    Gender: string;
    Ever_Married: string;
    Age: string;
    Graduated: string;
    Profession: string;
    Work_Experience: string;
    Spending_Score: string;
    Family_Size: string;
    Var_1: string;
    k_means_label: number;
}