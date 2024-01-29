export interface FinalDataset {
    count:number
    results:FinalDatasetDetail[]
}

export interface FinalDatasetDetail {
    id:number
    question:string
    answer:string
    language:string
}