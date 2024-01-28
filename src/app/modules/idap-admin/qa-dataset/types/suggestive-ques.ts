export interface SuggestiveQues {
    data: SuggestiveQuesDetails[];
    count: number;
}

export interface SuggestiveQuesDetails {
    id: string;
    text: string;
    answer: string;
    marked_for_removal: boolean;
    is_added_to_qa_dataset: boolean;
}
