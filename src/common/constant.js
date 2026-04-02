export const VOUCHER_CREATION_TYPE = {
        SINGLIFE: 'SINGLIFE',
        THIRDPARTY: 'THIRD_PARTY',
}

export const PARTNERS_OPTIONS = {
        [VOUCHER_CREATION_TYPE.THIRDPARTY]: [
                { label: "Maya", value: "Maya" },
                { label: "xyz", value: "xyz" },
                { label: "abc", value: "abc" },
        ],
        [VOUCHER_CREATION_TYPE.SINGLIFE]: [
                { label: "Singlife", value: "Singlife" },
        ],
}

export const PROMO_REWARD_TYPE = [
        { label: "Reward", value: "Reward" },
        { label: "Policy", value: "Policy" },
]

export const PROMO_TYPE = [
        { label: "PRODUCT_EXCLUSIVE", value: "PRODUCT_EXCLUSIVE" },
        { label: "GVM", value: "GVM" },
        { label: "OTG", value: "OTG" },
        { label: "GIFT", value: "GIFT" },
        { label: "SAG", value: "SAG" },
        { label: "REFERAL_CREDIT", value: "REFERAL_CREDIT" },
        { label: "GBP", value: "GBP" },
]

export const ASSIGNMENT_EXPLICITY_TYPE = [
        { label: "1:1", value: "1:1" },
        { label: "1:M", value: "1:M" },
]

export const CLASSIFICATION_TYPE = [
        { label: "Free", value: "Free" },
        { label: "Paid", value: "Paid" },
]

export const ELLIGIBLE_PRODUCT_CODE = [
        {
                label: "Ph100Pv1",
                value: "Ph100Pv1",
        },
        {
                label: "Ph100Pv2",
                value: "Ph100Pv2",
        },
        {
                label: "Ph100Pv3",
                value: "Ph100Pv3",
        },
]

export const VOUCHER_TYPE = [
        { label: "GIFT_CREDITS", value: "GIFT_CREDITS" },
        { label: "PRODUCT_EXCLUSIVE", value: "PRODUCT_EXCLUSIVE" },
        { label: "PRODUCT_EXCLUSIVE_SP", value: "PRODUCT_EXCLUSIVE_SP" },
        { label: "NEW_TO_APP", value: "NEW_TO_APP" },
        { label: "NEW_TO_CASHIN", value: "NEW_TO_CASHIN" },
        { label: "REFERRAL_CREDITS", value: "REFERRAL_CREDITS" },
        { label: "STARTER_PACK", value: "STARTER_PACK" },
        { label: "BIRTHDAY_VOUCHER", value: "BIRTHDAY_VOUCHER" },
]

export const VOUCHER_FORM_PREFILL_VALUES = {
        promoName: "100 in 1 Voucher",
        startDate: "2025-08-02",
        promoCode: "WK1005",
        endDate: "2026-03-08",
        seriesCode: "WK1005",
        seriesName: "Welcome Kit 100 in 1 2025",
        maxRedeemLimitPerUser: 1,
        voucherCode: "WK1005",
        voucherName: "100 in 1 Voucher",
        assignmentExplicity: "1:1",
        voucherType: "PRODUCT_EXCLUSIVE",
        voucherStartDate: "2025-08-02",
        voucherEndDate: "2026-03-08",
        amount: 100,
        classification: "Free",
        durationInDays: 184,
        redeemMaxLimit: 1,
        eligibleProductCode: ["Ph100Pv1"],
        title: "Terms and Conditions",
        description: `1. The voucher amount is in the form of Singlife Credits.
2. Singlife credits is non-withdrawable and non-interest bearing.
3. This voucher is for one-time use only.`,
        button: "REDEEM",
        navigation: "Proceed",
}