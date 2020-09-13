
export interface ITransaction {
    AccountId: number;
    Date: Date;
    OrderId: string;
    OrderCode: string;
    Debit: number;
    Credit: number;
    Balance: number;
}