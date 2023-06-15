enum paymentType {
    inCash = "CASH",
    creditCard = "CREDIT_CARD",
    debitCard = "DEBIT_CARD"
}

export interface PaymentMethod {
    paymentType: paymentType,
    needChange: boolean,
    changeValue: number
}