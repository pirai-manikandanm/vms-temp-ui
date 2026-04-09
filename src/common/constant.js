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
        { label: "Credit", value: "Credit" },
        { label: "Policy", value: "Policy" },
]

export const DISPLAY_TAGS = ["OTG", "Kiosk"]
export const PROMO_TYPE = [
        // { label: "PRODUCT_EXCLUSIVE", value: "PRODUCT_EXCLUSIVE" },
        // { label: "GVM", value: "GVM" },
        { label: "OTG", value: "OTG" },
        // { label: "GIFT", value: "GIFT" },
        // { label: "SAG", value: "SAG" },
        // { label: "REFERAL_CREDIT", value: "REFERAL_CREDIT" },
        // { label: "GBP", value: "GBP" },
        { label: "Kiosk", value: "Kiosk" },
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
                label: "100-in-1",
                value: "Ph100Pv1",
        },
        {
                label: "SinglifeNextGen",
                value: "Ph100Pv2",
        },
        {
                label: "SPIL - Education",
                value: "Ph100Pv3",
        },
]

export const PARTNER_OPTIONS = [
        {
                label: "SNG",
                value: "SNG",
        },
        {
                label: "Maya",
                value: "Maya",
        },
]

export const VOUCHER_TYPE = [
        { label: "PRODUCT_EXCLUSIVE", value: "PRODUCT_EXCLUSIVE" },
        // { label: "GIFT_CREDITS", value: "GIFT_CREDITS" },
        // { label: "NEW_TO_APP", value: "NEW_TO_APP" },
        // { label: "NEW_TO_CASHIN", value: "NEW_TO_CASHIN" },
        // { label: "REFERRAL_CREDITS", value: "REFERRAL_CREDITS" },
        // { label: "STARTER_PACK", value: "STARTER_PACK" },
        // { label: "BIRTHDAY_VOUCHER", value: "BIRTHDAY_VOUCHER" },
        { label: "SINGLIFE_CREDITS", value: "SINGLIFE_CREDITS" },
]

export const VOUCHER_FORM_PREFILL_VALUES = {
        promoName: "Singlife PG 02",
        startDate: "2025-08-02",
        promoCode: "PPTPG02",
        endDate: "2026-03-08",
        seriesCode: "FUNRUN",
        type: "",
        seriesName: "FUN RUN",
        maxRedeemLimitPerUser: 1,
        voucherCode: "WK1005",
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


export const HIDDEN_FIELDS = [
        "promoEntity", "partner", "customerDetailsExcelFile", "title", "description", "button", "navigation"
]