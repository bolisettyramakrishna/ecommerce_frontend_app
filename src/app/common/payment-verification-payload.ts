export class PaymentVerificationPayload {

    constructor (public razorpayOrderId: string,
        public razorpayPaymentId: string,
        public razorpaySignature: string) { }
}
