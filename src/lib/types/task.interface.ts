export interface Task {
    id: number;
    pos?: {row: number, col: number};
    text: string;
    isPreview?: boolean;
    clonable?: boolean;
    backgroundColor?: string;
    borderColor?: string;
}

export interface TaskForm {
    task: string;
    backgroundColor: string;
    borderColor: string;
};